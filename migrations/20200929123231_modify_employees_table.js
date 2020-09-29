exports.up = function (knex) {
    return knex.schema
        .table('employees', (table) => {
            table.string('employee_user_name').unique().alter();
            table.string('employee_email').unique().alter();
            table.renameColumn('employee_user_name', 'employee_username')
        });
};
//
exports.down = function (knex) {
    return knex.schema
        .table('employees', (table) => {
            table.dropColumn('employee_username');
            table.dropColumn('employee_email');
        });
};
