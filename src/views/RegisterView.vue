<script setup>
import {ref,onMounted} from 'vue';
import {useRouter,useRoute} from "vue-router";

import axios from 'axios'
import qs from 'qs'
import {ElMessage} from 'element-plus'

let router = useRouter();
let username = ref("");
let password = ref("");
let company_key = ref('');
const userType = ref('');

const options = [
  {
    label: '学员',
    value: 'student',
  },
  {
    value: 'company',
    label: '软件公司',
  },
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
]

function handleBack() {
  router.replace("/login")
}



function handleRegister() {        //向后端发送注册的数据，根据后端的不同返回code来判断情况,如果是执行人/讲师/软件公司需要绑定身份继续注册
  if (userType.value != 'staff' && userType.value != 'student' && userType.value != 'manager') {
    console.log(userType.value);
    router.push({
      path: userType.value === 'teacher' ? '/teacher/bindid' : userType.value === 'company' ? '/company/bindid' : '/executor/bindid',
      query: {
        username: username.value,
        password: password.value,
        company_key: company_key.value,
        userType: userType.value,
      }
    })
  }

  console.log('http://localhost:8080/register/'+userType.value);
  let data = {
    username: username.value,
    password: password.value,
    usertype: userType.value,
    company_key: company_key.value,
  }

  if(userType.value == "staff" || userType.value == "student" || userType.value == "manager")
  axios.post('http://localhost:8080/register/'+userType.value, qs.stringify(data))
    .then((res) => {
      if (res.data.code === 200) {
        ElMessage("注册成功");
        console.log(res.data.msg);
        router.replace("\login");
      } else {
        ElMessage.error(res.data.msg);
      }
    })
}

</script>

<template>

  <h1>欢迎注册浩奇培训管理系统</h1>
  <div id="selector">
    <label>请选择用户类型</label><br>
    <el-select v-model="userType" placeholder="请选择身份" size="large" style="width: 240px">
      <el-option v-for="item in options" :label="item.label" :value="item.value" />
    </el-select>
  </div>
  <br>
  <el-input v-model="username" style="width: 240px" placeholder="请输入用户名" /><br><br>
  <el-input v-model="password" type="password" show-password style="width: 240px" placeholder="请输入密码" /><br><br>
  <el-input v-model="company_key" type="password" show-password style="width: 240px" placeholder="请输入公司密钥"
    id="companyKey" /><br>
  <el-text>注：如果您不是培训人员则无需填写</el-text>
  <br><br>
  <el-button type="primary" size="large" @click="handleRegister">注册</el-button>
  <el-button type="primary" size="large" @click="handleBack">返回</el-button>

</template>

<style scoped></style>