import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/Register.vue')
    },
    {
      path: '/admin',
      name: 'adminHome',
      component: () => import('../views/admin/adminHome.vue')
    },
    {
      path: '/admin/addEvent',
      name: 'adminEvent',
      component: () => import('../views/admin/addEvent.vue')
    },
    {
      path: '/admin/addTeam',
      name: 'addTeam',
      component: () => import('../views/admin/addTeam.vue')
    },
    {
      path: '/admin/addLeague',
      name: 'addLeague',
      component: () => import('../views/admin/addLeague.vue')
    }


  ]
})

export default router
