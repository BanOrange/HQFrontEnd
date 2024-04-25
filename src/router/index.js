import {createRouter, createWebHistory} from 'vue-router'
import LoginView from '../views/LoginView.vue'
import HomeView from '../views/HomeView.vue'
import StudentView from "../views/StudentView.vue";
import TeacherView from "../views/TeacherView.vue";
import ManagerView from "../views/ManagerView.vue";
import FindPasswordView from '../views/FindPasswordView.vue';
import RegisterView from '../views/RegisterView.vue';
import studentBindIDView from '../components/student/BindIDView.vue';
import studentChangePasswordView from "@/components/student/ChangePasswordView.vue";
import studentPayView from "@/components/student/PayView.vue";
import studentCheckView from "@/components/student/CheckView.vue";
import studentSearchCourseView from "@/components/student/SearchCourseView.vue";
import CourseDetailView from '@/components/CourseDetailView.vue';
import studentSearchGradeView from '@/components/student/SearchGradeView.vue';

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
            component: StudentView,
            children:[
                {
                    path:"/student/bindid",
                    name: 'studentBind',
                    component:studentBindIDView,
                },
                {
                    path:"/student/change-password",
                    name: 'studentChangePassword',
                    component:studentChangePasswordView,
                },
                {
                    path:"/student/check",
                    name: 'studentCheck',
                    component:studentCheckView,
                },
                {
                    path:"/student/pay",
                    name: 'studentPay',
                    component:studentPayView,
                },
                {
                    path:"/student/searchCourse",
                    name: 'searchCourse',
                    component:studentSearchCourseView,
                },
                {
                    path:"/student/searchGrade",
                    name: 'searchGrade',
                    component:studentSearchGradeView,
                }
            ]
        },
        {
            path: '/teacher',
            name: 'teacher',
            component: TeacherView
        },
        {
            path: '/manager',
            name: 'manager',
            component: ManagerView
        },
        {
            path: '/findpassword',
            name: 'findpassword',
            component: FindPasswordView
        },
        {
            path: '/register',
            name: 'register',
            component: RegisterView
        },
        {
            path: '/coursedetail',
            name: 'courseDetail',
            component:CourseDetailView
        }

    ]
})

router.beforeEach((to, from, next) => {
    if (to.path === '/login' || to.path === '/findpassword' || to.path === '/register') {
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
