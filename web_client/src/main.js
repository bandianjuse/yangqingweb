// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import  './assets/reset.css';
import  './assets/iconfont/iconfont.css';
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'


Vue.config.productionTip = false
NProgress.configure({ showSpinner: false });

router.beforeEach((to, from, next) => {
  window.scrollTo(0, 0);
  next();
});
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
