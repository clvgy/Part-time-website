/*
 * @Description: 路由配置
 * @Author: hai-27
 * @Date: 2020-02-07 16:23:00
 * @LastEditors: hai-27
 * @LastEditTime: 2020-02-27 13:58:48
 */
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const routes = [

  // {
  //   path: '/',
  //   name: 'Home',
  //   component: () => import('../views/recruitment.vue')
  // },
  {
    path: '/personalcenter',
    name: '个人中心',
    component: () => import('../views/personalcenter.vue')
  },
  {
    path: '/error',
    name: 'Error',
    component: () => import('../components/Error.vue')
  },
  {
    path: '/recruitment',
    name: '招聘信息',
    component: () => import('../views/recruitment.vue')
  },
  {
    path: '/editresume',
    name: '简历编辑',
    component: () => import('../views/editresume.vue'),
    meta: {
      requireAuth: true // 需要验证登录状态
    }
  },
  {
    path: '/submitresume',
    name: '简历投递',
    component: () => import('../views/submitresume.vue'),
    meta: {
      requireAuth: true // 需要验证登录状态
    }
  },
]

const router = new Router({
  // base: '/dist',
  // mode: 'history',
  routes
})

/* 由于Vue-router在3.1之后把$router.push()方法改为了Promise。所以假如没有回调函数，错误信息就会交给全局的路由错误处理。
vue-router先报了一个Uncaught(in promise)的错误(因为push没加回调) ，然后再点击路由的时候才会触发NavigationDuplicated的错误(路由出现的错误，全局错误处理打印了出来)。*/
// 禁止全局路由错误处理打印
const originalPush = Router.prototype.push;
Router.prototype.push = function push (location, onResolve, onReject) {
  if (onResolve || onReject)
    return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}

export default router
