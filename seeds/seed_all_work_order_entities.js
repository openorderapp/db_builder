const seed_work_orders = require('./seed_work_orders')

const seed_work_order_products = require('./seed_work_order_products')

const seed_work_order_product_responses = require('./seed_work_order_product_responses')

const seed_work_order_events = require('./seed_work_order_events')

const seed_work_order_comments = require("./seed_work_order_event_comments")

const run_seed = (knex) => {
    return seed_work_orders.run_seed(knex).then(() => {

        return seed_work_order_products.run_seed(knex)

    }).then(() => {

        return seed_work_order_product_responses.run_seed(knex)

    }).then(() => {

        return seed_work_order_events.run_seed(knex)
        
    }).then(() => {

        return seed_work_order_comments.run_seed(knex)
    })
}

module.exports.run_seed = run_seed

exports.seed = (knex) => {

    return run_seed(knex)

}