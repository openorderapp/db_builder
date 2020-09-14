const faker = require("faker");

let number_of_work_order_events_to_seed = 100;
let records = [];
let work_order_event_records = [];

let random_work_order_ids_index;
let random_event_ids_index;
let random_employee_ids_index;

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

// A function to randomly generate an id to be grabbed from a foreign key array
const random_index = (max) => {
  max = Math.floor(max);
  return Math.floor(Math.random() * (max + 1));
};

// A function to generate the work_order_event_records, and insert the records
// created in the "create" function below
const generate_work_order_event_records = (knex) => {
  for (
    let work_order_event_id = 1;
    work_order_event_id - 1 < number_of_work_order_events_to_seed;
    work_order_event_id++
  ) {
    records.push(create_work_order_event_record(knex, work_order_event_id));
  }

  return records;
};

// A function to create the individual rows in the table
const create_work_order_event_record = (knex, id) => {
  random_work_order_ids_index = random_index(work_order_ids.length - 1);

  random_event_ids_index = random_index(event_ids.length - 1);

  random_employee_ids_index = random_index(employee_ids.length - 1);

  return knex("work_order_events").insert({
    work_order_event_id: id,
    work_order_id: work_order_ids[random_work_order_ids_index],
    event_id: event_ids[random_event_ids_index],
    employee_id: employee_ids[random_employee_ids_index],
    comments: faker.lorem.text(),
    created_at: new Date(),
    updated_at: new Date(),
  });
};

const run_seed = (knex) => {

  //Promise to delete from work_order_events
  const work_order_events_delete_promise = knex("work_order_events").del();

  // Promise to select values from work_orders
  const work_order_ids_select_promise = select_column_from_table(
    knex,
    "work_order_id",
    "work_orders"
  );

  // Promise to select values from events
  const event_ids_select_promise = select_column_from_table(
    knex,
    "event_id",
    "events"
  );

  // Promise to select values from employees
  const employee_ids_select_promise = select_column_from_table(
    knex,
    "employee_id",
    "employees"
  );



  // Begin by using a promise to delete work_order_events table data
  return work_order_events_delete_promise


    .then(() => {
      //then use promise to select work_orders_ids in an array
      return work_order_ids_select_promise;
    })
    .then((work_order_ids_select_response) => {
      // Assign the response to a variable
      work_order_ids = work_order_ids_select_response;

      //then use promise to select event_ids in an array
      return event_ids_select_promise;
    })
    .then((event_ids_select_response) => {
      //Assign the response to a variable
      event_ids = event_ids_select_response;
      return employee_ids_select_promise
    })
    .then((employee_ids_select_response) => {
      //Assign the response to a variable
      employee_ids = employee_ids_select_response;
    })
    .then(() => {
      // generate the required number of records, and insert their data
      work_order_event_records.push(
        ...generate_work_order_event_records(
          knex,
          number_of_work_order_events_to_seed,
          work_order_ids,
          event_ids,
          employee_ids
        )
      );

      return Promise.all(work_order_event_records);
    })
    .then(() => {
      // Select last work_order_event_id
      return knex
        .select("work_order_event_id")
        .from("work_order_events")
        .orderBy("work_order_event_id", "desc")
        .limit(1);
    })
    .then((results) => {
      const last_work_order_event_id = results[0]["work_order_event_id"];
      // Update sequence value
      return knex.schema.raw(
        `ALTER SEQUENCE work_order_events_work_order_event_id_seq RESTART WITH ${last_work_order_event_id + 1
        }`
      );
    });
};


module.exports.run_seed = run_seed


exports.seed = function (knex) {

  return run_seed(knex)

};
