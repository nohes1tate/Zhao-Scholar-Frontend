import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import vuetify from './plugins/vuetify'
import * as echarts from 'echarts';

Vue.config.productionTip = false
Vue.prototype.$axios = axios;
Vue.prototype.$echarts = echarts;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
