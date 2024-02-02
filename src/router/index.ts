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
      path: '/index',
      name: 'index',
      component: ()=>import("@/views/IndexView.vue"),
      redirect: {name: 'home'},
      children: [
        {
          path: 'home',
          name: 'home',
          component: ()=>import("@/views/MessageView.vue")
        },
        {
          path: 'timetable',
          name: 'timetable',
          component: () => import("@/views/TimeableView.vue")
        }
      ]
    }
  ]
})

export default router
