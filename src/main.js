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
axios.defaults.baseURL = "http://124.70.62.18/"

import user from "./store/user";



Vue.use(ElementUI);

router.beforeEach((to, from, next) => {
  const userInfo = user.getters.getUser(user.state());
  // Record the router address of page accessed before login
  if (to.path === '/login') {
    localStorage.setItem("preRoute", router.currentRoute.fullPath);
  }
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

new Vue({
  router,
  store,
  vuetify,
  material,
  el: '#app',
  render: h => h(App)
}).$mount('#app')
