<script setup>
import {ref, reactive} from 'vue'
import axios from 'axios';
import qs from 'querystring';
import {ElMessage} from 'element-plus';
import {onMounted} from 'vue';
import router from '@/router';

const tableData = ref([])
const form = reactive({
  CourseName: '',
  CourseID: '',
})
onMounted(() => {
  getAllGrade();
})

function getAllGrade() {
  let data = {
    CourseID: form.CourseID,
    CourseName: form.CourseName,
  }
  axios.post("http://localhost:8080/student/getAllGrade", qs.stringify(data))
      .then((res) => {
        if (res.data.code === 200) {
          ElMessage("查询成功")
          tableData.value = res.data;

        } else {
          ElMessage.error(res.data.msg)
        }
      })
}

</script>

<template>
  <h1>学生成绩查询</h1>
  <el-table :data="tableData" width="400px" max-height="200">
    <el-table-column fixed prop="CourseName" label="课程名称" width="150"/>
    <el-table-column prop="CourseID" label="课程编号" width="120"/>
    <el-table-column prop="TeacherName" label="教师" width="120"/>
    <el-table-column prop="Grade" label="成绩" width="120"/>
    <el-table-column prop="Credit" label="学分" width="120"/>
  </el-table>
</template>

<style scoped>

</style>