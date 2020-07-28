const faker = require('faker');

const number_of_products_to_seed = 5;


const generate_product_records = (knex, number_of_products_to_seed) => {

    let records = [];

    for (let product_id = 1; (product_id - 1) < number_of_products_to_seed; product_id++) {
        records.push(create_product_record(knex, product_id));
    }
    return records;
}

const create_product_record = (knex, id) => {
    return knex('products').insert({
        product_id: id,
        product_name: faker.commerce.productName(),
        price: faker.random.number(1000000)
    });
}

const run_seed = (knex) => {
    let product_records = [];

    return knex('work_order_products').del().then(() => {

        return knex('product_questions').del()

    }).then(() => {

        return knex('products').del()
        
    }).then(() => {
        
        // Create product entries
        product_records.push(...generate_product_records(knex, number_of_products_to_seed));
        return Promise.all(product_records);

    }).then(() => {

        // Select last product_id
        return knex.select('product_id').from('products').orderBy('product_id', 'desc').limit(1);

    }).then(results => {

        const last_product_id = results[0]['product_id'];
        // Update sequence value
        return knex.schema.raw(`ALTER SEQUENCE products_product_id_seq RESTART WITH ${last_product_id + 1}`);

    })
}

module.exports.run_seed = run_seed


exports.seed = function(knex) {

    return run_seed(knex)

};
