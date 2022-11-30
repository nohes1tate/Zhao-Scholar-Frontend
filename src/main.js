import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import vuetify from './plugins/vuetify'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import * as echarts from 'echarts';
import material from 'material-icons/iconfont/material-icons.css';
Vue.config.productionTip = false
Vue.prototype.$axios = axios;
Vue.prototype.$echarts = echarts;

Vue.use(ElementUI);

new Vue({
  router,
  store,
  vuetify,
  material,
  el: '#app',
  render: h => h(App)
}).$mount('#app')
