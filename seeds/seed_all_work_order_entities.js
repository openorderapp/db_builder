const seed_work_order = require('./seed_work_orders')

const seed_work_order_product = require('./seed_work_order_products')

const seed_work_order_product_response = require('./seed_work_order_product_responses')

const seed_work_order_event = require('./seed_work_order_events')

exports.seed = function(knex) {
    return seed_work_order.run_seed(knex)

    .then(() => {

        return seed_work_order_product.run_seed(knex)
    })

    .then(() => {

        return seed_work_order_product_response.run_seed(knex)
    })

    .then(() => {

        return seed_work_order_event.run_seed(knex)
    })
}