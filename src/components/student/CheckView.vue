<script setup>
import {ref, reactive} from 'vue'
import axios from 'axios';
import qs from 'querystring';
import {ElMessage} from 'element-plus';

const form = reactive({
  username: '',
  course_id: '',
})
const checkedCourses = ref([])

function getAllCheck() {
  let data = {
    username: form.username,
  }
  axios.post("http://localhost:8080/student/getAllCheck", qs.stringify(data))
      .then((res) => {
        checkedCourses.value = res.data;
      })
}

function addCheck() {
  let data = {
    username: form.username,
    course_id: form.course_id,
  }
  axios.post("http://localhost:8080/student/addCheck", qs.stringify(data))
      .then((res) => {
        if (res.data.code == 200) {
          ElMessage("签到成功")
        } else {
          ElMessage.error(res.data.msg)
        }
      })
}
</script>

<style scoped>
</style>

<template>
  <h1>学生课程签到</h1>
  <el-form :model="form">
    <el-form-item label="学生用户名">
      <el-input v-model="form.username" style="width:200px"></el-input>
    </el-form-item>
    <el-form-item label="课程编号">
      <el-input v-model="form.course_id" style="width:200px"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="addCheck">签到</el-button>
      <el-button type="primary" @click="getAllCheck">查询已签到课程</el-button>
    </el-form-item>
  </el-form>
  <el-table :data="checkedCourses" width="400px" max-height="200">
    <el-table-column fixed prop="name" label="课程名称" width="150"/>
  </el-table>
</template>