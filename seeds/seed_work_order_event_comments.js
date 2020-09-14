const
  faker = require("faker"),
  helpers = new (require("./helpers")).Helpers()

let
  number_of_work_order_event_comments_to_seed = 500,
  work_order_event_ids = []

// A function to generate the work_order_event_comments records, and insert the records
// created in the "create" function below
const generate_work_order_event_comment_records = (knex) => {

  const records = []

  for (
    let work_order_event_comment_id = 1;
    work_order_event_comment_id - 1 < number_of_work_order_event_comments_to_seed;
    work_order_event_comment_id++
  ) {
    records.push(create_work_order_event_comment_record(knex, work_order_event_comment_id))
  }

  return records;
}

// A function to create the individual rows in the table
const create_work_order_event_comment_record = (knex, id) => {

  const random_work_order_event_id = helpers.pick_random_value_from_array(work_order_event_ids)

  return knex("work_order_event_comments").insert({
    work_order_event_comment_id: id,
    work_order_event_id: random_work_order_event_id,
    work_order_event_comment: faker.finance.transactionDescription(),
    created_at: new Date(),
    updated_at: new Date(),
  })
}

const run_seed = (knex) => {

  //Promise to delete from work_order_event_comments
  const work_order_event_comments_delete_promise = knex("work_order_event_comments").del()

  // Promise to select values from work_order_events
  const work_order_event_ids_select_promise = helpers.select_column_from_table(
    knex,
    "work_order_event_id",
    "work_order_events"
  )

  // Begin by using a promise to delete work_order_event_comments table data
  return work_order_event_comments_delete_promise
    .then(() => {

      //then use promise to select work_order_event_ids in an array
      return work_order_event_ids_select_promise
    })
    .then((work_order_event_ids_select_response) => {

      // Assign the response to a variable
      work_order_event_ids = work_order_event_ids_select_response

      // generate the required number of records, and insert their data
      const work_order_event_comment_records = generate_work_order_event_comment_records(knex)

      return Promise.all(work_order_event_comment_records)
    })
    .then(() => {
      // Select last work_order_event_comment_id
      return knex
        .select("work_order_event_comment_id")
        .from("work_order_event_comments")
        .orderBy("work_order_event_comment_id", "desc")
        .limit(1)
    })
    .then((results) => {
      const last_work_order_event_comment_id = results[0]["work_order_event_comment_id"]
      // Update sequence value
      return knex.schema.raw(
        `ALTER SEQUENCE work_order_event_comments_work_order_event_comment_id_seq RESTART WITH ${last_work_order_event_comment_id + 1}`
      )
    })
}


module.exports.run_seed = run_seed


exports.seed = function (knex) {

  return run_seed(knex)

};
