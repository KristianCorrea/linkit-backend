var dotenv = require('dotenv');
dotenv.config({ path: '../.env' });
module.exports = {
  development: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: '../db/migrations'
    },
    seeds: {
      directory: '../db/seeds/dev'
    },
    useNullAsDefault: true
  },

  test: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: '../db/migrations'
    },
    seeds: {
      directory: '../db/seeds/test'
    },
    useNullAsDefault: true
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: '../db/migrations'
    },
    seeds: {
      directory: '../db/seeds/production'
    },
    useNullAsDefault: true
  }
}