<script setup>
import {reactive} from 'vue'
import {ElMessage, ElMessageBox} from 'element-plus';
import {useRouter, useRoute} from 'vue-router';
import {onMounted} from 'vue';
import axios from 'axios'
import qs from 'querystring';

let router = useRouter();

//存储讲师的基本信息
//编号和姓名
const form = reactive({
  teacher_id: '',
  teacher_name:'',
  teacher_position: '',
})

//该表单存储讲师的详细信息
const form1 = reactive({
  teacher_field: '',
  teacher_tele: '',
  teacher_email: '',
})

const form2 = reactive({
  username: '',
  password: '',
})

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

function back() {
  router.replace("/executor/TeacherManage")
}

function onSubmit() {
  let data = {
    username: form2.username,
    password: form2.password,
    teacher_name: form.teacher_name,
    teacher_position: form.teacher_position,
    teacher_email: form1.teacher_email,
    teacher_tele: form1.teacher_tele,
    teacher_field: form1.teacher_field,
    usertype: "teacher",
  }

  axios.post("http://localhost:8080/register/teacher", qs.stringify(data))
      .then((res) => {
        if (res.data.code === 200) {
          ElMessage("增加成功！")
          router.replace("/executor/TeacherManage")
        } else {
          ElMessage.error(res.data.msg);
        }
      })
}
</script>

<template>
  <h2>讲师基本信息</h2>
  <el-form :model="form" label-width="auto" style="max-width: 300px">
    <el-form-item label="讲师姓名：">
      <el-input v-model="form.teacher_name"/>
    </el-form-item>
    <el-form-item label="讲师职称：">
      <el-select v-model="form.teacher_position" placeholder="请选择职称" style="width: 150px">
      <el-option v-for="item in options" :label="item.label" :value="item.value" />
    </el-select>
    </el-form-item>
  </el-form>
<br>

  <h2>讲师详细信息</h2>
  <el-form :model="form1" label-width="auto" style="max-width: 400px">
    <el-form-item label="擅长领域：">
      <el-input placeholder="请输入所擅长的领域(JAVA,嵌入式等)" v-model="form1.teacher_field"/>
    </el-form-item>
    <el-form-item label="电话号码：">
        <el-input v-model="form1.teacher_tele"/>
    </el-form-item>
    <el-form-item label="电子邮箱：">
        <el-input v-model="form1.teacher_email"/>
    </el-form-item>
  </el-form>
  <br>
  <h2>讲师账户信息</h2>
  <el-form :model="form2" label-width="auto" style="max-width: 300px">
    <el-form-item label="用户名：">
        <el-input placeholder="请输入该老师对应的账户名" v-model="form2.username"/>
    </el-form-item>
    <el-form-item label="密码：">
        <el-input placeholder="请输入该老师的帐户密码" type="password" v-model="form2.password"/>
    </el-form-item>
  </el-form>
  <br>
  <el-button type="primary" @click="back">返回</el-button>
  <el-button type="primary" @click="onSubmit">提交</el-button>
</template>

<style scoped></style>