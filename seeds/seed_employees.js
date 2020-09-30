const faker = require('faker')

const number_of_employees_to_seed = 100

const generate_employee_records = (knex) => {

    let records = [];

    for (let employee_id = 1; (employee_id - 1) < number_of_employees_to_seed; employee_id++) {
        records.push(create_employee_record(knex, employee_id))
    }
    return records
}

const create_employee_record = (knex, id) => {
    return knex('employees').insert({
        employee_id: id,
        employee_first_name: faker.name.firstName(),
        employee_last_name: faker.name.lastName(),
        employee_email: faker.internet.email(),
        employee_phone: faker.phone.phoneNumber(),
        employee_username: faker.internet.userName(),
        employee_password_hash: faker.internet.password(),
        employee_password_salt: faker.internet.password(),
        employee_is_admin: faker.random.boolean(),
        created_at: new Date(),
        updated_at: new Date()
    })
}

const run_seed = (knex) => {

    const 
        delete_work_order_events_promise = knex("work_order_events").del(),
        delete_work_order_event_comments_promise = knex("work_order_event_comments").del()

    return delete_work_order_event_comments_promise.then(() => {

        return delete_work_order_events_promise
    
    }).then(() => {

        return knex('employees').del();

    }).then(() => {

        // Create employee entries
        let employee_records = generate_employee_records(knex)
        return Promise.all(employee_records);

    }).then(() => {

        // Select last employee_id
        return knex.select('employee_id').from('employees').orderBy('employee_id', 'desc').limit(1);

    }).then(results => {

        const last_employee_id = results[0]['employee_id'];
        // Update sequence value
        return knex.schema.raw(`ALTER SEQUENCE employees_employee_id_seq RESTART WITH ${last_employee_id + 1}`);

    })
}

module.exports.run_seed = run_seed

exports.seed = (knex) => {

    return run_seed(knex)

}