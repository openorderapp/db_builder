const faker = require('faker');

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
        product_text: faker.commerce.productName(),
        product_number: faker.finance.mask(),
        created_at: new Date()
    });
}

exports.seed = function(knex) {

    const number_of_products_to_seed = 100;
    let product_records = [];

    return knex('product_questions').del().then(() => {

        return knex('products').del();

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
};
