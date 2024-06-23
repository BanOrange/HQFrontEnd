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
const form = reactive({
  teacher_name: '',
  teacher_position: '',
  teacher_email: '',
  teacher_tele: '',
  teacher_field: '',
})

function back() {
  router.replace("/login")
}

function register() {
  let data = {
    username: username,
    password: password,
    usertype: "teacher",
    teacher_name: form.teacher_name,
    teacher_position: form.teacher_position,
    teacher_email: form.teacher_email,
    teacher_tele: form.teacher_tele,
    teacher_field: form.teacher_field,
  }

  axios.post("http://localhost:8080/register/teacher", qs.stringify(data))
      .then((res) => {
        if (res.data.code === 200) {
          ElMessage("注册成功！")
          router.replace("/login")
        } else {
          ElMessage.error(res.data.msg);
        }
      })
}

const options = [
  {
    label: '讲师',
    value: '讲师',
  },
  {
    value: '资深讲师',
    label: '资深讲师',
  },
  {
    label: '领域专家',
    value: '领域专家',
  },
]
</script>

<template>
  <h2>为了完成注册，请您绑定身份</h2>
  <el-text>务必谨慎，后续只能通过联系浩奇公司内部人员进行修改</el-text>
  <br><br>
  <el-form :model="form" label-width="auto" style="max-width: 300px">
    <el-form-item>
      <el-input placeholder="请输入您的姓名" v-model="form.teacher_name"/>
    </el-form-item>
    <el-form-item>
      <el-select v-model="form.teacher_position" placeholder="请选择职称" style="width: 150px">
      <el-option v-for="item in options" :label="item.label" :value="item.value" />
    </el-select>
    </el-form-item>
    <el-form-item>
      <el-input placeholder="请输入您的电子邮件" v-model="form.teacher_email"/>
    </el-form-item>
    <el-form-item>
      <el-input placeholder="请输入您的电话号码" v-model="form.teacher_tele"/>
    </el-form-item>
    <el-form-item>
      <el-input placeholder="请输入您所擅长的领域(JAVA,嵌入式等)" v-model="form.teacher_field"/>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="back">返回登录</el-button>
      <el-button type="primary" @click="register">确认绑定</el-button>
    </el-form-item>
  </el-form>
</template>

<style scoped></style>