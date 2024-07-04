<script setup>
import {ref, reactive} from 'vue'
import axios from 'axios';
import qs from 'querystring';
import { ElMessage, ElMessageBox } from 'element-plus'
import {onMounted} from 'vue';

const searchForm = reactive({
  course_name: '',
  course_id: '',
})

//查询课程对应反馈功能，将符合搜索条件的课程反馈列出来
function handleSearch() {
  let username = sessionStorage.getItem("username");
  let data = {
    username: username,
    course_id: searchForm.course_id,
    course_name: searchForm.course_name,
  }

  axios.post("http://localhost:8080/teacher/searchCourseEvaluate", qs.stringify(data))
      .then((res) => {
        tableData.value = res.data;
      })
}

onMounted(() =>{
  getCourseEvaluate();
})

//课程的评分和评价意见
const tableData = ref([])

function getCourseEvaluate(){
  let username = sessionStorage.getItem("username");
  let data = {
    username: username
  }

  axios.post("http://localhost:8080/teacher/getCourseEvaluate", qs.stringify(data))
      .then((res) => {
          tableData.value = res.data;
      })
}


</script>

<template>
<el-form :model="searchForm" label-width="auto" style="max-width: 300px">
    <h2>课程评价查询</h2><br>
    <el-form-item label="课程编号：">
      <el-input v-model="searchForm.course_id"/>
    </el-form-item>
    <el-form-item label="课程名称：">
      <el-input v-model="searchForm.course_name"/>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="evaluate">查询</el-button>
    </el-form-item>
  </el-form>
  
<h1>课程评价</h1>
<el-table :data="tableData" width="400px" max-height="200">
    <el-table-column fixed prop="course_id" label="课程编号" width="150"/>
    <el-table-column prop="course_name" label="课程名称" width="120"/>
    <el-table-column prop="eva_score" label="评价分数" width="150"/>
    <el-table-column prop="eva_content" label="评价意见" width="400"/>
  </el-table>
</template>

<style scoped>

</style>