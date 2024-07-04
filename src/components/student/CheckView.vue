<template>
  <h1>学生课程签到</h1>
  <el-form :model="form">
    <el-form-item label="学生学号">
      <el-input v-model="form.stu_id"></el-input>
    </el-form-item>
    <el-form-item label="课程编号">
      <el-input v-model="form.course_id"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="check">签到</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>
import {ref, reactive} from 'vue'
import axios from 'axios';
import qs from 'querystring';
import {ElMessage} from 'element-plus';

const form = reactive({
  stu_id: '',
  course_id: '',
})

function check() {
  let data = {
    stu_id: form.stu_id,
    course_id: form.course_id,
  }
  axios.post("http://localhost:8080/student/check", qs.stringify(data))
      .then((res) => {
        if(res.data.code == 200){
          ElMessage("签到成功")
        }else{
          ElMessage.error(res.data.msg)
        }
      })
}

</script>

<style scoped>

</style>