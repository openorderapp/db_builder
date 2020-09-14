const faker = require("faker")

const number_of_customers_to_seed = 100

const generate_customer_records = (knex) => {
  let records = []

  for (
    let customer_id = 1;
    customer_id - 1 < number_of_customers_to_seed;
    customer_id++
  ) {
    records.push(create_customer_record(knex, customer_id))
  }

  return records
};

const create_customer_record = (knex, id) => {
  return knex("customers").insert({
    customer_id: id,
    customer_first_name: faker.name.firstName(),
    customer_last_name: faker.name.lastName(),
    customer_email: faker.internet.email(),
    customer_phone: faker.phone.phoneNumber(),
    comments: faker.lorem.text(),
    created_at: new Date(),
    updated_at: new Date(),
  })
}

const run_seed = (knex) => {

  const
    delete_customers_promise = knex("customers").del(),
    delete_work_orders_promise = knex("work_orders").del(),
    delete_work_order_events_promise = knex("work_order_events").del(),
    delete_work_order_event_comments_promise = knex("work_order_event_comments").del(),
    delete_work_order_products_promise = knex("work_order_products").del(),
    delete_work_order_product_responses_promise = knex("work_order_product_responses").del()

  return delete_work_order_product_responses_promise.then(() => {

    return delete_work_order_products_promise

  }).then(() => {

    return delete_work_order_event_comments_promise

  }).then(() => {

    return delete_work_order_events_promise

  }).then(() => {

    return delete_work_orders_promise

  }).then(() => {

    return delete_customers_promise

  }).then(() => {

    // Create customer entries
    const customer_records = generate_customer_records(knex)
    return Promise.all(customer_records)

  }).then(() => {

    // Select last customer_id
    return knex
      .select("customer_id")
      .from("customers")
      .orderBy("customer_id", "desc")
      .limit(1)

  }).then((results) => {

    const last_customer_id = results[0]["customer_id"]
    // Update sequence value
    return knex.schema.raw(
      `ALTER SEQUENCE customers_customer_id_seq RESTART WITH ${last_customer_id + 1}`
    )
  })
}

module.exports.run_seed = run_seed


exports.seed = (knex) => {

  return run_seed(knex)

}