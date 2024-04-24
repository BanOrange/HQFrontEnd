<script setup>
import {ref} from 'vue';
import {useRouter,useRoute} from "vue-router";

import axios from 'axios'
import qs from 'qs'
import {ElMessage} from 'element-plus'

const route = useRoute();
const router = useRouter();
let username = ref("");
let password = ref("");
let userType = ref("");
let remember = ref("");

function handleRegister(){
  router.replace("/register")
}

function handleLogin() {

  sessionStorage.setItem("username", username.value)     //为了防止路由屏蔽所以在这里建立会话，最终做完的时候要删除！！


  let data = {
    username: username.value,
    password: password.value,
    userType: userType.value
  }
  console.log(data);
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

  function handleForget(){
    router.replace("/findpassword");
  }

const options = [
  {
    label: '学员/软件公司',
    options: [
      {
        label: '学员',
        value: 'student',
      },
      {
        value: 'company',
        label: '软件公司',
      },
    ],
  },
  {
    label: '培训人员',
    options: [
      {
        label: '总经理',
        value: 'manager',
      },
      {
        label: '讲师',
        value: 'teacher',
      },
      {
        label: '执行人',
        value: 'executor',
      },
      {
        label: '现场工作人员',
        value: 'staff',
      },
    ],
  },
]
</script>

<template>
  <div id="login">
    <h1>欢迎使用浩奇培训管理系统!</h1><br>
    <el-input v-model="username" style="width: 240px" placeholder="请输入用户名"/>
    <br><br>
    <el-input v-model="password" type="password" style="width: 240px" placeholder="请输入密码"/>
    <br><br>
    <div id="selector">
      <el-label>请选择用户类型</el-label><br>
      <el-select v-model="userType" placeholder="请选择身份" style="width: 240px">
        <el-option-group
          v-for="group in options"
          :key="group.label"
          :label="group.label"
        >
        <el-option
          v-for="item in group.options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
        </el-option-group>
      </el-select>
    </div>
    <br>
    <el-checkbox v-model="remember" label="Remember Me" size="large" id="remember" value="yes"/><br>
    <el-button type="primary" size="large" @click="handleRegister">去注册</el-button>
    <el-button type="primary" size="large" @click="handleLogin">登录</el-button>
    <br>
    <el-link type="primary" @click="handleForget">忘记密码？</el-link>
  </div>
</template>

<style>
#slogan1{
  text-align:left
}
</style>