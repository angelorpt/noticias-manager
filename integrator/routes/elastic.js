var express = require("express");
const axios = require("axios");

var router = express.Router();

/* GET home page. */
router.get("/", async function (req, res, next) {
  try {
    const response = await axios.get("http://app:80/api/noticias/1");
    // const response = await axios.get("http://elastic:9200/");
    res.json({ response: response });
  } catch (error) {
    res.json({ error: error });
  }
});

router.get("/teste", function (req, res, next) {
  res.json({ ok: true });
});

module.exports = router;
