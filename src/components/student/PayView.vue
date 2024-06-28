<script setup>
import { ref, reactive } from 'vue'
import axios from 'axios';
import qs from 'querystring';
import { ElMessage } from 'element-plus';
import { onMounted } from 'vue';
import router from '@/router';

//用来装课程的信息
const tableData = ref([])

//用来装搜索条件
const searchForm = reactive({
    course_name: '',
    course_id: '',
})

onMounted(() => {
    getAllCoursePayment();
})

//学员得到所有需要付费的课程
//需要返回课程编号，课程名称和课程缴费状态（signup_state）
function getAllCoursePayment() {
    let username = sessionStorage.getItem("username");
    let data = {
        username: username,
    }
    console.log(username)
    axios.post("http://localhost:8080/student/getAllPayment", qs.stringify(data))
        .then((res) => {
            tableData.value = res.data;
            for(var i=0;i<tableData.value.length;i++){
                if(tableData.value[i].signup_state == 1){
                    tableData.value[i].signup_state = "已缴费";
                }else{
                    tableData.value[i].signup_state = "未缴费";
                }
            }
        })
}

//课程付费情况模糊查询功能
function handleSearch() {
    let username = sessionStorage.getItem("username");
    let data = {
        username:username,
        course_id: searchForm.course_id,
        course_name: searchForm.course_name,
    }
    axios.post("http://localhost:8080/student/searchPayment", qs.stringify(data))
        .then((res) => {
            tableData.value = res.data;
            for(var i=0;i<tableData.value.length;i++){
                if(tableData.value[i].signup_state == 1){
                    tableData.value[i].signup_state = "已缴费";
                }else{
                    tableData.value[i].signup_state = "未缴费";
                }
            }
        })
}

//跳转到缴费的二维码页面
const pay = (index) => {
    router.push({
        name: 'studentPayDetail',
        query: {
            course_id: tableData.value[index].course_id,
            course_name: tableData.value[index].course_name,
        }
    })
}

//查看课程的详情
const getDetails = (index) => {
    router.push({
        name: 'studentCourseDetail',
        query: {
            course_id: tableData.value[index].course_id,
        }
    })
}
</script>

<template>
    <el-form :model="searchForm" label-width="auto" style="max-width: 300px">
        <h1>课程查询</h1><br><br>
        <el-form-item label="课程编号：">
            <el-input v-model="searchForm.course_id" />
        </el-form-item>
        <el-form-item label="课程名称：">
            <el-input v-model="searchForm.course_name" />
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="handleSearch">查询</el-button>
        </el-form-item>
    </el-form>
    <br><br>
    <h1>课程信息总览</h1>
    <el-table :data="tableData" style="width: 100%">
        <el-table-column fixed prop="course_id" label="课程编号" width="150" />
        <el-table-column prop="course_name" label="课程名称" width="120" />
        <el-table-column prop="signup_state" label="是否已缴费" width="150" />
        <el-table-column fixed="right" label="操作" width="120">
            <template #default="scope">
                <el-button link type="primary" size="large" @click="pay(scope.$index)">去缴费</el-button>
            </template>
        </el-table-column>
    </el-table>
</template>

<style scoped></style>