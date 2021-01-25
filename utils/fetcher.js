const config = require("../config.json");
const axios = require("axios");

module.exports = (url) =>
  axios(config.origin + url).then((response) => response.data);
