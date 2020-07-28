// this file runs but could use some tidying up

const faker = require("faker");

const number_of_customers_to_seed = 100;

const generate_customer_records = (knex, number_of_customers_to_seed) => {
  let records = [];

  for (
    let customer_id = 1;
    customer_id - 1 < number_of_customers_to_seed;
    customer_id++
  ) {
    records.push(create_customer_record(knex, customer_id));
  }

  return records;
};

const create_customer_record = (knex, id) => {
  return knex("customers").insert({
    customer_id: id,
    customer_first_name: faker.name.firstName(),
    customer_last_name: faker.name.lastName(),
    customer_email: faker.internet.email(),
    customer_phone: faker.phone.phoneNumber(),
    comments: faker.lorem.text(),
    created_at: new Date(),
    updated_at: new Date(),
  });
};

// generate and create work order methods

const number_of_work_orders_to_seed = 10;

const generate_work_order_records = (
  knex,
  number_of_work_orders_to_seed,
  customer_ids
) => {
  let records = [];
  let customer_id = 1;

  for (
    let work_order_id = 1;
    work_order_id - 1 < number_of_work_orders_to_seed;
    work_order_id++
  ) {
    records.push(create_work_order_record(knex, work_order_id, customer_ids));
  }
  return records;
};

const create_work_order_record = (knex, id, customer_ids) => {
  let max_index = customer_ids.length - 1;

  let random_int = (max) => {
    max = Math.floor(max);
    return Math.floor(Math.random() * (max + 1));
  };

  let random_index = random_int(customer_ids.length);

  return knex("work_orders").insert({
    work_order_id: id,
    customer_id: random_index,
    no_of_items: faker.random.number(100),
    total: faker.random.number(999999),
    is_complete: faker.random.boolean(),
    created_at: new Date(),
    updated_at: new Date(),
  });
};

// generate and create employee methods

const number_of_employees_to_seed = 100;

const generate_employee_records = (knex, number_of_employees_to_seed) => {
  let records = [];

  for (
    let employee_id = 1;
    employee_id - 1 < number_of_employees_to_seed;
    employee_id++
  ) {
    records.push(create_employee_record(knex, employee_id));
  }
  return records;
};

const create_employee_record = (knex, id) => {
  return knex("employees").insert({
    employee_id: id,
    employee_first_name: faker.name.firstName(),
    employee_last_name: faker.name.lastName(),
    employee_email: faker.internet.email(),
    employee_phone: faker.phone.phoneNumber(),
    employee_user_name: faker.internet.userName(),
    employee_password_hash: faker.internet.password(),
    employee_password_salt: faker.internet.password(),
    employee_is_admin: faker.random.boolean(),
    created_at: new Date(),
    updated_at: new Date(),
  });
};

// generate and create event methods

const number_of_events_to_seed = 100;

const generate_event_records = (knex, number_of_events_to_seed) => {
  let records = [];

  for (let event_id = 1; event_id - 1 < number_of_events_to_seed; event_id++) {
    records.push(create_event_record(knex, event_id));
  }

  return records;
};

const create_event_record = (knex, id) => {
  return knex("events").insert({
    event_id: id,
    event_name: faker.lorem.word(),
  });
};

// generate and create work_order_events methods

let number_of_work_order_events_to_seed = 100;
let records = [];
let work_order_event_records = [];

let random_work_order_ids_index;
let random_event_ids_index;
let random_employee_ids_index;

let select_column_from_table = (knex, column_name, table_name) => {
  return new Promise((resolve, reject) => {
    knex
      .select(column_name)
      .from(table_name)
      .then((select_response) => {
        return_payload = [];
        select_response.forEach((entry) => {
          return_payload.push(entry[column_name]);
        });
        resolve(return_payload);
      });
  });
};

// A function to randomly generate an id to be grabbed from a foreign key array
const random_index = (max) => {
  max = Math.floor(max);
  return Math.floor(Math.random() * (max + 1));
};

// A function to generate the work_order_event_records, and insert the records
// created in the "create" function below
const generate_work_order_event_records = (knex) => {
  for (
    let work_order_event_id = 1;
    work_order_event_id - 1 < number_of_work_order_events_to_seed;
    work_order_event_id++
  ) {
    records.push(create_work_order_event_record(knex, work_order_event_id));
  }

  return records;
};

