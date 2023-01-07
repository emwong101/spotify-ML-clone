// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

const path = require("node:path");
require("dotenv").config();
/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
const { PORT, DB_LOCAL_DBNAME, DB_LOCAL_USER, DB_LOCAL_PASSWORD } = process.env;
module.exports = {
  client: "mysql",
  debug: true,
  connection: {
    host: "127.0.0.1",
    database: DB_LOCAL_DBNAME,
    user: DB_LOCAL_USER,
    password: DB_LOCAL_PASSWORD,
    charset: "utf8",
  },
};
