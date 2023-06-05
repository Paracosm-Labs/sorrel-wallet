"use strict";

require("dotenv").config();

const { PRIVATE_KEY, TRON_PRO_API_KEY} = process.env;

module.exports = {
  PRIVATE_KEY,
  TRON_PRO_API_KEY,
};