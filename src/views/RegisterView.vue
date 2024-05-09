<script setup>
import { useRouter} from 'vue-router';
import {ref} from 'vue';
import axios from 'axios'
import qs from 'querystring';

let router = useRouter();
let username = ref("");
let password = ref("");
let companyKey = ref('');
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

function handleBack(){
  router.replace("/login")
}

function handleRegister(){        //向后端发送注册的数据，根据后端的不同返回code来判断情况
  let data = {
    username: username.value,
    password: password.value,
    userType: userType.value,
    companyKey:companyKey.value,
  }
  console.log(data);
  axios.post('http://localhost:8080/register', qs.stringify(data))
      .then((res) => {
        if (res.data.code === 200) {
          ElMessage("注册成功");
          console.log(res.data.msg)
        } else if (res.data.code === 400) {
          ElMessage.error("用户名重复");
        } else if (res.data.code === 401) {
          ElMessage.error("公司密钥错误");
        } else {
          ElMessage.error("注册失败");
        }
        //TODO 根据code提示用户 用户名重复，公司密钥错误等
      })
}

</script>

<template>

<h1>欢迎注册浩奇培训管理系统</h1>
<div id="selector">
      <el-label>请选择用户类型</el-label><br>
      <el-select v-model="userType" placeholder="请选择身份" size="large" style="width: 240px">
      <el-option
        v-for="item in options"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
</div>
<br>
<el-input v-model="username" style="width: 240px" placeholder="请输入用户名" /><br><br>
<el-input v-model="password" type="password" show-password style="width: 240px" placeholder="请输入密码" /><br><br>
<el-input v-model="companyKey" type="password" show-password style="width: 240px" placeholder="请输入公司密钥" id="companyKey" /><br>
<el-text>注：如果您不是培训人员则无需填写</el-text>
<br><br>
<el-button type="primary" size="large" @click="handleRegister">注册</el-button>
<el-button type="primary" size="large" @click="handleBack">返回</el-button>

</template>

<style scoped>

</style>