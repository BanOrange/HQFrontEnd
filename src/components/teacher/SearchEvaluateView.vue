<script setup>
import {ref, reactive} from 'vue'
import axios from 'axios';
import qs from 'querystring';
import {ElMessage} from 'element-plus';
import {onMounted} from 'vue';
import router from '@/router';

//课程的评分
const tableData = ref([])

function getCourseScore(){
  let username = sessionStorage.getItem("username");
  let data = {
    username: username
  }

  axios.post("http://localhost:8080/teacher/getCourseScore", qs.stringify(data))
      .then((res) => {
        if (res.data.code == 200) {
          ElMessage("查询成功")
          tableData.value = res.data;

        } else {
          ElMessage.error(res.data.msg)
        }
      })
}
</script>

<template>
<h1>课程评价分数</h1>
<el-table :data="tableData" width="400px" max-height="200">
    <el-table-column fixed prop="id" label="课程编号" width="150"/>
    <el-table-column prop="name" label="课程名称" width="120"/>
    <el-table-column prop="state" label="评价状态" width="120"/>
    <el-table-column prop="score" label="评价分数" width="150"/>
  </el-table>
</template>

<style scoped>

</style>