import {createRouter, createWebHistory} from 'vue-router'
import LoginView from '../views/LoginView.vue'
import HomeView from '../views/HomeView.vue'
import StudentView from "../views/StudentView.vue";
import TeacherView from "../views/TeacherView.vue";
import AdminView from "../views/AdminView.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/login',
            name: 'login',
            component: LoginView
        },
        {
            path: '/',
            name: 'home',
            component: HomeView
        },

        {
            path: '/student',
            name: 'student',
            component: StudentView
        },
        {
            path: '/teacher',
            name: 'teacher',
            component: TeacherView
        },
        {
            path: '/admin',
            name: 'admin',
            component: AdminView
        }

    ]
})

router.beforeEach((to, from, next) => {
    if (to.path === '/login') {
        next()
    } else {
        const username = sessionStorage.getItem("username")
        if (username == null) {
            next('/login')
        } else {
            next();
        }
    }
})
export default router
