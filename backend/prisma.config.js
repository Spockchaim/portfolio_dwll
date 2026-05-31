const { defineConfig } = require('@prisma/config');
require('dotenv/config');

module.exports = defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    seed: 'node prisma/seed.js',
  },
  datasource: {
    url: process.env.DATABASE_URL,
  },
});
