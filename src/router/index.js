import {createRouter, createWebHistory} from 'vue-router'
import LoginView from '../views/LoginView.vue'
import StudentView from "../views/StudentView.vue";
import TeacherView from "../views/TeacherView.vue";
import ManagerView from "../views/ManagerView.vue";
import StaffView from "../views/StaffView.vue";
import FindPasswordView from '../views/FindPasswordView.vue';
import RegisterView from '../views/RegisterView.vue';
import ChangePasswordView from "@/components/ChangePasswordView.vue";
import ExecutorView from '../views/ExecutorView.vue';
import CompanyView from '@/views/CompanyView.vue';

import studentBindIDView from '../components/student/BindIDView.vue';
import studentCheckView from "@/components/student/CheckView.vue";
import studentSearchCourseView from "@/components/student/SearchCourseView.vue";
import CourseDetailView from '@/components/student/CourseDetailView.vue';
import studentSearchGradeView from '@/components/student/SearchGradeView.vue';
import studentCourseEvaluateView from '@/components/student/CourseEvaluateView.vue';
import studentCourseEvaluateDetailView from '@/components/student/CourseEvaluateDetailView.vue';
import studentPayView from '@/components/student/PayView.vue';
import studentPayDetailView from '@/components/student/PayDetailView.vue';

import teacherSearchCourseView from "@/components/teacher/SearchCourseView.vue";
import teacherEnterCouerseGradeView from "@/components/teacher/EnterCourseGradeView.vue";
import teacherGradeDetailView from "@/components/teacher/GradeDetailView.vue";
import teacherSearchEvaluateView from "@/components/teacher/SearchEvaluateView.vue";
import teacherBindIDView from "@/components/teacher/BindIDView.vue";
import teacherCourseDetailView from "@/components/teacher/CourseDetailView.vue";
import teacherStudentGradeDetailView from "@/components/teacher/StudentGradeDetailView.vue"

import staffRequestCheckView from "@/components/staff/RequestCheckView.vue";
import staffCheckDetailView from "@/components/staff/CheckDetailView.vue";

import executorBindIDView from "@/components/executor/BindIDView.vue";
import executorStudentManageView from "@/components/executor/StudentManageView.vue"
import executorStudentModifyView from "@/components/executor/StudentModifyView.vue"
import executorStudentAddView from "@/components/executor/StudentAddView.vue"
import executorCourseManageView from "@/components/executor/CourseManageView.vue";
import executorCourseAddView from "@/components/executor/CourseAddView.vue";
import executorCourseModifyView from "@/components/executor/CourseModifyView.vue";
import executorTeacherManageView from "@/components/executor/TeacherManageView.vue";
import executorTeacherAddView from "@/components/executor/TeacherAddView.vue";
import executorTeacherModifyView from "@/components/executor/TeacherModifyView.vue";
import executorSearchEvaluateView from "@/components/executor/SearchEvaluateView.vue";
import executorTeacherDetailView from "@/components/executor/TeacherDetailView.vue"

import managerCourseManageView from "@/components/manager/CourseManageView.vue";
import managerStudentManageView from "@/components/manager/StudentManageView.vue";
import managerStudentDetailView from "@/components/manager/StudentDetailView.vue";
import managerTeacherManageView from "@/components/manager/TeacherManageView.vue";
import managerTeacherDetailView from "@/components/manager/TeacherDeatilView.vue";
import managerExecutorManageView from "@/components/manager/ExecutorManageView.vue";
import managerCourseDetailView from "@/components/manager/CourseDetailView.vue";
import managerSearchBillView from "@/components/manager/SearchBillView.vue";
import managerSearchReportView from "@/components/manager/SearchReportView.vue";
import managerReportDetailView from "@/components/manager/ReportDetailView.vue";
import managerSearchApplicationView from "@/components/manager/SearchApplicationView.vue";
import managerApplicationDetailView from "@/components/manager/ApplicationDetailView.vue";

