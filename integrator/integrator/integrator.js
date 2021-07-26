const axios = require("axios");
var express = require("express");

const atualizarElastic = async () => {
  try {
    const response = axios.get("http://localhost:8080/api/noticias/101");
  } catch (error) {}
};

export default atualizarElastic;
