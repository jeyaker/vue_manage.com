import Vue from 'vue';
import App from './App.vue';

import './fw';
import 'assets/style/reset.css';
import 'animate.css'

import store from 'store';
import router from 'router';


Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')




/*

  这是一段代码注释！！！！！！



 */