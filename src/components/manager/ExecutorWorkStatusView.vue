<script setup>
import {ref, reactive} from 'vue'
import axios from 'axios';
import qs from 'querystring';
import {ElMessage} from 'element-plus';
import {onMounted} from 'vue';
import router from "@/router/index.js";
import { useRoute } from 'vue-router';

const searchForm = reactive({
  exe_id: '',
})

const tableData = ref([])

const route = useRoute();

// 新增的函数，用于获取执行人负责的课程信息
function getExecutorCourses() {
  let exe_id = route.query.exe_id;
 // let exe_id = sessionStorage.getItem("exe_id")
  let data = qs.stringify({
    exe_id: exe_id,
  });
  //console.log(exe_id); //成功
  axios.post("http://localhost:8080/manager/getCourses", data)
      .then((res) => {
        console.log(res.data);
        tableData.value = res.data;
      })
      .catch((error) => {
        console.error(error);
      });
  }


onMounted(() => {
  getExecutorCourses()
})

</script>

<template>
  <h2>执行人查询</h2><br>
  <el-form :model="searchForm" label-width="auto" style="max-width: 300px">
    <el-form-item label="执行人ID：">
      <el-input v-model="searchForm.exe_id" style="width:200px"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="getExecutorCourses">查询</el-button>
    </el-form-item>
  </el-form>
  <br><br>
  <h1>执行人工作状态</h1>
  <br>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column fixed prop="course_id" label="课程ID" width="120"/>
    <el-table-column prop="course_name" label="课程名称" width="120"/>
    <el-table-column prop="course_state" label="课程状态" width="120"/>
  </el-table>
</template>

<style scoped>
</style>