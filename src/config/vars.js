require("dotenv").config();

const env = String(process.env.APP_ENV);
const port = Number(process.env.APP_PORT);
const db = String(process.env.DB_NAME);
const username = String(process.env.DB_USERNAME);
const password = String(process.env.DB_PASSWORD);
const host = String(process.env.DB_HOST);
const round = Number(process.env.HASH_ROUND);

module.exports = { port, env, db, username, password, host, round };
