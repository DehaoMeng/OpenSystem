import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'root',
      component: ()=>import("@/views/HomeView.vue")
    },
    {
      path: '/student',
      name: 'student',
      component: ()=>import("@/views/StudentView.vue")
    }
  ]
})

export default router
