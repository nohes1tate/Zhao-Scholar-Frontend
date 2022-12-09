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
axios.defaults.baseURL = "http://124.70.62.18/api/"

import AMap from 'vue-amap';
Vue.use(AMap);

// 初始化vue-amap
AMap.initAMapApiLoader({
  // 高德key
  key: '25318b8ad2adf02d2d1b93cb7028021e',
  // 插件集合 （插件按需引入）
  plugin: ['AMap.Geolocation']
});

Vue.use(ElementUI);


new Vue({
  router,
  store,
  vuetify,
  material,
  el: '#app',
  render: h => h(App)
}).$mount('#app')
