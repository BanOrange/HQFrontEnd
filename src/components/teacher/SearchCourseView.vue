<script setup>
import {ref, reactive} from 'vue'
import axios from 'axios';
import qs from 'querystring';
import {ElMessage} from 'element-plus';
import {onMounted} from 'vue';
import { useRouter, useRoute } from 'vue-router';

let router = useRouter();
const tableData = ref([])
const searchForm = reactive({
  course_name: '',
  course_id: '',
})

onMounted(() => {
  getAllCourse();
})

//得到所有课程,复用了公共接口
function getAllCourse() {
  axios.get('http://localhost:8080/getAllCourse')
      .then((res) => {
        tableData.value = res.data;
      })
}

//模糊查询功能
function handleSearch() {
  let data = {
    course_id: searchForm.course_id,
    course_name: searchForm.course_name,
  }

  axios.post("http://localhost:8080/searchCourse", qs.stringify(data))
      .then((res) => {
          tableData.value = res.data;
      })
}

//查看老师所教授的课程
function searchSelected() {
  let username = sessionStorage.getItem("username");
  let data = {
    username: username
  }

  axios.post("http://localhost:8080/teacher/searchSelected", qs.stringify(data))
      .then((res) => {
        tableData.value = res.data;
      })
}


const getDetails = (index) => {
  router.push({
    path: '/teacher/courseDetail',
    query: {
      course_id: tableData.value[index].course_id
    }
  })
}
</script>

<template>
  <el-form :model="searchForm" label-width="auto" style="max-width: 300px">
    <h1>课程查询</h1><br><br>
    <el-form-item label="课程编号：">
      <el-input v-model="searchForm.course_name"/>
    </el-form-item>
    <el-form-item label="课程名称：">
      <el-input v-model="searchForm.course_id"/>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="handleSearch">查询</el-button>
    </el-form-item>
  </el-form>
  <br><br>

  <el-table :data="tableData" width="400px" max-height="200">
    <el-table-column fixed prop="course_id" label="课程编号" width="150"/>
    <el-table-column prop="course_name" label="课程名称" width="120"/>
    <el-table-column prop="course_teacher" label="讲师名称" width="120"/>
    <el-table-column prop="course_fee" label="课程费用(￥)" width="150"/>
    <el-table-column fixed="right" label="选择" width="200">
      <template #default="scope">
        <el-button type="primary" @click="getDetails(scope.$index)">详情</el-button>
      </template>
    </el-table-column>
  </el-table>
  <br><br>
  <el-button type="primary" @click="searchSelected">查询所教授的课程列表</el-button>
</template>

<style scoped>
</style>