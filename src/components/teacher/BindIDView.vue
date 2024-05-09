<script setup>
import {reactive} from 'vue'
import {ElMessage, ElMessageBox} from 'element-plus';
import {useRouter, useRoute} from 'vue-router';
import {onMounted} from 'vue';
import axios from 'axios'
import qs from 'querystring';

let router = useRouter();
const form = reactive({
  name: '',
  id: '',
})

function back() {
  router.replace("/teacher")
}

function onSubmit() {
  let username = sessionStorage.getItem("username");
  let data = {
    username: username,
    name:form.name,
    id:form.id,
  }

  axios.post("http://localhost:8080/teacher/bindid", qs.stringify(data))
      .then((res) => {
        if (res.data.code === 200) {
          ElMessage("绑定成功！")
          router.replace("/teacher")
        } else {
          ElMessage.error(res.data.msg);
        }
      })
}
</script>

<template>
  <h2>个人信息</h2>
  <el-text>一个账号只能绑定一位讲师且不能取消绑定请谨慎</el-text>
  <br><br>
  <el-form :model="form" label-width="auto" style="max-width: 300px">
    <el-form-item label="姓名：">
      <el-input v-model="form.name"/>
    </el-form-item>
    <el-form-item label="编号：">
      <el-input v-model="form.id"/>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="back">返回</el-button>
      <el-button type="primary" @click="onSubmit">绑定</el-button>
    </el-form-item>
  </el-form>
</template>

<style scoped></style>