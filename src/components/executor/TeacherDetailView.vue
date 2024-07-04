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
    let teacherid = ref('')
    let teacher_name = ref('')
    let teacher_position = ref('')

    //该表单存储讲师的详细信息
    let teacher_field = ref('')
    let teacher_tele = ref('')
    let teacher_email = ref('')

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
            teacherid.value = res.data[0].teacher_id;
            teacher_name.value = res.data[0].teacher_name;
            teacher_position.value = res.data[0].teacher_position;
            teacher_field.value = res.data[0].teacher_field;
            teacher_tele.value = res.data[0].teacher_tele;
            teacher_email.value = res.data[0].teacher_email;
        })
}

//根据传过去的讲师信息得到其负责的课程信息
function getTeacherCourse() {
    let data = {
        teacher_id: teacher_id,
    }
    axios.post("http://localhost:8080/executor/getTeacherCourse", qs.stringify(data))
        .then((res) => {
            CourseData.value = res.data;
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
    getTeacher();
    getTeacherCourse();
})
</script>

<template>
    <h2>讲师基本信息</h2>
    <el-text>讲师编号：</el-text>
    <el-input disabled v-model="teacherid" style="width:200px"/><br>
    <el-text>讲师名称：</el-text>
    <el-input disabled v-model="teacher_name" style="width:200px"/><br>
    <el-text>讲师职称：</el-text>
    <el-input disabled v-model="teacher_position" style="width:200px"/><br>

    <h2>讲师详细信息</h2>
    <el-text>擅长领域：</el-text>
    <el-input disabled v-model="teacher_field" style="width:200px"/><br>
    <el-text>电话号码：</el-text>
    <el-input disabled v-model="teacher_tele" style="width:200px"/><br>
    <el-text>电子邮箱：</el-text>
    <el-input disabled v-model="teacher_email" style="width:200px"/><br>

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