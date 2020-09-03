exports.up = function(knex) {
    return knex.schema
        .createTable('work_order_event_comments', (table) => {
            table.increments('work_order_event_comment_id')
            table.integer('work_order_event_id').unsigned()
            table.text('work_order_event_comment')

            table.timestamp('created_at').defaultTo(knex.fn.now())
            table.timestamp('updated_at').defaultTo(knex.fn.now())

            table
                .foreign('work_order_event_id')
                .references('work_order_events.work_order_event_id')
        })
};

exports.down = function(knex) {
    return knex.schema
        .dropTable('work_order_event_comments')
};
