const faker = require('faker');

const number_of_work_orders_to_seed = 10;


const generate_work_order_records = (knex, number_of_work_orders_to_seed, customer_ids) => {

    let records = [];
    let customer_id = 1




    for (let work_order_id = 1; (work_order_id - 1) < number_of_work_orders_to_seed; work_order_id++) {
        records.push(create_work_order_record(knex, work_order_id, customer_ids));
    }
    return records;
}

const create_work_order_record = (knex, id, customer_ids) => {  

    let max_index = customer_ids.length - 1
  


    let random_int = (max) => {
        max = Math.floor(max)
        return Math.floor(Math.random() * (max + 1))
    }

    random_index = random_int(customer_ids.length)

    return knex('work_orders').insert({
        work_order_id: id,
        customer_id: random_index,
        no_of_items: faker.random.number(100),
        total: faker.random.number(999999),
        is_complete: faker.random.boolean(),
        created_at: new Date(),
        updated_at: new Date()
    });
}

const run_seed = (knex) => {

    let work_order_records = [];

    return knex('work_order_products').del().then(() => {

        return knex('work_orders').del();

    }).then(() => {

        return knex.select("customer_id").from("customers")

    }).then((customer_ids) => {

        // Create work_order entries
        work_order_records.push(...generate_work_order_records(knex, number_of_work_orders_to_seed, customer_ids));
        return Promise.all(work_order_records);

    }).then(() => {

        // Select last work_order_id
        return knex.select('work_order_id').from('work_orders').orderBy('work_order_id', 'desc').limit(1);

    }).then(results => {

        const last_work_order_id = results[0]['work_order_id'];
        // Update sequence value
        return knex.schema.raw(`ALTER SEQUENCE work_orders_work_order_id_seq RESTART WITH ${last_work_order_id + 1}`);
    })
}

module.exports.run_seed = run_seed

exports.seed = function(knex) {

    return run_seed(knex)
}
