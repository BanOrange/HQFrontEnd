<script setup>
import {ref} from 'vue';
import {useRouter} from "vue-router";
import HomeView from '../views/HomeView.vue'
import LoginView from "../views/LoginView.vue";

import axios from 'axios'
import qs from 'qs'
import {ElMessage} from 'element-plus'

let username = ref("");
let password = ref("");
let userType = ref("student");
const router = useRouter();

function handleClick() {
  let data = {
    username: username.value,
    password: password.value,
    userType: userType.value
  }
  axios.post('http://localhost:8888/login', qs.stringify(data))
      .then((res) => {
        if (res.data.code === 200) {
          sessionStorage.setItem("username", username.value)
          router.replace(userType.value === 'student' ? '/student' : userType.value === 'teacher' ? '/teacher' : '/admin')
          console.log(res.data.msg)
        } else {
          ElMessage.error(res.data.msg)
        }
      })
}

</script>

<template>
  <div>
    <el-input v-model="username" style="width: 240px" placeholder="请输入用户名"/>
    <br><br>
    <el-input v-model="password" type="password" style="width: 240px" placeholder="请输入密码"/>
    <br><br>
    <el-text>请选择用户类型</el-text><br>
    <el-select v-model="userType" style="width: 240px" placeholder="请选择用户类型">
      <el-option label="学生" value="student"></el-option>
      <el-option label="教师" value="teacher"></el-option>
      <el-option label="管理员" value="admin"></el-option>
    </el-select>
    <br>
    <el-button type="primary" @click="handleClick">登录</el-button>
  </div>
</template>