const { db, username, password, host } = require("../src/config/vars");

console.log(db, username, password, host);

module.exports = {
  development: {
    username: username,
    password: password,
    database: db,
    host: host,
    dialect: "mariadb",
  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  production: {
    username: "root",
    password: null,
    database: "database_production",
    host: "127.0.0.1",
    dialect: "mysql",
  },
};
