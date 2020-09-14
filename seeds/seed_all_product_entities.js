const seed_product = require('./seed_products')
const seed_product_questions = require('./seed_product_questions')

const run_seed = (knex) => {
    return seed_product.run_seed(knex).then(() => {
        return seed_product_questions.run_seed(knex)
    })
}

module.exports.run_seed = run_seed

exports.seed = (knex) => {

  return run_seed(knex)

}