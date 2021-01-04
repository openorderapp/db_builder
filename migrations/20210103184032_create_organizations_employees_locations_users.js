
exports.up = function(knex) {
    return knex.schema
        .createTable('employees', (table) =>{
            table.increments('employee_id')
            table.integer('organization_id').unsigned()
            table.integer('user_id').unsigned()
            table.integer('employee_role_id').unsigned()
            
            table.timestamp('created_at').defaultTo(knex.fn.now())
            table.timestamp('updated_at').defaultTo(knex.fn.now())

            table
                .foregin('employee_id')
                .references('work_order_events.employee_id')
        })

        .createTable('organizations', (table) => {
            table.increments('organization_id')
            table.string('organization_name')
            table.text('comments');
            
            table.timestamp('created_at').defaultTo(knex.fn.now())
            table.timestamp('updated_at').defaultTo(knex.fn.now())

            table
                .foregin('organization_id')
                .references('employees.organization_id')
        })

        .createTable('locations', (table) => {
            table.increments('location_id')
            table.integer('organization_id').unsigned()
            table.text('location_name')
            table.text('country')
            table.text('state')
            table.text('city')
            table.text('street')
            table.text('building_number')
            table.text('unit')
            
            table.timestamp('created_at').defaultTo(knex.fn.now())
            table.timestamp('updated_at').defaultTo(knex.fn.now())

            table
                .foregin('organization_id')
                .references('organizations.organization_id')
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

        .createTable('users', (table) => {
            table.increments('user_id')
            table.string('user_first_name')
            table.string('user_last_name')
            table.json('user_middle_names')
            table.string('user_phone_number')
            table.string('user_password_hash')
            table.string('user_password_salt')
            table.integer('user_role_id')
            
            table.timestamp('created_at').defaultTo(knex.fn.now())
            table.timestamp('updated_at').defaultTo(knex.fn.now())

            table
                .foregin('user_id')
                .references('employees.user_id')
        })

        .createTable('users_roles', (table) => {
            table.increments('user_role_id')
            table.string('user_role_name')
            
            table.timestamp('created_at').defaultTo(knex.fn.now())

            table
                .foregin('user_role_id')
                .references('users.user_role_id')
        })

        .createTable('employee_roles', (table) => {
            table.increments('employee_role_id')
            table.string('employee_role_name')
            
            table.timestamp('created_at').defaultTo(knex.fn.now())

            table
                .foregin('employee_role_id')
                .references('employees.employee_role_id')
        })
};

exports.down = function(knex) {
  
};
