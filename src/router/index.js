import Vue from 'vue'
import VueRouter from 'vue-router'
import accountList from '../views/accountList.vue'
import { getToken } from '../utils/auth';

Vue.use(VueRouter)

const whiteList = ['/login']
/*eslint-disable */
const routes = [
  {
    path: '/',
    name: 'addAccount',
    component: () => import('../views/addAccount.vue')
  },
  {
    path: '/accountList',
    name: 'accountList',
    component: accountList
  },
  {
    path: '/addAccount',
    // name: 'addAccount',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/addAccount.vue')
  },
  {
    path: '/chart',
    name: 'chart',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/chart.vue'),
    // redirect: '/chart/one',
    // children: [
    //   {
    //     path: '/one',
    //     component: () => import('../components/one.vue')
    //   },
    //   {
    //     path: '/two',
    //     component: () => import('../components/two.vue')
    //   },
    //   {
    //     path: '/three',
    //     component: () => import('../components/three.vue')
    //   }
    // ]
  },
  {
    path: '/login',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach(async(to, from, next) => {
  // 启动进度条

  // 修改页面标题

  // 从 Cookie 获取 Token
  const hasToken = getToken()
  // console.log('token:',hasToken)
  // debugger
  // 判断 Token 是否存在
  if (hasToken) {
    // 如果当前路径为 login 则直接重定向至首页
    if (to.path) {
      next()
    }
  } else {
    // 如果访问的 URL 在白名单中，则直接访问
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      // 如果访问的 URL 不在白名单中，则直接重定向到登录页面，并将访问的 URL 添加到 redirect 参数中
      next(`/login?redirect=${to.path}`)
    }
  }
})

export default router
