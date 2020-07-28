const faker = require("faker");

const generate_customer_records = (knex, number_of_customers_to_seed) => {
  let records = [];

  for (
    let customer_id = 1;
    customer_id - 1 < number_of_customers_to_seed;
    customer_id++
  ) {
    records.push(create_customer_record(knex, customer_id));
  }

  return records;
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
  });
};

exports.seed = function (knex) {
  const number_of_customers_to_seed = 100;
  let customer_records = [];

  return knex("work_orders")
    .del()
    .then(() => {
      return knex("customers").del();
    })
    .then(() => {
      // Create customer entries
      customer_records.push(
        ...generate_customer_records(knex, number_of_customers_to_seed)
      );
      return Promise.all(customer_records);
    })
    .then(() => {
      // Select last customer_id
      return knex
        .select("customer_id")
        .from("customers")
        .orderBy("customer_id", "desc")
        .limit(1);
    })
    .then((results) => {
      const last_customer_id = results[0]["customer_id"];
      // Update sequence value
      return knex.schema.raw(
        `ALTER SEQUENCE customers_customer_id_seq RESTART WITH ${
          last_customer_id + 1
        }`
      );
    });
};
