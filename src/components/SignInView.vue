//签到界面
<script setup>
import {reactive} from 'vue'
import {ElMessage, ElMessageBox} from 'element-plus';
import {useRouter, useRoute} from 'vue-router';
import {onMounted} from 'vue';
import axios from 'axios'
import qs from 'querystring';

let router = useRouter();
const form = reactive({
  date: '',
  location: '',
})

function back() {
  router.replace("/student")
}

function onSubmit() {
  let data = {
    date: form.date,
    location: form.location,
  }

  axios.post("http://localhost:8080/student/sign-in", qs.stringify(data))
      .then((res) => {
        if (res.data.code === 200) {
          ElMessage("签到成功！")
          router.replace("/student")
        } else {
          ElMessage.error(res.data.msg);
        }
      })
}
</script>

<template>
  <div>
    <h2>现场签到</h2>
    <el-form :model="form" label-width="120px">
      <el-form-item label="签到时间：">
        <el-date-picker v-model="form.date" type="datetime" placeholder="选择日期时间"></el-date-picker>
      </el-form-item>
      <el-form-item label="签到地点：">
        <el-input v-model="form.location" placeholder="请输入签到地点"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
        <el-button @click="back">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped>

</style>