
exports.up = function(knex) {
    return knex.schema
        .createTable('user_roles', (table) => {
            table.increments('user_role_id');
            table.string('user_role_name');
        
            table.timestamp('created_at').defaultTo(knex.fn.now());
        })

        .createTable('employee_roles', (table) => {
            table.increments('employee_role_id');
            table.string('employee_role_name');
        
            table.timestamp('created_at').defaultTo(knex.fn.now());
        })

        .createTable('users', (table) => {
            table.increments('user_id');
            table.string('user_first_name');
            table.string('user_last_name');
            table.json('user_middle_names');
            table.string('user_phone_number');
            table.string('user_password_hash');
            table.string('user_password_salt');
            table.integer('user_role_id');
            
            table.timestamp('created_at').defaultTo(knex.fn.now());
            table.timestamp('updated_at').defaultTo(knex.fn.now());

            table
                .foregin('user_role_id')
                .references('user_roles.user_role_id');
        })

        .createTable('organizations', (table) => {
            table.increments('organization_id');
            table.string('organization_name');
            table.text('comments');
            
            table.timestamp('created_at').defaultTo(knex.fn.now());
            table.timestamp('updated_at').defaultTo(knex.fn.now());
        })

        .createTable('locations', (table) => {
            table.increments('location_id');
            table.integer('organization_id').unsigned();
            table.text('location_name');
            table.text('country');
            table.text('state');
            table.text('city');
            table.text('street');
            table.text('building_number');
            table.text('unit');
            
            table.timestamp('created_at').defaultTo(knex.fn.now());
            table.timestamp('updated_at').defaultTo(knex.fn.now());

            table
                .foregin('organization_id')
                .references('organizations.organization_id');
        })

        .alterTable('employees', (table) =>{
            table.dropColumn('employee_first_name');
            table.dropColumn('employee_last_name');
            table.dropColumn('employee_email');
            table.dropColumn('employee_phone');
            table.dropColumn('employee_user_name');
            table.dropColumn('employee_password_hash');
            table.dropColumn('employee_password_salt');
            table.dropColumn('employee_is_admin');

            table.integer('organization_id').unsigned();
            table.integer('user_id').unsigned();
            table.integer('employee_role_id').unsigned();

            table
                .foregin('user_id')
                .references('users.user_id');
            table
                .foregin('employee_id')
                .references('employee_roles.employee_role_id');
        })

        .createTable('location_employees', (table) => {
            table.increments('location_employee_id')
            table.integer('location_id').unsigned()
            table.integer('employee_id').unsigned()
            
            table.timestamp('created_at').defaultTo(knex.fn.now())
            table.timestamp('updated_at').defaultTo(knex.fn.now())

            table
                .foregin('employee_id')
                .references('employees.employee_id')
            table
                .foregin('location_id')
                .references('locations.location_id')
        }) 
};

exports.down = function(knex) {
    return knex.schema
        .alterTable('employees', (table) =>{
            table.dropColumn('organization_id').unsigned();
            table.dropColumn('user_id').unsigned();
            table.dropColumn('employee_role_id').unsigned();

            table.string('employee_first_name');
            table.string('employee_last_name');
            table.string('employee_email');
            table.string('employee_phone');
            table.string('employee_user_name');
            table.string('employee_password_hash');
            table.string('employee_password_salt');
            table.boolen('employee_is_admin');
        })
        .dropTable('location_employees')
        .dropTable('locations')
        .dropTable('organizations')
        .dropTable('users')
        .dropTable('users_roles')
};
