<script setup>
import {ref, reactive} from 'vue'
import axios from 'axios';
import qs from 'querystring';
import {ElMessage} from 'element-plus';
import {onMounted} from 'vue';
import router from '@/router';


const tableData = [
  {
    id:"1",
    name:"1",
    teacher:"1",
    state:"1",
  },
]
const form = reactive({
  name: '',
  id: '',
})
let checkList = [];
const Select = (index) => {
  if (checkList.includes(index)) {
    checkList.splice(checkList.indexOf(index), 1);
  } else {
    checkList.push(index);
  }
  console.log(checkList);
}

onMounted(() => {
  getAllCourse();
})

//得到所有课程
function getAllCourse() {
  axios.get('http://localhost:8080/getAllCourse')
      .then((res) => {
        tableData.value = res.data;
      })
}

//查询功能
function handleSearch() {
  let data = {
    id: form.id,
    name: form.name,
  }

  axios.post("http://localhost:8080/searchCourse", qs.stringify(data))
      .then((res) => {
        tableData.value = res.data;
      })
}

//查看已选课程
function searchSelected() {
  let username = sessionStorage.getItem("username");
  let data = {
    username: username
  }

  axios.post("http://localhost:8080/student/searchSelected", qs.stringify(data))
      .then((res) => {
        tableData.value = res.data;
      })
}

//查看课程的详情
const getDetails = (index) => {
  router.push({
    name: 'stu_CourseDetail',
    query: {
      id:tableData.value[index].id,
    }
  })
}
</script>

<template>
  <el-form :model="form" label-width="auto" style="max-width: 300px">
    <h1>课程查询</h1><br><br>
    <el-form-item label="课程编号：">
      <el-input v-model="form.id"/>
    </el-form-item>
    <el-form-item label="课程名称：">
      <el-input v-model="form.name"/>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="handleSearch">查询</el-button>
    </el-form-item>
  </el-form>
  <br><br>
  <el-table :data="tableData" width="400px" max-height="200">
    <el-table-column fixed prop="id" label="课程编号" width="150"/>
    <el-table-column prop="name" label="课程名称" width="120"/>
    <el-table-column prop="teacher" label="讲师名称" width="120"/>
    <el-table-column prop="state" label="课程状态" width="120"/>
    <el-table-column prop="place" label="上课地点" width="120"/>
    <el-table-column prop="start" label="课程开始时间" width="120"/>
    <el-table-column prop="end" label="课程结束时间" width="120"/>
    <el-table-column prop="info" label="课程简介" width="120"/>
    <el-table-column fixed="right" label="选择" width="200">
      <template #default="scope">
        <el-button type="primary" @click="getDetails(scope.$index)">详情</el-button>
      </template>
    </el-table-column>
  </el-table>
  <br><br>
  <el-button type="primary" @click="searchSelected">查询已选课程列表</el-button>
</template>

<style scoped>
</style>