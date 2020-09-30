const 
  seed_customers = require("./seed_customers"),
  seed_employees = require("./seed_employees"),
  seed_events = require("./seed_events"),
  seed_all_product_entities = require("./seed_all_product_entities"),
  seed_all_work_order_entities = require("./seed_all_work_order_entities")

const run_seed = (knex) => {

  return Promise.all([
    
    seed_customers.run_seed(knex),
    seed_employees.run_seed(knex),
    seed_events.run_seed(knex),
    seed_all_product_entities.run_seed(knex)

  ]).then(() => {

    return seed_all_work_order_entities.run_seed(knex)

  })

}

module.exports.run_seed = run_seed

exports.seed = (knex) => {

  return run_seed(knex)

}