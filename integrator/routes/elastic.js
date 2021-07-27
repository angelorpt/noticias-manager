var express = require("express");
const axios = require("axios");
var http = require("http");

var router = express.Router();

// http.get(configuracoes, function (res) {
//   //console.log(res.statusCode);
//   res.on("data", function (body) {
//     console.log("Corpo: " + body);
//   });
// });

/* GET home page. */
router.get("/", async function (req, res, next) {
  //   axios
  //     .get("http://app:8100")
  //     .then(function (response) {
  //       res.json({ response: response });
  //     })
  //     .catch(function (error) {
  //       // handle error
  //       res.json({ error: error });
  //     });

  try {
    // const response = await axios.get(
    //   "https://jsonplaceholder.typicode.com/todos"
    // );
    const response = await axios.get("http://nginx/api/noticias/1");
    //     // const response = await fetch("http://app:8100/api/noticias/1");
    //     // waits until the request completes...
    //     console.log(response);
    res.json({ response });
  } catch (error) {
    res.json({ error, a: true });
  }
});

router.get("/teste", function (req, res, next) {
  res.json({ ok: true });
});

module.exports = router;
