<script setup>
import { ref, reactive } from 'vue'
import axios from 'axios';
import qs from 'querystring';
import { ElMessage } from 'element-plus';
import { onMounted } from 'vue';
import router from '@/router';

const tableData = ref([])


onMounted(() => {
  getAllGrade();
})

//向后端传送username，然后得到对应学生的成绩相关信息
function getAllGrade() {
  let username = sessionStorage.getItem("username");
  let data = {
    username: username,
  }
  console.log(data)
  axios.post("http://localhost:8080/student/getAllGrade", qs.stringify(data))
    .then((res) => {
      console.log(res.data)
      tableData.value = res.data;
    })
}

</script>

<template>
  <h1>学生成绩</h1>
  <el-table :data="tableData" width="400px" max-height="200">
    <el-table-column fixed prop="course_name" label="课程名称" width="150" />
    <el-table-column prop="course_id" label="课程编号" width="120" />
    <el-table-column prop="stu_score" label="成绩" width="120" />
    <el-table-column prop="teacher_evaluate" label="老师评价" width="200" />
  </el-table>
</template>

<style scoped></style>