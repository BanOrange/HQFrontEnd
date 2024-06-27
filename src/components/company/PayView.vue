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

//软件公司得到所有需要付费的课程，这些课程是被所属员工选择的课程
//需要返回一组课程编号，课程名称和课程缴费状态（signup_state）构成的列表
//这里的课程缴费状态是指是否为全部员工缴费，也即后端需要遍历一下该公司选了对应课的员工是否全部缴费
function getAllCoursePayment() {
    let username = sessionStorage.getItem("username");
    let data = {
        username: username,
    }
    console.log(username)
    axios.post("http://localhost:8080/company/getAllPayment", qs.stringify(data))
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
    axios.post("http://localhost:8080/company/searchPayment", qs.stringify(data))
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

//跳转到选择学员的页面
const pay = (index) => {
    router.push({
        name: 'companyPayStudent',
        query: {
            course_id: tableData.value[index].course_id,
            course_name: tableData.value[index].course_name,
        }
    })
}

//查看课程的详情
const getDetails = (index) => {
    console.log(course_name)
    router.push({
        name: 'companyCourseDetail',
        query: {
            course_id: tableData.value[index].id,
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
        <el-table-column prop="signup_state" label="是否已为员工缴费" width="150" />
        <el-table-column fixed="right" label="操作" width="120">
            <template #default="scope">
                <el-button  type="primary" size="large" @click="pay(scope.$index)">去缴费</el-button>
            </template>
        </el-table-column>
    </el-table>
</template>

<style scoped></style>