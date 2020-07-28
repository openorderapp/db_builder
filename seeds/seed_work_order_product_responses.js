const faker = require("faker");

let number_of_work_order_product_responses_to_seed = 100;
let work_order_product_response_records = [];

let random_work_order_product_ids_index;
let random_product_question_ids_index;

const select_column_from_table = (knex, column_name, table_name) => {
  return new Promise((resolve, reject) => {
    knex
      .select(column_name)
      .from(table_name)
      .then((select_response) => {
        return_payload = [];
        select_response.forEach((entry) => {
          return_payload.push(entry[column_name]);
        });
        resolve(return_payload);
      });
  });
};

// A function to randomly generate an id to be usec from a foreign key array
const random_index = (max) => {
  max = Math.floor(max);
  return Math.floor(Math.random() * (max + 1));
};

// A function to generate the line items in a work order, and insert the records
// created in the "create" function below
const generate_work_order_product_response_records = (knex) => {

  let records = [];

  for (
    let work_order_product_response_id = 1;
    work_order_product_response_id - 1 <
    number_of_work_order_product_responses_to_seed;
    work_order_product_response_id++
  ) {
    records.push(
      create_work_order_product_response_record(
        knex,
        work_order_product_response_id
      )
    );
  }

  return records;
};

// A function to create the individual rows in the table
const create_work_order_product_response_record = (knex, id) => {
  random_work_order_product_ids_index = random_index(
    work_order_product_ids.length - 1
  );

  random_product_question_ids_index = random_index(
    product_question_ids.length - 1
  );

  return knex("work_order_product_responses").insert({
    work_order_product_response_id: id,
    work_order_product_id:
      work_order_product_ids[random_work_order_product_ids_index],
    product_question_id:
      product_question_ids[random_product_question_ids_index],
    response_text: faker.lorem.text(25),
    is_complete: faker.random.boolean(),
    created_at: new Date(),
    updated_at: new Date(),
  });
};

const run_seed = (knex) => {
  // let work_order_product_response records = []
  

  //Promise to delete from work_order_product_responses
  const work_order_product_responses_delete_promise = knex(
    "work_order_product_responses"
  ).del();

   // Promise to select values from product_questions
   const product_question_ids_select_promise = select_column_from_table(knex, "work_order_id", "work_orders")

      // Promise to select values from work_order_products
	  const work_order_product_ids_select_promise = select_column_from_table(knex, "work_order_product_id", "work_order_products")

  // Begin by using a promise to delete work_order_product_responses table data
  return work_order_product_responses_delete_promise

    .then(() => {
      //then use promise to select product_question_ids in an array
      return product_question_ids_select_promise;
    })
    .then((product_question_ids_select_response) => {
      // Assign the response to a variable
      product_question_ids = product_question_ids_select_response;

      //then use promise to select work_order_product_ids in an array
      return work_order_product_ids_select_promise;
    })
    .then((work_order_product_ids_select_response) => {
      //Assign the response to a variable
      work_order_product_ids = work_order_product_ids_select_response;
    })
    .then(() => {
      // generate the required number of records, and insert their data
      work_order_product_response_records.push(
        ...generate_work_order_product_response_records(
          knex,
          number_of_work_order_product_responses_to_seed,
          work_order_product_ids,
          product_question_ids
        )
      );

      return Promise.all(work_order_product_response_records);
    })
    .then(() => {
      // Select last work_order_product_response_id
      return knex
        .select("work_order_product_response_id")
        .from("work_order_product_responses")
        .orderBy("work_order_product_response_id", "desc")
        .limit(1);
    })
    .then((results) => {
      const last_work_order_product_response_id = results[0]["work_order_product_response_id"];
      // Update sequence value
      return knex.schema.raw(
        `ALTER SEQUENCE work_order_product_responses_work_order_product_response_id_seq RESTART WITH ${
          last_work_order_product_response_id + 1
        }`
      );
    });
};

module.exports.run_seed = run_seed


exports.seed = function(knex) {

    return run_seed(knex)

};
