<script setup>
import {reactive} from 'vue'
import {ElMessage, ElMessageBox} from 'element-plus';
import {useRouter, useRoute} from 'vue-router';
import {onMounted} from 'vue';
import axios from 'axios'
import qs from 'querystring';

let router = useRouter();

//存储学员的核心信息，和别人不会重复的信息
//如学号和电话号等
const form = reactive({
  ID: '',
  name:'',
  telephone: '',
})

//该表单存储学生的其他信息
const form1 = reactive({
  companyName: '',
  jobPosition: '',
  email: '',
  level: '',
})

function back() {
  router.replace("/executor/studentManage")
}

//向后端发送添加学生信息的请求，返回添加成功与否
function onSubmit() {
  let data = {
    studentID:form.id,
    name: form.name,
    telephone: form.telephone,
    companyName: form1.companyName,
    jobPosition: form1.jobPosition,
    email: form1.email,
    level: form1.level,
  }

  axios.post("http://localhost:8080/executor/studentAdd", qs.stringify(data))
      .then((res) => {
        if (res.data.code === 200) {
          ElMessage("增加成功！")
          router.replace("/executor/studentManage")
        } else {
          ElMessage.error(res.data.msg);
        }
      })
}
</script>

<template>
  <h2>学员基本信息</h2>
  <br><br>
  <el-form :model="form" label-width="auto" style="max-width: 300px">
    <el-form-item label="学号：">
      <el-input v-model="form.id"/>
    </el-form-item>
    <el-form-item label="姓名：">
      <el-input v-model="form.name"/>
    </el-form-item>
    <el-form-item label="电话号码：">
      <el-input v-model="form.telephone"/>
    </el-form-item>
  </el-form>
<br>
  <h2>学员详细信息</h2>
  <el-form :model="form1" label-width="auto" style="max-width: 300px">
    <el-form-item label="公司名称：">
      <el-input v-model="form1.companyName"/>
    </el-form-item>
    <el-form-item label="工作岗位：">
      <el-input v-model="form1.jobPosition"/>
    </el-form-item>
    <el-form-item label="电子邮件：">
      <el-input v-model="form1.email"/>
    </el-form-item>
    <el-form-item label="技术水平：">
      <el-radio-group v-model="form1.level">
        <el-radio value="high">高级</el-radio>
        <el-radio value="middle">中级</el-radio>
        <el-radio value="low">入门</el-radio>
      </el-radio-group>
    </el-form-item>
  </el-form>
  <el-button type="primary" @click="back">返回</el-button>
  <el-button type="primary" @click="onSubmit">提交</el-button>
</template>

<style scoped></style>