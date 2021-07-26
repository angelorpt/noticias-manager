import Vue   from 'vue'
import axios from 'axios'

const url_api = ({ host, pathname }) => {

    let lstPath = pathname.split('/');

    switch (host) {
        case 'localhost:8080':
          return 'http://127.0.0.1:8000/api';

        case 'localhost:8081':
          return 'http://127.0.0.1:8000/api';

        case 'localhost':
          return 'http://127.0.0.1:8000/api';

        default:
          return 'https://cors-anywhere.herokuapp.com/https://arpclientesapi.herokuapp.com/api';

    }
}

// headers: {
//   "Access-Control-Allow-Origin": "*",
//   "Access-Control-Allow-Headers": "Authorization",
//   "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, PATCH, DELETE",
//   "Content-Type": "application/json;charset=UTF-8"
// },
const Axios = axios.create({
  baseURL: url_api(window.location),
  timeout: 30000,
});

Vue.prototype.$axios = Axios