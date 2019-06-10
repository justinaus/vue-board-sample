import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
  routes: [
    {
      path: '/',
      component: () => import('./pages/Home.vue')
    },
    {
      path: '/posts',
      component: () => import('@/pages/Posts.vue')
    },
    {
      path: '/post/:id',
      component: () => import('@/pages/Post.vue')
    },
    {
      path: '/users',
      component: () => import('@/pages/Users.vue')
    },
  ]
})

export default router
