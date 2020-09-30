exports.up = function(knex) {
    return knex.schema
        .alterTable('employees', (table) => {
            table.dropColumn('employee_user_name')
            table.string('employee_username').unique()
            table.string('employee_email').unique().alter()
            table.string('employee_phone').unique().alter()
        })
};

exports.down = function(knex) {
    return knex.schema
        .alterTable('employees', (table) => {
            table.dropColumn('employee_username')
            table.string('employee_user_name')

            table.dropUnique('employee_email')
            table.dropUnique('employee_phone')
        })
};
