const faker = require("faker");

product_question_id = 1;
step = 1;

const generate_product_question_records = (knex, product_ids) => {
  let records = [];

  product_ids.forEach((product_id) => {
    // console.log(product_id);
    let number_of_questions = Math.floor(Math.random() * 4 + 2);

    for (let i = 0; i < number_of_questions; i++) {
      step = i + 1;
      records.push(
        create_product_question_record(knex, product_question_id, product_id.product_id)
      );
      // console.log(records[0])
      product_question_id++
      // console.log(product_question_id);
    }
  });

  return records;
};

const create_product_question_record = (knex, id, product_id) => {
  return knex("product_questions").insert({
    product_question_id: id,
    product_id: product_id,
    question_text: faker.lorem.words() + "?",
    step: step,
    required: faker.random.boolean(),
    created_at: new Date(),
    updated_at: new Date(),
  });
};

const run_seed = (knex) => {
  let product_question_records = [];
  // Delete any exisiting records in the target table
  return knex("product_questions")
    .del()
    .then(() => {
      // Make an array to include every product_id
      return knex.select("product_id").from("products");
    })
    .then((product_ids) => {
      // const x = generate_product_question_records(knex, product_ids)
      // console.log(x)

      // Create product_question entries
      product_question_records.push(
        ...generate_product_question_records(knex, product_ids)
      );
      return Promise.all(product_question_records);
    })
    .then(() => {
      // Select last product_question_id
      return knex
        .select("product_question_id")
        .from("product_questions")
        .orderBy("product_question_id", "desc")
        .limit(1);
    })
    .then((results) => {
      const last_product_question_id = results[0]["product_question_id"];
      // Update sequence value
      return knex.schema.raw(
        `ALTER SEQUENCE product_questions_product_question_id_seq RESTART WITH ${
          last_product_question_id + 1
        }`
      );
    });
}

module.exports.run_seed = run_seed

exports.seed = (knex) => {

    return run_seed(knex)
}
