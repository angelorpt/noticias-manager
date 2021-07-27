import Vue from 'vue'
import moment from 'moment'
import 'moment/locale/pt-br';

// "async" is optional;
// more info on params: https://quasar.dev/quasar-cli/cli-documentation/boot-files#Anatomy-of-a-boot-file
// export default async (/* { app, router, Vue ... } */) => {
  
// }

moment.locale('pt-br');
// console.log(moment.locale()); // pt-br
Vue.prototype.$moment = moment