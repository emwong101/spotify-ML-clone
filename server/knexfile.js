const path = require("node:path");
require("dotenv").config();

const { PORT, DB_LOCAL_DBNAME, DB_LOCAL_USER, DB_LOCAL_PASSWORD } = process.env;
module.exports = {
  development: {
    client: "mysql",
    debug: true,
    connection: {
      host: "127.0.0.1",
      database: DB_LOCAL_DBNAME,
      user: DB_LOCAL_USER,
      password: DB_LOCAL_PASSWORD,
      charset: "utf8",
    },
  },
};
