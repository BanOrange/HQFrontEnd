<script setup>
import { reactive, ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus';
import { useRouter, useRoute } from 'vue-router';
import { onMounted } from 'vue';
import axios from 'axios'
import qs from 'querystring';

let router = useRouter();
let route = useRoute();

let teacher_id = route.query.teacher_id;

//用来装课程的信息
const CourseData = ref([])

//讲师的基本信息
    teacherid = ref(''),
    teacher_name = ref(''),
    teacher_position = ref(''),

    //该表单存储讲师的详细信息
    teacher_field = ref(''),
    teacher_tele = ref(''),
    teacher_email = ref(''),

    function back() {
        router.replace("/executor/TeacherManage")
    }

//根据传过来的讲师编号信息得到讲师信息
function getTeacher() {
    let data = {
        teacher_id: teacher_id,
    }

    axios.post("http://localhost:8080/executor/getTeacher", qs.stringify(data))
        .then((res) => {
            teacherid = teacher_id;
            teacher_name = res.data.teacher_name;
            teacher_position = res.data.teacher_position;
            teacher_field = res.data.teacher_field;
            teacher_tele = res.data.teacher_tele;
            teacher_email = res.data.teacher_email;
        })
}

//根据传过去的讲师信息得到其负责的课程信息
function getTeacherCourse() {
    let data = {
        teacher_id: teacher_id,
    }
    axios.post("http://localhost:8080/executor/getTeacherCourse", qs.stringify(data))
        .then((res) => {
            if (code == 200) {
                CourseData.value = res.data;
                ElMessage("查询成功")
            } else {
                ElMessage.error(res.data.msg)
            }
        })
}

//查看讲师负责的课程具体信息
function handleDetail() {
    let course_id = CourseData.value[index].course_id;
    router.push({
        path: '/executor/courseDetail',
        query: {
            course_id: course_id,
        }
    })
}

//挂载,但是为了方便开发，先注释掉
onMounted(() => {
    // getTeacher();
    // getTeacherCourse();
})
</script>

<template>
    <h2>讲师基本信息</h2>
    <br>
    <el-label>讲师编号：</el-label>
    <el-input label="讲师编号" disabled v-model="teacherid" />
    <el-label>讲师名称：</el-label>
    <el-input label="讲师名称" disabled v-model="teacher_name" />
    <el-label>讲师职称：</el-label>
    <el-input label="讲师职称" disabled v-model="teacher_position" />

    <h2>讲师详细信息</h2>
    <br>
    <el-label>擅长领域：</el-label>
    <el-input disabled v-model="teacher_field" />
    <el-label>讲师电话：</el-label>
    <el-input disabled v-model="teacher_tele" />
    <el-label>电子邮箱：</el-label>
    <el-input disabled v-model="teacher_email" />

    <h1>该讲师负责的课程</h1>
    <el-table :data="CourseData" style="width: 100%">
        <el-table-column fixed prop="course_id" label="课程编号" width="150" />
        <el-table-column prop="course_name" label="课程名称" width="120" />
        <el-table-column prop="course_teacher_id" label="讲师名称" width="120" />
        <el-table-column prop="course_fee" label="课程费用(￥)" width="150" />
        <el-table-column fixed="right" label="操作" width="120">
            <template #default="scope">
                <el-button link type="primary" size="large" @click="handleDetail(scope.$index)">详情</el-button>
            </template>
        </el-table-column>
    </el-table>

    <el-button type="primary" @click="back">返回</el-button>
</template>

<style scoped></style>