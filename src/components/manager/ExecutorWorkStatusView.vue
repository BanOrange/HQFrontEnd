<script setup>
import {ref, reactive} from 'vue'
import axios from 'axios';
import qs from 'querystring';
import {ElMessage} from 'element-plus';
import {onMounted} from 'vue';
import router from "@/router/index.js";

//let router = useRouter();
//用来装执行人的信息

//用来装搜索条件
const searchForm = reactive({
  exe_name: '',
  exe_id: '',
  username: '',
  course_id: '',
  course_name: '',
  course_state: '',
})

const tableData = ref([])

onMounted(() =>{
  findAllExecutor()
})
//找到所有的执行人信息
function findAllExecutor(){
  let username = sessionStorage.getItem("username")
  let data = qs.stringify({
    username: username,
  });
  console.log(username);
  axios.post('http://localhost:8080/manager/findAllExecutor', data) //get改成post
      .then((res)=>{
        console.log(res.data);
        tableData.value = res.data;
      })
      .catch((error)=>{
        console.error(error);
      })
}

function handleSearch() {
  let data = {
    executorID: searchForm.exe_id,
    executorName: searchForm.exe_name,
  }

  axios.post("http://localhost:8080/manager/searchExecutor", qs.stringify(data))
      .then((res) => {
        tableData.value = res.data;
      })
}


</script>

<style scoped>
</style>



<template>
  <h2>执行人查询</h2><br>
  <el-form :model="searchForm" label-width="auto" style="max-width: 300px">
    <el-form-item label="执行人ID：">
      <el-input v-model="searchForm.exe_id" style="width:200px"></el-input>
    </el-form-item>
    <el-form-item label="执行人姓名：">
      <el-input v-model="searchForm.exe_name" style="width:200px"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="handleSearch">查询</el-button>
    </el-form-item>
  </el-form>
  <br><br>
    <h1>执行人工作状态</h1>
  <br>
  <el-table :data="tableData" style="width: 100%">
        <el-table-column fixed prop="exe_id" label="工号" width="120" />
        <el-table-column prop="exe_name" label="姓名" width="120" />
        <el-table-column prop="username" label="用户名" width="120" />
      <el-table-column prop="course_id" label="课程ID" width="120" />
        <el-table-column prop="course_name" label="课程名称" width="120" />
      <el-table-column prop="course_state" label="课程状态" width="120" />
    </el-table>
</template>