import companyBindIDView from '@/components/company/BindIDView.vue';
import companySearchCourseView from  '@/components/company/SearchTheCourseView.vue';
import companyCourseDetailView from '@/components/company/CourseDetailView.vue';
import companyPayView from '@/components/company/PayView.vue';
import companyPayDetailView from '@/components/company/PayDetailView.vue';
import companyPayStudentView from '@/components/company/PayStudentView.vue';
import companySearchGradeView from '@/components/company/SearchGradeView.vue';
import companyGradeDetailView from '@/components/company/GradeDetailView.vue';
import companyCourseApplicationView from '@/components/company/CourseApplicationView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/login',
            name: 'login',
            component: LoginView
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
                    name: 'studentCourseDetail',
                    component:CourseDetailView
                },
                {
                    path: '/student/courseEvaluateDetail',
                    name: 'studentCourseEvaluateDetail',
                    component:studentCourseEvaluateDetailView
                },
                {
                    path: '/student/pay',
                    name: 'studentPay',
                    component:studentPayView
                },
                {
                    path: '/student/payDetail',
                    name: 'studentPayDetail',
                    component:studentPayDetailView
                },
                
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
                    component:teacherSearchEvaluateView,
                },
                {
                    path: '/teacher/courseDetail',
                    name: 'teacherCourseDetail',
                    component:teacherCourseDetailView,
                },
                {
                    path: '/teacher/studentGradeDetail',
                    name: 'teacherStudentGradeDetail',
                    component:teacherStudentGradeDetailView,
                },
            ]
        },
        {
            path: '/manager',
            name: 'manager',
            component: ManagerView,
            children:[
                {
                    path: '/manager/teacherManage',
                    name: 'managerTeacherManage',
                    component:managerTeacherManageView,
                },
                {
                    path: '/manager/teacherDetail',
                    name: 'managerTeacherDetail',
                    component:managerTeacherDetailView,
                },
                {
                    path: '/manager/studentManage',
                    name: 'managerStudentManage',
                    component:managerStudentManageView,
                },
                {
                    path: '/manager/studentDetail',
                    name: 'managerStudentDetail',
                    component:managerStudentDetailView,
                },
                {
                    path: '/manager/courseManage',
                    name: 'managerCourseManage',
                    component:managerCourseManageView,
                },
                {
                    path: '/manager/executorManage',
                    name: 'managerExecutorManage',
                    component:managerExecutorManageView,
                },
                {
                    path:"/manager/change-password",
                    name: 'managerChangePassword',
                    component:ChangePasswordView,
                },
                {
                    path:"/manager/searchEvaluate",
                    name: 'managerSearhEvaluate',
                    component:executorSearchEvaluateView,
                },
                {
                    path:"/manager/courseDetail",
                    name: 'managerCourseDetail',
                    component:managerCourseDetailView,
                },
                {
                    path:"/manager/searchBill",
                    name: 'managerSearchBill',
                    component:managerSearchBillView,
                },
                {
                    path:"/manager/searchReport",
                    name: 'managerSearchReport',
                    component:managerSearchReportView,
                },
                {
                    path:"/manager/reportDetail",
                    name: 'managerReportDetail',
                    component:managerReportDetailView,
                },
                {
                    path:"/manager/searchApplication",
                    name: 'managerSearchApplication',
                    component:managerSearchApplicationView,
                },
                {
                    path:"/manager/applicationDetail",
                    name: 'managerApplicationDetail',
                    component:managerApplicationDetailView,
                },
            ]
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
        {
            path: '/executor',
            name: 'executor',
            component: ExecutorView,
            children:[
                {
                    path:"/executor/change-password",
                    name: 'executorChangePassword',
                    component:ChangePasswordView,
                },
                {
                    path:"/executor/studentManage",
                    name: 'executorStudentManage',
                    component:executorStudentManageView,
                },
                {
                    path:"/executor/studentModify",
                    name: 'executorStudentModify',
                    component:executorStudentModifyView,
                },
                {
                    path:"/executor/studentAdd",
                    name: 'executorStudentAdd',
                    component:executorStudentAddView,
                },
                {
                    path:"/executor/courseAdd",
                    name: 'executorCourseAdd',
                    component:executorCourseAddView,
                },
                {
                    path:"/executor/courseModify",
                    name: 'executorCourseModify',
                    component:executorCourseModifyView,
                },
                {
                    path:"/executor/courseManage",
                    name: 'executorCourseManage',
                    component:executorCourseManageView,
                },
                {
                    path:"/executor/teacherAdd",
                    name: 'executorTeacherAdd',
                    component:executorTeacherAddView,
                },
                {
                    path:"/executor/teacherModify",
                    name: 'executorTeacherModify',
                    component:executorTeacherModifyView,
                },
                {
                    path:"/executor/teacherManage",
                    name: 'executorTeacherManage',
                    component:executorTeacherManageView,
                },
                {
                    path:"/executor/searchEvaluate",
                    name: 'executorSearchEvaluate',
                    component:executorSearchEvaluateView,
                },
                {
                    path:"/executor/teacherDetail",
                    name: 'executorTeacherDetail',
                    component:executorTeacherDetailView,
                },

            ]
        },
        {
            path: '/company',
            name: 'company',
            component: CompanyView,
            children:[
                {
                    path:"/company/searchCourse",
                    name: 'companySearchCourse',
                    component:companySearchCourseView,
                },
                {
                    path:"/company/courseDetail",
                    name: 'companyCourseDetail',
                    component:companyCourseDetailView,
                },
                {
                    path:"/company/pay",
                    name: 'companyPay',
                    component:companyPayView,
                },
                {
                    path:"/company/payStudent",
                    name: 'companyPayStudent',
                    component:companyPayStudentView,
                },
                {
                    path:"/company/payDetail",
                    name: 'companyPayDetail',
                    component:companyPayDetailView,
                },
                {
                    path:"/company/searchGrade",
                    name: 'companySearchGrade',
                    component:companySearchGradeView,
                },
                {
                    path:"/company/gradeDetail",
                    name: 'companyGradeDetail',
                    component:companyGradeDetailView,
                },
                {
                    path:"/company/courseApplication",
                    name: 'companyCourseApplication',
                    component:companyCourseApplicationView,
                },

            ]
        },
        {
            path: "/company/bindid",
            name: 'companyBind',
            component:companyBindIDView,
        },
        {
            path:"/executor/bindid",
            name: 'executorBindID',
            component:executorBindIDView,
        },
        {
            path: '/teacher/bindid',
            name: 'teacherBindID',
            component:teacherBindIDView,
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
