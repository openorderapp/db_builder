exports.up = function (knex) {
    return knex.schema
        .createTable('refresh_tokens', (table) => {
            table.increments('refresh_token_id')
            table.integer('employee_id').unsigned()
            table.string('refresh_token')

            table.timestamp('created_at').defaultTo(knex.fn.now())
            table.timestamp('updated_at').defaultTo(knex.fn.now())

            table
                .foreign('employee_id')
                .references('employees.employee_id')
        })
};

exports.down = function (knex) {
    return knex.schema
        .dropTable('refresh_tokens')
};
