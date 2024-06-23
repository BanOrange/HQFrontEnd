<script setup>
import {reactive} from 'vue'
import {ElMessage, ElMessageBox} from 'element-plus';
import {useRouter, useRoute} from 'vue-router';
import {onMounted} from 'vue';
import axios from 'axios'
import qs from 'querystring';

let router = useRouter();
let route = useRoute();
let username = route.query.username;
let password = route.query.password;
let company_key = route.query.company_key;

const Exeform = reactive({
  exe_id: '',
  exe_name: '',
})

function back() {
  router.replace("/login")
}


//向后端返回绑定身份并注册的请求，希望返回是否注册成功
function register() {
  let data = {
    username: username,
    password: password,
    usertype:"executor",
    exe_id: Exeform.exe_id,
    exe_name: Exeform.exe_name,
    company_key: company_key,
  }

  axios.post("http://localhost:8080/register/executor", qs.stringify(data))
      .then((res) => {
        if (res.data.code === 200) {
          ElMessage("注册成功！")
          router.replace("/login")
        } else {
          ElMessage.error(res.data.msg);
        }
      })
}
</script>

<template>
  <h2>绑定执行人信息</h2>
  <el-text>请务必保证信息与预留在公司的信息相同</el-text>
  <br><br>
  <el-form :model="Exeform" label-width="auto" style="max-width: 200px">
    <el-form-item>
      <el-input v-model="Exeform.exe_name" placeholder="请输入员工姓名"/>
    </el-form-item>
    <el-form-item>
      <el-input v-model="Exeform.exe_id" placeholder="请输入员工工号"/>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="back">返回登录</el-button>
      <el-button type="primary" @click="register">确认绑定</el-button>
    </el-form-item>
  </el-form>
</template>

<style scoped></style>