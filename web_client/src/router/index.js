import Vue from 'vue'
import Router from 'vue-router'
import Home from '../pages/Home.vue'
import Service from '../pages/Service.vue'
import Join from '../pages/Join.vue'
import Concept from '../pages/Concept.vue'
import News from '../pages/News.vue'
import Works from '../pages/Works.vue'
import Contact from '../pages/Contact.vue'
import Details from '../pages/Details.vue'


Vue.use(Router)

export default new Router({
  //mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      beforeEnter: (to, from, next) => {
        document.title = '扬清_首页';
        next();
      }
    },
    {
      path: '/news',
      name: 'news',
      component: News,
      beforeEnter: (to, from, next) => {
        document.title = '扬清_动态';
        next();
      }
    },
    {
      path: '/works',
      name: 'works',
      component: Works,
      beforeEnter: (to, from, next) => {
        document.title = '扬清_作品';
        next();
      }
    },
    {
      path: '/service',
      name: 'service',
      component: Service,
      beforeEnter: (to, from, next) => {
        document.title = '扬清_服务';
        next();
      }
    },
    {
      path: '/join',
      name: 'join',
      component: Join,
      beforeEnter: (to, from, next) => {
        document.title = '扬清_加入我们';
        next();
      }
    },
    {
      path: '/concept',
      name: 'concept',
      component: Concept,
      beforeEnter: (to, from, next) => {
        document.title = '扬清_观点';
        next();
      }
    },
    {
      path: '/contact',
      name: 'contact',
      component: Contact,
      beforeEnter: (to, from, next) => {
        document.title = '扬清_联系';
        next();
      }
    },
    {
      path: '/details/:type/:id',
      name: 'details',
      component: Details
    }

  ]
})