// A function to create the individual rows in the table
const create_work_order_event_record = (knex, id) => {
  random_work_order_ids_index = random_index(work_order_ids.length - 1);

  random_event_ids_index = random_index(event_ids.length - 1);

  random_employee_ids_index = random_index(employee_ids.length - 1);

  return knex("work_order_events").insert({
    work_order_event_id: id,
    work_order_id: work_order_ids[random_work_order_ids_index],
    event_id: event_ids[random_event_ids_index],
    employee_id: employee_ids[random_employee_ids_index],
    comments: faker.lorem.text(),
    created_at: new Date(),
    updated_at: new Date(),
  });
};

// generate and create products methods

const number_of_products_to_seed = 5;

const generate_product_records = (knex, number_of_products_to_seed) => {
  let records = [];

  for (
    let product_id = 1;
    product_id - 1 < number_of_products_to_seed;
    product_id++
  ) {
    records.push(create_product_record(knex, product_id));
  }
  return records;
};

const create_product_record = (knex, id) => {
  return knex("products").insert({
    product_id: id,
    product_name: faker.commerce.productName(),
    price: faker.random.number(1000000),
  });
};

// generate and create product_questions methods

product_question_id = 1;
step = 1;

const generate_product_question_records = (knex, product_ids) => {
  let records = [];

  product_ids.forEach((product_id) => {
    // console.log(product_id);
    let number_of_questions = Math.floor(Math.random() * 4 + 2);

    for (let i = 0; i < number_of_questions; i++) {
      step = i + 1;
      records.push(
        create_product_question_record(
          knex,
          product_question_id,
          product_id.product_id
        )
      );
      // console.log(records[0])
      product_question_id++;
      // console.log(product_question_id);
    }
  });

  return records;
};

const create_product_question_record = (knex, id, product_id) => {
  return knex("product_questions").insert({
    product_question_id: id,
    product_id: product_id,
    question_text: faker.lorem.words() + "?",
    step: step,
    required: faker.random.boolean(),
    created_at: new Date(),
    updated_at: new Date(),
  });
};

// generate and create work_order_products methods

let number_of_work_order_products_to_seed = 100;
let work_order_product_records = [];

// let random_work_order_ids_index
// let random_product_ids_index

select_column_from_table = (knex, column_name, table_name) => {
  return new Promise((resolve, reject) => {
    knex
      .select(column_name)
      .from(table_name)
      .then((select_response) => {
        return_payload = [];
        select_response.forEach((entry) => {
          return_payload.push(entry[column_name]);
        });
        resolve(return_payload);
      });
  });
};

// A function to randomly generate an id to be usec from a foreign key array
// random_index = max => {
//     max = Math.floor(max)
//     return Math.floor(Math.random() * (max + 1))
// }

// A function to generate the line items in a work order, and insert the records
// created in the "create" function below
const generate_work_order_product_records = (knex) => {
  let records = [];

  for (
    let work_order_product_id = 1;
    work_order_product_id - 1 < number_of_work_order_products_to_seed;
    work_order_product_id++
  ) {
    records.push(create_work_order_product_record(knex, work_order_product_id));
  }

  return records;
};

// A function to create the individual rows in the table
const create_work_order_product_record = (knex, id) => {
  random_work_order_ids_index = random_index(work_order_ids.length - 1);

  random_product_ids_index = random_index(product_ids.length - 1);

  return knex("work_order_products").insert({
    work_order_product_id: id,
    work_order_id: work_order_ids[random_work_order_ids_index],
    product_id: product_ids[random_product_ids_index],
    quantity: faker.random.number(99) + 1,
    subtotal: faker.random.number(6),
    is_complete: faker.random.boolean(),
    process_started_at: new Date(),
    process_completed_at: new Date(),
    payment_accepted_at: new Date(),
    product_fulfilled_at: new Date(),
    created_at: new Date(),
    updated_at: new Date(),
  });
};

// generate and create work_order_product_responses methods

let number_of_work_order_product_responses_to_seed = 100;
let work_order_product_response_records = [];

let random_work_order_product_ids_index;
let random_product_question_ids_index;

select_column_from_table = (knex, column_name, table_name) => {
  return new Promise((resolve, reject) => {
    knex
      .select(column_name)
      .from(table_name)
      .then((select_response) => {
        return_payload = [];
        select_response.forEach((entry) => {
          return_payload.push(entry[column_name]);
        });
        resolve(return_payload);
      });
  });
};

// A function to randomly generate an id to be usec from a foreign key array
// const random_index = (max) => {
//   max = Math.floor(max);
//   return Math.floor(Math.random() * (max + 1));
// };

// A function to generate the line items in a work order, and insert the records
// created in the "create" function below
const generate_work_order_product_response_records = (knex) => {
  let records = [];

  for (
    let work_order_product_response_id = 1;
    work_order_product_response_id - 1 <
    number_of_work_order_product_responses_to_seed;
    work_order_product_response_id++
  ) {
    records.push(
      create_work_order_product_response_record(
        knex,
        work_order_product_response_id
      )
    );
  }

  return records;
};

