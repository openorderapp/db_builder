// Update with your config settings.

const config = require("./config");

module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      database: config.database.name,
      user:     config.database.user,
      password: config.database.password
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }
};
