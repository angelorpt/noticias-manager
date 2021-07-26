const axios = require("axios");

const axios = axios.create({
  baseURL: url_api("http://app/api/"),
  timeout: 30000,
});
