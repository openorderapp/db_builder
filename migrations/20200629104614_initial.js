exports.up = function (knex) {
    return knex.schema
      .createTable('customers', (table) => {
        table.increments('customer_id')
        table.string('customer_first_name')
        table.string('customer_last_name')
        table.string('customer_email')
        table.string('customer_phone')
        table.text('comments')
  
        table.timestamp('created_at').defaultTo(knex.fn.now())
        table.timestamp('updated_at').defaultTo(knex.fn.now())
      })
  
      .createTable('work_orders', (table) => {
        table.increments('work_order_id')
        table.integer('customer_id').unsigned()
        table.integer('no_of_items')
        table.integer('total')
        table.boolean('is_complete')
  
        table.timestamp('created_at').defaultTo(knex.fn.now())
        table.timestamp('updated_at').defaultTo(knex.fn.now())
  
        table.foreign('customer_id').references('customers.customer_id')
      })
  
      .createTable('employees', (table) => {
        table.increments('employee_id')
        table.string('employee_first_name')
        table.string('employee_last_name')
        table.string('employee_email')
        table.string('employee_phone')
        table.string('employee_user_name')
        table.string('employee_password_hash')
        table.string('employee_password_salt')
        table.boolean('employee_is_admin')
  
        table.timestamp('created_at').defaultTo(knex.fn.now())
        table.timestamp('updated_at').defaultTo(knex.fn.now())
      })
  
      .createTable('events', (table) => {
        table.increments('event_id')
        table.string('event_name')
      })
  
      .createTable('work_order_events', (table) => {
        table.increments('work_order_event_id')
        table.integer('work_order_id').unsigned()
        table.integer('event_id').unsigned()
        table.integer('employee_id').unsigned()
  
        table.timestamp('created_at').defaultTo(knex.fn.now())
        table.timestamp('updated_at').defaultTo(knex.fn.now())
  
        table.foreign('work_order_id').references('work_orders.work_order_id')
        table.foreign('event_id').references('events.event_id')
        table.foreign('employee_id').references('employees.employee_id')
  
      })
  
      .createTable('products', (table) => {
        table.increments('product_id')
        table.string('product_name')
        table.integer('price')
      })
  
      .createTable('product_questions', (table) => {
          table.increments('product_question_id')
          table.integer('product_id').unsigned()
          table.string('question_text')
          table.integer('step')
          table.boolean('required')
          table.timestamp('created_at')
          table.timestamp('updated_at')
  
          table
          .foreign('product_id')
          .references('products.product_id')
      })
  
      .createTable('work_order_products', (table) => {
        table.increments('work_order_product_id')
        table.integer('work_order_id').unsigned()
        table.integer('product_id').unsigned()
        table.integer('quantity')
        table.integer('subtotal')
        table.boolean('is_complete')
        table.timestamp('process_started_at')
        table.timestamp('process_completed_at')
        table.timestamp('payment_accepted_at')
        table.timestamp('product_fulfilled_at')
  
        table.timestamp('created_at').defaultTo(knex.fn.now())
        table.timestamp('updated_at').defaultTo(knex.fn.now())
  
        table.foreign('work_order_id').references('work_orders.work_order_id')
        table.foreign('product_id').references('products.product_id')
      })
  
      .createTable('work_order_product_responses', (table) => {
        table.increments('work_order_product_response_id')
        table.integer('work_order_product_id').unsigned()
        table.integer('product_question_id').unsigned()
        table.string('response_text')
        table.boolean('is_complete')
  
        table.timestamp('created_at').defaultTo(knex.fn.now())
        table.timestamp('updated_at').defaultTo(knex.fn.now())
  
        table
          .foreign('work_order_product_id')
          .references('work_order_products.work_order_product_id')
        table
          .foreign('product_question_id')
          .references('product_questions.product_question_id')
      })

      .createTable('comments', (table) => {
        table.increments('comment_id')
        table.text('comment_text')

        table.timestamp('created_at').defaultTo(knex.fn.now())
        table.timestamp('updated_at').defaultTo(knex.fn.now())

        table
          .foreign('work_order_event_id')
          .references('work_order_events.work_order_event_id')
      })
  }
  
  exports.down = function (knex) {
    return knex.schema
      .dropTable('work_order_product_responses')
      .dropTable('product_questions')
      .dropTable('work_order_products')
      .dropTable('products')
      .dropTable('work_order_events')
      .dropTable('events')
      .dropTable('work_orders')
      .dropTable('employees')
      .dropTable('customers')
      .dropTable('comments')
  }
  