// A function to create the individual rows in the table
const create_work_order_product_response_record = (knex, id) => {
  random_work_order_product_ids_index = random_index(
    work_order_product_ids.length - 1
  );

  random_product_question_ids_index = random_index(
    product_question_ids.length - 1
  );

  return knex("work_order_product_responses").insert({
    work_order_product_response_id: id,
    work_order_product_id:
      work_order_product_ids[random_work_order_product_ids_index],
    product_question_id:
      product_question_ids[random_product_question_ids_index],
    response_text: faker.lorem.text(25),
    is_complete: faker.random.boolean(),
    created_at: new Date(),
    updated_at: new Date(),
  });
};

exports.seed = function (knex) {
  // make customer table records

  let customer_records = [];

  return (
    knex("work_orders")
      .del()
      .then(() => {
        return knex("customers").del();
      })
      .then(() => {
        // Create customer entries
        customer_records.push(
          ...generate_customer_records(knex, number_of_customers_to_seed)
        );
        return Promise.all(customer_records);
      })
      .then(() => {
        // Select last customer_id
        return knex
          .select("customer_id")
          .from("customers")
          .orderBy("customer_id", "desc")
          .limit(1);
      })
      .then((results) => {
        const last_customer_id = results[0]["customer_id"];
        // Update sequence value
        return knex.schema.raw(
          `ALTER SEQUENCE customers_customer_id_seq RESTART WITH ${
            last_customer_id + 1
          }`
        );
    })

      // make work order table records

      .then(() => {
        let work_order_records = [];

        return (
          knex("work_order_products")
            .del()
            .then(() => {
              return knex("work_orders").del();
            })
            .then(() => {
              return knex.select("customer_id").from("customers");
            })
            .then((customer_ids) => {
              // Create work_order entries
              work_order_records.push(
                ...generate_work_order_records(
                  knex,
                  number_of_work_orders_to_seed,
                  customer_ids
                )
              );
              return Promise.all(work_order_records);
            })
            .then(() => {
              // Select last work_order_id
              return knex
                .select("work_order_id")
                .from("work_orders")
                .orderBy("work_order_id", "desc")
                .limit(1);
            })
            .then((results) => {
              const last_work_order_id = results[0]["work_order_id"];
              // Update sequence value
              return knex.schema.raw(
                `ALTER SEQUENCE work_orders_work_order_id_seq RESTART WITH ${
                  last_work_order_id + 1
                }`
              );
            })

            // make employee table records

            .then(() => {
              let employee_records = [];

              return (
                knex("work_order_events")
                  .del()
                  .then(() => {
                    return knex("employees").del();
                  })
                  .then(() => {
                    // Create employee entries
                    employee_records.push(
                      ...generate_employee_records(
                        knex,
                        number_of_employees_to_seed
                      )
                    );
                    return Promise.all(employee_records);
                  })
                  .then(() => {
                    // Select last employee_id
                    return knex
                      .select("employee_id")
                      .from("employees")
                      .orderBy("employee_id", "desc")
                      .limit(1);
                  })
                  .then((results) => {
                    const last_employee_id = results[0]["employee_id"];
                    // Update sequence value
                    return knex.schema.raw(
                      `ALTER SEQUENCE employees_employee_id_seq RESTART WITH ${
                        last_employee_id + 1
                      }`
                    );
                  })

                  // make event table records

                  .then(() => {
                    let event_records = [];

                    return knex("work_order_events")
                      .del()
                      .then(() => {
                        return knex("events").del();
                      })
                      .then(() => {
                        // Create event entries
                        event_records.push(
                          ...generate_event_records(
                            knex,
                            number_of_events_to_seed
                          )
                        );
                        return Promise.all(event_records);
                      })
                      .then(() => {
                        // Select last event_id
                        return knex
                          .select("event_id")
                          .from("events")
                          .orderBy("event_id", "desc")
                          .limit(1);
                      })
                      .then((results) => {
                        const last_event_id = results[0]["event_id"];
                        // Update sequence value
                        return knex.schema.raw(
                          `ALTER SEQUENCE events_event_id_seq RESTART WITH ${
                            last_event_id + 1
                          }`
                        );
                      });
                  })

                  // make work_order_event table records

                  .then(() => {
                    //Promise to delete from work_order_events
                    const work_order_events_delete_promise = knex(
                      "work_order_events"
                    ).del();

                    // Promise to select values from work_orders
                    const work_order_ids_select_promise = select_column_from_table(
                      knex,
                      "work_order_id",
                      "work_orders"
                    );

                    // Promise to select values from events
                    const event_ids_select_promise = select_column_from_table(
                      knex,
                      "event_id",
                      "events"
                    );

                    // Promise to select values from employees
                    const employee_ids_select_promise = select_column_from_table(
                      knex,
                      "employee_id",
                      "employees"
                    );

                    // Begin by using a promise to delete work_order_events table data
                    return (
                      work_order_events_delete_promise

                        .then(() => {
                          //then use promise to select work_orders_ids in an array
                          return work_order_ids_select_promise;
                        })
                        .then((work_order_ids_select_response) => {
                          // Assign the response to a variable
                          work_order_ids = work_order_ids_select_response;

                          //then use promise to select event_ids in an array
                          return event_ids_select_promise;
                        })
                        .then((event_ids_select_response) => {
                          //Assign the response to a variable
                          event_ids = event_ids_select_response;
                          return employee_ids_select_promise;
                        })
                        .then((employee_ids_select_response) => {
                          //Assign the response to a variable
                          employee_ids = employee_ids_select_response;
                        })
                        .then(() => {
                          // generate the required number of records, and insert their data
                          work_order_event_records.push(
                            ...generate_work_order_event_records(
                              knex,
                              number_of_work_order_events_to_seed,
                              work_order_ids,
                              event_ids,
                              employee_ids
                            )
                          );

                          return Promise.all(work_order_event_records);
                        })
                        .then(() => {
                          // Select last work_order_event_id
                          return knex
                            .select("work_order_event_id")
                            .from("work_order_events")
                            .orderBy("work_order_event_id", "desc")
                            .limit(1);
                        })
                        .then((results) => {
                          const last_work_order_event_id =
                            results[0]["work_order_event_id"];
                          // Update sequence value
                          return knex.schema.raw(
                            `ALTER SEQUENCE work_order_events_work_order_event_id_seq RESTART WITH ${
                              last_work_order_event_id + 1
                            }`
                          );
                        })

                        // make product table records

                        .then(() => {
                          let product_records = [];

                          return knex("work_order_products")
                            .del()
                            .then(() => {
                              return knex("product_questions").del();
                            })
                            .then(() => {
                              return knex("products").del();
                            })
                            .then(() => {
                              // Create product entries
                              product_records.push(
                                ...generate_product_records(
                                  knex,
                                  number_of_products_to_seed
                                )
                              );
                              return Promise.all(product_records);
                            })
                            .then(() => {
                              // Select last product_id
                              return knex
                                .select("product_id")
                                .from("products")
                                .orderBy("product_id", "desc")
                                .limit(1);
                            })
                            .then((results) => {
                              const last_product_id = results[0]["product_id"];
                              // Update sequence value
                              return knex.schema.raw(
                                `ALTER SEQUENCE products_product_id_seq RESTART WITH ${
                                  last_product_id + 1
                                }`
                              );
                            });
                        })

                        // make product_questions table records

                        .then(() => {
                          let product_question_records = [];
                          // Delete any exisiting records in the target table
                          return (
                            knex("product_questions")
                              .del()
                              .then(() => {
                                // Make an array to include every product_id
                                return knex
                                  .select("product_id")
                                  .from("products");
                              })
                              .then((product_ids) => {
                                // const x = generate_product_question_records(knex, product_ids)
                                // console.log(x)

                                // Create product_question entries
                                product_question_records.push(
                                  ...generate_product_question_records(
                                    knex,
                                    product_ids
                                  )
                                );
                                return Promise.all(product_question_records);
                              })
                              .then(() => {
                                // Select last product_question_id
                                return knex
                                  .select("product_question_id")
                                  .from("product_questions")
                                  .orderBy("product_question_id", "desc")
                                  .limit(1);
                              })
                              .then((results) => {
                                const last_product_question_id =
                                  results[0]["product_question_id"];
                                // Update sequence value
                                return knex.schema.raw(
                                  `ALTER SEQUENCE product_questions_product_question_id_seq RESTART WITH ${
                                    last_product_question_id + 1
                                  }`
                                );
                              })

                              // make work_order_products table records

                              .then(() => {
                                // let work_order_product_records = []

                                //Promise to delete from work_order_product_responses
                                const work_order_product_responses_delete_promise = knex(
                                  "work_order_product_responses"
                                ).del();

                                //Promise to delete from work_order_products
                                const work_order_products_delete_promise = knex(
                                  "work_order_products"
                                ).del();

                                // Promise to select values from work_orders
                                const work_order_ids_select_promise = select_column_from_table(
                                  knex,
                                  "work_order_id",
                                  "work_orders"
                                );

                                // Promise to select values from products
                                const product_ids_select_promise = select_column_from_table(
                                  knex,
                                  "product_id",
                                  "products"
                                );

                                // Begin by using a promise to delete work_order_products table data
                                return (
                                  work_order_product_responses_delete_promise

                                    .then(() => {
                                      // then use a promise to delete products table data
                                      return work_order_products_delete_promise;
                                    })
                                    .then(() => {
                                      //then use promise to select product_ids in an array
                                      return product_ids_select_promise;
                                    })
                                    .then((product_ids_select_response) => {
                                      // Assign the response to a variable
                                      product_ids = product_ids_select_response;

                                      //then use promise to select work_order_ids in an array
                                      return work_order_ids_select_promise;
                                    })
                                    .then((work_order_ids_select_response) => {
                                      //Assign the response to a variable
                                      work_order_ids = work_order_ids_select_response;
                                    })
                                    .then(() => {
                                      // generate the required number of records, and insert their data
                                      work_order_product_records.push(
                                        ...generate_work_order_product_records(
                                          knex,
                                          number_of_work_order_products_to_seed,
                                          work_order_ids,
                                          product_ids
                                        )
                                      );

                                      return Promise.all(
                                        work_order_product_records
                                      );
                                    })
                                    .then(() => {
                                      // Select last work_order_id
                                      return knex
                                        .select("work_order_id")
                                        .from("work_orders")
                                        .orderBy("work_order_id", "desc")
                                        .limit(1);
                                    })
                                    .then((results) => {
                                      const last_work_order_id =
                                        results[0]["work_order_id"];
                                      // Update sequence value
                                      return knex.schema.raw(
                                        `ALTER SEQUENCE work_orders_work_order_id_seq RESTART WITH ${
                                          last_work_order_id + 1
                                        }`
                                      );
                                    })

                                    // make work_order_product_responses table records

                                    .then(() => {
                                      // let work_order_product_response records = []

                                      //Promise to delete from work_order_product_responses
                                      const work_order_product_responses_delete_promise = knex(
                                        "work_order_product_responses"
                                      ).del();

                                      // Promise to select values from product_questions
                                      const product_question_ids_select_promise = select_column_from_table(
                                        knex,
                                        "work_order_id",
                                        "work_orders"
                                      );

                                      // Promise to select values from work_order_products
                                      const work_order_product_ids_select_promise = select_column_from_table(
                                        knex,
                                        "work_order_product_id",
                                        "work_order_products"
                                      );

                                      // Begin by using a promise to delete work_order_product_responses table data
                                      return work_order_product_responses_delete_promise

                                        .then(() => {
                                          //then use promise to select product_question_ids in an array
                                          return product_question_ids_select_promise;
                                        })
                                        .then(
                                          (
                                            product_question_ids_select_response
                                          ) => {
                                            // Assign the response to a variable
                                            product_question_ids = product_question_ids_select_response;

                                            //then use promise to select work_order_product_ids in an array
                                            return work_order_product_ids_select_promise;
                                          }
                                        )
                                        .then(
                                          (
                                            work_order_product_ids_select_response
                                          ) => {
                                            //Assign the response to a variable
                                            work_order_product_ids = work_order_product_ids_select_response;
                                          }
                                        )
                                        .then(() => {
                                          // generate the required number of records, and insert their data
                                          work_order_product_response_records.push(
                                            ...generate_work_order_product_response_records(
                                              knex,
                                              number_of_work_order_product_responses_to_seed,
                                              work_order_product_ids,
                                              product_question_ids
                                            )
                                          );

                                          return Promise.all(
                                            work_order_product_response_records
                                          );
                                        })
                                        .then(() => {
                                          // Select last work_order_product_response_id
                                          return knex
                                            .select(
                                              "work_order_product_response_id"
                                            )
                                            .from(
                                              "work_order_product_responses"
                                            )
                                            .orderBy(
                                              "work_order_product_response_id",
                                              "desc"
                                            )
                                            .limit(1);
                                        })
                                        .then((results) => {
                                          const last_work_order_product_response_id =
                                            results[0][
                                              "work_order_product_response_id"
                                            ];
                                          // Update sequence value
                                          return knex.schema.raw(
                                            `ALTER SEQUENCE work_order_product_responses_work_order_product_response_id_seq RESTART WITH ${
                                              last_work_order_product_response_id +
                                              1
                                            }`
                                          );
                                        });
                                    })
                                );
                              })
                          );
                        })
                    );
                  })
              );
            })
        );
      })
  );
};
