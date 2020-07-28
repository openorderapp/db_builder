const faker = require('faker');

const number_of_events_to_seed = 100;

const generate_event_records = (knex, number_of_events_to_seed) => {

    let records = [];

    for (let event_id = 1; (event_id - 1) < number_of_events_to_seed; event_id++) {
        records.push(create_event_record(knex, event_id));
    }

    return records;

}

const create_event_record = (knex, id) => {
    return knex('events').insert({
        event_id: id,
        event_name: faker.lorem.word()
    });
}

exports.seed = function(knex) {

    let event_records = [];

    return knex('work_order_events').del().then(() => {

        return knex('events').del();

    }).then(() => {
        
        // Create event entries
        event_records.push(...generate_event_records(knex, number_of_events_to_seed));
        return Promise.all(event_records);

    }).then(() => {

        // Select last event_id
        return knex.select('event_id').from('events').orderBy('event_id', 'desc').limit(1);

    }).then(results => {

        const last_event_id = results[0]['event_id'];
        // Update sequence value
        return knex.schema.raw(`ALTER SEQUENCE events_event_id_seq RESTART WITH ${last_event_id + 1}`);

    })
};
