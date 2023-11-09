const express = require("express");
const bodyParse = require("body-parser");
const route = require("../route/index");

const app = express();

app.use(bodyParse.json());

app.use("/v1", route);

module.exports = app;
