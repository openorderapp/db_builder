const faker = require('faker')

let number_of_work_order_products_to_seed = 100
let records = []
let work_order_product_records = []


let random_work_order_ids_index
let random_product_ids_index

const select_column_from_table = (knex, column_name, table_name) => {
    return new Promise((resolve, reject) => {
        knex.select(column_name).from(table_name).then((select_response) => {
            return_payload = []
            select_response.forEach(entry => {
                return_payload.push(entry[column_name])
            })
            resolve(return_payload)
        })
    })
};

// A function to randomly generate an id to be usec from a foreign key array
const random_index = max => {
    max = Math.floor(max)
    return Math.floor(Math.random() * (max + 1))
}

// A function to generate the line items in a work order, and insert the records 
// created in the "create" function below
const generate_work_order_product_records = (knex) => {

  for (
    let work_order_product_id = 1;
    (work_order_product_id - 1) < number_of_work_order_products_to_seed;
    work_order_product_id++
  ) {
    records.push(create_work_order_product_record(knex, work_order_product_id))
  }

  return records
}

// A function to create the individual rows in the table
const create_work_order_product_record = (knex, id) => {

    random_work_order_ids_index = random_index(work_order_ids.length - 1)

    random_product_ids_index = random_index(product_ids.length - 1)

    return knex("work_order_products").insert({
      work_order_product_id: id,
      work_order_id: work_order_ids[random_work_order_ids_index],
      product_id: product_ids[random_product_ids_index],
      quantity: faker.random.number(99) + 1,
      subtotal: faker.random.number(6),
      is_complete: faker.random.boolean(),
      process_started_at: new Date(),
      process_completed_at: new Date(),
      payment_accepted_at: new Date(),
      product_fulfilled_at: new Date(),
      created_at: new Date(),
      updated_at: new Date(),
    })
}

const run_seed  = (knex) => {

    // let work_order_product_records = []

    //Promise to delete from work_order_product_responses
    const work_order_product_responses_delete_promise = knex("work_order_product_responses").del()

    //Promise to delete from work_order_products
    const work_order_products_delete_promise = knex("work_order_products").del()

    // Promise to select values from work_orders
    const work_order_ids_select_promise = select_column_from_table(knex, "work_order_id", "work_orders")

    // Promise to select values from products
    const product_ids_select_promise = select_column_from_table(knex, "product_id", "products")

    // Begin by using a promise to delete work_order_products table data
    return work_order_product_responses_delete_promise
    
    .then(() => {

        // then use a promise to delete products table data
        return work_order_products_delete_promise
        
    }).then(() => {

        //then use promise to select product_ids in an array
        return product_ids_select_promise

    }).then((product_ids_select_response) => {

        // Assign the response to a variable
        product_ids = product_ids_select_response

        //then use promise to select work_order_ids in an array
        return work_order_ids_select_promise

    }).then((work_order_ids_select_response) => {

        //Assign the response to a variable
        work_order_ids = work_order_ids_select_response

    }).then(() => {
        
        // generate the required number of records, and insert their data
        work_order_product_records.push(...generate_work_order_product_records(knex, number_of_work_order_products_to_seed, work_order_ids, product_ids))

        return Promise.all(work_order_product_records)
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

};

