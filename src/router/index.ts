import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import FlattenView from '../views/FlattenView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/uppercase',
      name: 'uppercase',
      // route level code-splitting
      // this generates a separate chunk (UpperCaseView.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/UpperCaseView.vue'),
    },
    {
      path: '/lowercase',
      name: 'lowercase',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/LowerCaseView.vue'),
    },
    {
      path: '/flatten',
      name: 'flatten',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: FlattenView,
    },
  ],
})

export default router
