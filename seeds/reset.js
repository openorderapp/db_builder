exports.seed = function (knex) {
    // Deletes ALL existing entries
    return knex('product_questions').del()
        .then(() => {
            return knex('products').del();
        }).then(results => {

            // Restart all sequence values at 1
            const sequence_update_queries = [
                knex.schema.raw(`ALTER SEQUENCE products_product_id_seq RESTART WITH 1`),
                knex.schema.raw(`ALTER SEQUENCE product_questions_product_question_id_seq RESTART WITH 1`)
            ]

            return Promise.all(sequence_update_queries);
        });
};
