<script setup>
import { reactive, ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus';
import { useRouter, useRoute } from 'vue-router';
import { onMounted } from 'vue';
import axios from 'axios'
import qs from 'querystring';

let router = useRouter();

let stu_id = ref('')
let stu_name = ref('')
let stu_company = ref('')
let stu_position = ref('')
let stu_tele = ref('')
let stu_email = ref('')
let stu_level = ref('')
let stu_state = ref('')
let company_key = ref('')

function getStudentInfo() {
  axios.get('http://localhost:8080/student/getStudentInfo')
    .then((res) => {
      stu_id.value = res.data.stu_id;
      stu_name.value = res.data.stu_name;
      stu_company.value = res.data.stu_company;
      stu_position.value = res.data.stu_position;
      stu_tele.value = res.data.stu_tele;
      stu_email.value = res.data.stu_email;
      stu_level.value = res.data.stu_name;
      company_key.value = res.data.company_key;
      stu_state.value = res.data.stu_state;
    })
}


function back() {
  router.replace("/student")
}

function onSubmit() {
  let username = sessionStorage.getItem("username");
  let data = {
    username: username,
    stu_name: stu_name.value,
    stu_company: stu_company.value,
    stu_position: stu_position.value,
    stu_tele: stu_tele.value,
    stu_email: stu_email.value,
    stu_level: stu_level.value,
    company_key: company_key.value,
    stu_state: stu_state.value,
  }

  axios.post("http://localhost:8080/student/bindid", qs.stringify(data))
    .then((res) => {
      if (res.data.code === 200) {
        ElMessage("绑定成功！")
        router.replace("/student/bindid")
      } else {
        ElMessage.error(res.data.msg);
      }
    })
}
</script>

<template>
  <h2>个人信息</h2>
  <el-text>请仔细检查信息再提交</el-text>
  <br><br>
  <el-text>学员学号：</el-text>
  <el-input disabled v-model="stu_id" style="width:200px"/><br>
  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <el-text>绑定信息后系统会自动生成</el-text><br><br>
  <el-text>学员姓名：</el-text>
  <el-input v-model="stu_name" style="width:200px"/><br><br>
  <el-text>公司名称：</el-text>
  <el-input v-model="stu_company" style="width:200px"/><br><br>
  <el-text>工作职位：</el-text>
  <el-input v-model="stu_position" style="width:200px"/><br><br>
  <el-text>电话号码：</el-text>
  <el-input v-model="stu_tele" style="width:200px"/><br><br>
  <el-text>电子邮箱：</el-text>
  <el-input v-model="stu_email"style="width:200px" /><br><br>
  <el-text>技术水平：</el-text>
  <el-radio-group v-model="stu_level" style="width:300px">
    <el-radio value="high">高级</el-radio>
    <el-radio value="middle">中级</el-radio>
    <el-radio value="low">入门</el-radio>
  </el-radio-group>
  <br><br>
  <el-text>公司密钥：</el-text>
  <el-input type="password" v-model="company_key" style="width:200px"/><br>
  &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp; <el-text>用于验证您是否为所属公司员工，<br>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 密钥请联系您公司培训相关负责人</el-text>
  <br><br>
  <el-button type="primary" @click="back">返回</el-button>
  &nbsp; &nbsp; &nbsp; <el-button type="primary" @click="onSubmit">提交</el-button>


</template>

<style scoped></style>