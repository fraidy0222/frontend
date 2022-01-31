import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index';
;

// import Home from '../views/Home.vue'

import NProgress from "nprogress/nprogress.js"
import "nprogress/nprogress.css"

// routes 

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
    path: '/admin',
    name: 'Admin',
    redirect: "/admin/inicio",
    // meta: {
    //   requiredAuth: true
    // },
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
        component: () => import('../components/Aplicaciones/Aplicacion.vue')
      },
      {
        path: 'modulo',
        name: 'Modulo',
        component: () => import('../components/Aplicaciones/Modulo.vue')
      },
      {
        path: 'informaticas',
        name: 'Informaticas',
        component: () => import('../components/Aplicaciones/Informaticas.vue')
      },
      
      {
        path: 'entidad',
        name: 'Entidad',
        component: () => import('../components/Administracion/Entidad.vue')
      },
      {
        path: 'organo',
        name: 'Organo',
        component: () => import('../components/Automatica/Organo.vue')
      },
       {
        path: 'departamento',
        name: 'Departamento',
        component: () => import('../components/Administracion/Departamento.vue')
      },
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

router.beforeEach( (to,from, next) => {
  if (to.matched.some(record => record.meta.requiredAuth && !store.state.isAuthenticated)) {
    next({ name: 'Login' })
  }
  else next()
})
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