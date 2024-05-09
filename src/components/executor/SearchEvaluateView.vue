<script setup>
import { ref, reactive } from 'vue'
import axios from 'axios';
import qs from 'querystring';
import { ElMessage } from 'element-plus';
import { onMounted } from 'vue';
import router from '@/router';

//课程的评分
const tableData = ref([])

//用来装搜索条件
const searchForm = reactive({
    name: '',
    id: '',
})

//向后端发送得到所有课程评分的请求，返回对应数据，具体参考下面的el-table
function getCourseScore() {
    axios.get("http://localhost:8080/executor/getCourseScore")
        .then((res) => {
            tableData.value = res.data;
        })
}

//向后端发送查询课程评分的请求，返回数据要求同上
function handleSearch() {
    let data = {
        cid: searchForm.id,
        name: searchForm.name,
    }
        axios.get('http://localhost:8080/executor/findCourseScore', qs.stringify(data))
            .then((res) => {
                tableData.value = res.data;
            })

}

</script>

<template>
    <el-form :model="searchForm" label-width="auto" style="max-width: 300px">
        <h1>课程评分查询</h1><br><br>
        <el-form-item label="课程编号：">
            <el-input v-model="searchForm.id" />
        </el-form-item>
        <el-form-item label="课程名称：">
            <el-input v-model="searchForm.name" />
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="handleSearch">查询</el-button>
        </el-form-item>
    </el-form>
    <br><br>
    <h1>课程评价分数</h1>
    <el-table :data="tableData" width="400px" max-height="200">
        <el-table-column fixed prop="id" label="课程编号" width="150" />
        <el-table-column prop="name" label="课程名称" width="120" />
        <el-table-column prop="teacher" label="讲师名称" width="120" />
        <el-table-column prop="teacherid" label="讲师编号" width="120" />
        <el-table-column prop="state" label="评价状态" width="120" />
        <el-table-column prop="score" label="评价分数" width="150" />
    </el-table>
</template>

<style scoped></style>