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
    path: '/addAccount/:billId',
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
  // ???????????????

  // ??????????????????

  // ??? Cookie ?????? Token
  const hasToken = getToken()
  // console.log('token:',hasToken)
  // debugger
  // ?????? Token ????????????
  if (hasToken) {
    // ????????????????????? login ???????????????????????????
    if (to.path) {
      next()
    }
  } else {
    // ??????????????? URL ?????????????????????????????????
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      // ??????????????? URL ???????????????????????????????????????????????????????????????????????? URL ????????? redirect ?????????
      next(`/login?redirect=${to.path}`)
    }
  }
})

export default router
