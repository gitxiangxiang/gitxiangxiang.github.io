import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import Router from 'vue-router'
import routers from './routes'
import * as echarts from 'echarts'

Vue.config.productionTip = false;
Vue.prototype.$echarts = echarts;

Vue.use(ElementUI);
Vue.use(axios);
Vue.use(Router);

let router = new Router(routers);

new Vue({
  router: router,
  render: h => h(App),
}).$mount('#app');
