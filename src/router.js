import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

let router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '',
      component: () => import('./layouts/Main.vue'),
      children: [
        {
          path: '/',
          name: 'home',
          component: Home
        },
        {
          path: '/profile',
          name: 'profile',
          meta: { auth: true },
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import('./views/Profile.vue')
        },
        {
          path: '/single/:id',
          name: 'singleProduct',
          component: () => import('./views/SingleProduct.vue'),
          props: true
        }
      ]
    }
  ],
  scrollBehavior() {
    return { x: 0, y: 0 }
  }
})

router.beforeEach((to, from, next) => {
  let token = localStorage.getItem('token')
  if (to.matched.some(record => record.meta.auth)) {
    // if vistior has not token redirect him to  home
    if (!token) {
      return next({
        name: 'home',
        query: { redirect: to.fullPath }
      })
    }
  }
  return next()
})

export default router
