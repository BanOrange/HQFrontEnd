<script setup>
import {ref, reactive} from 'vue'
import axios from 'axios';
import qs from 'querystring';
import {ElMessage} from 'element-plus';
import {onMounted} from 'vue';
import router from '@/router';

const tableData = ref([])


const searchForm = reactive({
  course_name: '',
  course_id: '',
})

onMounted(() => {
  getAllCourse();
})

//得到所有课程，复用了公共接口
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

//查看课程的详情
const getDetails = (index) => {
  router.push({
    name: 'managerCourseDetail',
    query: {
      course_id:tableData.value[index].course_id,
    }
  })
}
</script>

<template>
  <el-form :model="searchForm" label-width="auto" style="max-width: 300px">
    <h1>课程查询</h1><br><br>
    <el-form-item label="课程编号：">
      <el-input v-model="searchForm.course_id"/>
    </el-form-item>
    <el-form-item label="课程名称：">
      <el-input v-model="searchForm.course_name"/>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="handleSearch">查询</el-button>
    </el-form-item>
  </el-form>
  <br><br>
  <h1>课程信息总览</h1>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column fixed prop="course_id" label="课程编号" width="150"/>
    <el-table-column prop="course_name" label="课程名称" width="120"/>
    <el-table-column prop="teacher_name" label="讲师名称" width="120"/>
    <el-table-column prop="course_fee" label="课程费用(￥)" width="150"/>
    <el-table-column fixed="right" label="操作" width="120">
      <template #default="scope">
        <el-button link type="primary" size="large" @click="getDetails(scope.$index)">详情</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<style scoped>
</style>