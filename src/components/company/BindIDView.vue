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

const companyInfo = reactive({
  company_name: '',
  company_tele: '',
  company_key: '',
})

function back() {
  router.replace("/login")
}


//向后端返回绑定身份的请求，希望返回是否绑定成功
function register() {
  let data = {
    username: username,
    password: password,
    usertype: "company",
    company_name: companyInfo.company_name,
    company_tele: companyInfo.company_tele,
    company_key: companyInfo.company_key,
  }

  axios.post("http://localhost:8080/register/company", qs.stringify(data))
      .then((res) => {
        if (res.data.code === 200) {
          ElMessage("注册成功！")
          router.replace("/login")
        } else {
          if(res.data.code === 401)
          ElMessage.error("该用户名已经注册");
        }
      })
}
</script>

<template>
  <h2>注册前需要您绑定公司的相关信息</h2>
  <el-text>绑定后只能联系浩奇公司工作人员进行修改，请仔细检查信息</el-text>
  <br><br>
  <el-form :model="companyInfo" label-width="auto" style="max-width: 250px">
    <el-form-item>
      <el-input placeholder="请输入公司名称" v-model="companyInfo.company_name"/>
    </el-form-item>
    <el-form-item>
      <el-input placeholder="请输入公司联系电话" v-model="companyInfo.company_tele"/>
    </el-form-item>
    <el-form-item>
      <el-input placeholder="请输入公司密钥" type="password" v-model="companyInfo.company_key"/>
      <el-text>用于员工验证身份，请牢记</el-text>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="back">退出注册</el-button>
      <el-button type="primary" @click="register">绑定</el-button>
    </el-form-item>
  </el-form>
</template>

<style scoped></style>