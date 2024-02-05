import {createRouter, createWebHistory} from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'root',
            component: () => import("@/views/General/HomeView.vue")
        },
        {
            path: '/index',
            name: 'index',
            component: () => import("@/views/General/IndexView.vue"),
            redirect: {name: 'home'},
            children: [
                // 通用子路由
                {
                    path: 'home',
                    name: 'home',
                    component: () => import("@/views/General/MessageView.vue")
                },
                {
                    path: 'timetable',
                    name: 'timetable',
                    component: () => import("@/views/General/TimeableView.vue")
                },
                // 学生子路由
                {
                    path: 'student-course-choosing',
                    name: 'student-course-choosing',
                    component: ()=>import("@/views/Student/StudentCourseView.vue")
                },
                {
                    path: 'student-course',
                    name: 'student-course',
                    component: () => import("@/views/Student/CurrentlyAvailableCoursesView.vue")
                }
            ]
        }
    ]
})

export default router
