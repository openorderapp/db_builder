const seed_product = require('./seed_products')
const seed_product_questions = require('./seed_product_questions')

exports.seed = function(knex) {
    return seed_product.run_seed(knex)
    
    .then(() => {

        return seed_product_questions.run_seed(knex)
    })
};
