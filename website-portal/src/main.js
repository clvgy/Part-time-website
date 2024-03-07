import Vue from 'vue'
import App from './App.vue'
import router from './router'
import '@/assets/icon/iconfont.css';

import axios from 'axios'


// 引入elementui 库
import ElementUI from 'element-ui';
// 引入elmentui的css
import 'element-ui/lib/theme-chalk/index.css';

// 导入路由模块，目的： 拿到路由的实例对象
// import router from '@/router/index.js'

// 使用elementui 
Vue.use(ElementUI);


Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
