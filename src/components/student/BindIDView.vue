<script setup>
import {reactive} from 'vue'
import {ElMessage, ElMessageBox} from 'element-plus';
import {useRouter, useRoute} from 'vue-router';
import {onMounted} from 'vue';
import axios from 'axios'
import qs from 'querystring';

let router = useRouter();
const form = reactive({
  stu_name: '',
  stu_company: '',
  jobPosition: '',
  telephone: '',
  email: '',
  level: '',
})

function back() {
  router.replace("/student")
}

function onSubmit() {
  let username = sessionStorage.getItem("username");
  let data = {
    username: username,
    companyName: form.companyName,
    name: form.name,
    jobPosition: form.jobPosition,
    telephone: form.telephone,
    email: form.email,
    level: form.level,
  }

  axios.post("http://localhost:8080/student/bindid", qs.stringify(data))
      .then((res) => {
        if (res.data.code === 200) {
          ElMessage("绑定成功！")
          router.replace("/student")
        } else {
          ElMessage.error(res.data.msg);
        }
      })
}
</script>

<template>
  <h2>个人信息</h2>
  <el-text>电话号码、邮件地址以及公司名称请务必与预留在公司的信息相同!</el-text>
  <br><br>
  <el-form :model="form" label-width="auto" style="max-width: 300px">
    <el-form-item label="姓名：">
      <el-input v-model="form.name"/>
    </el-form-item>
    <el-form-item label="公司名称：">
      <el-input v-model="form.companyName"/>
    </el-form-item>
    <el-form-item label="公司密钥：">
      <el-input v-model="form.companyKey"/>
    </el-form-item>
    <el-form-item label="工作岗位：">
      <el-input v-model="form.jobPosition"/>
    </el-form-item>
    <el-form-item label="电话号码：">
      <el-input v-model="form.telephone"/>
    </el-form-item>
    <el-form-item label="电子邮件：">
      <el-input v-model="form.email"/>
    </el-form-item>
    <el-form-item label="技术水平：">
      <el-radio-group v-model="form.level">
        <el-radio value="high">高级</el-radio>
        <el-radio value="middle">中级</el-radio>
        <el-radio value="low">入门</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="back">返回</el-button>
      <el-button type="primary" @click="onSubmit">提交</el-button>
    </el-form-item>
  </el-form>
</template>

<style scoped></style>