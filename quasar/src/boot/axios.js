import Vue from "vue";
import axios from "axios";

const Axios = axios.create({
  baseURL: "http://localhost:8100/api",
  timeout: 30000
});

Vue.prototype.$axios = Axios;
