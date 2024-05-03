import {createRouter, createWebHistory} from 'vue-router'
import LoginView from '../views/LoginView.vue'
import HomeView from '../views/HomeView.vue'
import StudentView from "../views/StudentView.vue";
import TeacherView from "../views/TeacherView.vue";
import ManagerView from "../views/ManagerView.vue";
import StaffView from "../views/StaffView.vue";
import FindPasswordView from '../views/FindPasswordView.vue';
import RegisterView from '../views/RegisterView.vue';
import ChangePasswordView from "@/components/ChangePasswordView.vue";

import studentBindIDView from '../components/student/BindIDView.vue';
import studentPayView from "@/components/student/PayView.vue";
import studentCheckView from "@/components/student/CheckView.vue";
import studentSearchCourseView from "@/components/student/SearchCourseView.vue";
import CourseDetailView from '@/components/CourseDetailView.vue';
import studentSearchGradeView from '@/components/student/SearchGradeView.vue';
import studentCourseEvaluateView from '@/components/student/CourseEvaluateView.vue';

import teacherSearchCourseView from "@/components/teacher/SearchCourseView.vue";
import teacherEnterCouerseGradeView from "@/components/teacher/EnterCourseGradeView.vue";
import teacherGradeDetailView from "@/components/teacher/GradeDetailView.vue";
import teachersearchEvaluateView from "@/components/teacher/SearchEvaluateView.vue";
import teacherBindIDView from "@/components/teacher/BindIDView.vue";

import staffRequestCheckView from "@/components/staff/RequestCheckView.vue";
import staffCheckDetailView from "@/components/staff/CheckDetailView.vue";


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
                    component:ChangePasswordView,
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
                },
                {
                    path:"/student/courseEvaluate",
                    name: 'courseEvaluate',
                    component:studentCourseEvaluateView,
                },
                {
                    path: '/student/coursedetail',
                    name: 'StudentCourseDetail',
                    component:CourseDetailView
                }
            ]
        },
        {
            path: '/teacher',
            name: 'teacher',
            component: TeacherView,
            children:[
                {
                    path:"/teacher/change-password",
                    name: 'teacherChangePassword',
                    component:ChangePasswordView,
                },
                {
                    path:"/teacher/searchCourse",
                    name:"teacherSearchCourse",
                    component:teacherSearchCourseView,
                },
                {
                    path:"/teacher/enterGrade",
                    name:"teacherEnterCourseGrade",
                    component:teacherEnterCouerseGradeView,
                },
                {
                    path:"/teacher/gradeDetail",
                    name:"teacherGradeDetail",
                    component:teacherGradeDetailView,
                },
                {
                    path: '/teacher/searchEvaluate',
                    name: 'teacherSearchEvaluate',
                    component:teachersearchEvaluateView,
                },
                {
                    path: '/teacher/bindid',
                    name: 'teacherBindID',
                    component:teacherBindIDView,
                }
                
            ]
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
            path: '/staff',
            name: 'staff',
            component: StaffView,
            children:[
                {
                    path:"/staff/requestCheck",
                    name: 'staffRequestCheck',
                    component:staffRequestCheckView,
                },
                {
                    path:"/staff/checkDetail",
                    name: 'staffCheckDetail',
                    component:staffCheckDetailView,
                },
                {
                    path:"/staff/change-password",
                    name: 'staffChangePassword',
                    component:ChangePasswordView,
                },
            ]
        },

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
