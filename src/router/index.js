import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'

import NProgress from "nprogress/nprogress.js"
import "nprogress/nprogress.css"

Vue.use(VueRouter)

const routes = [
  // {
  //   path: '/',
  //   name: 'Home',
  //   component: Home
  // },
  {
    path: '/login',
    name: 'Login',
    component: () => import( '../views/Login.vue')
  },
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  },
  {
    path: '/admin',
    name: 'Admin',
    redirect: "/admin/inicio",
    component: () => import('../components/layout/Dashboard.vue'),
    children: 
    [
      {
        path: 'inicio',
        name: 'Home',
        component: () => import('../views/Home.vue')
      },
      {
        path: 'aplicacion',
        name: 'Aplicacion',
        component: () => import('../views/Aplicacion.vue')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

router.beforeResolve((to, from, next) => {
  if (to.path) {
    NProgress.start()
  }
  next()
})
NProgress.configure({ showSpinner: false })

router.afterEach(() => {
  NProgress.done()
})