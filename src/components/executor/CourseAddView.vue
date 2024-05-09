<script setup>
import {reactive} from 'vue'
import {ElMessage, ElMessageBox} from 'element-plus';
import {useRouter, useRoute} from 'vue-router';
import {onMounted} from 'vue';
import axios from 'axios'
import qs from 'querystring';

let router = useRouter();

//装课程的基本信息
const form = reactive({
  id: '',
  name: '',
  start: '',
  end: '',
  pay: '',
})

//用来装课程的详细信息
const form1 = reactive({
  teacher: '',
  info: '',
  state: '',
  location: '',
})

function back() {
  router.replace("/executor/studentManage")
}


//向后端发送添加课程的请求，返回是否添加成功
function onSubmit() {
  let data = {
    id:form.id,
    name:form.name,
    start:form.start,
    end:form.end,
    pay:form.pay,
    teacher:form1.teacher,
    info:form1.info,
    state:form1.state,
    location:form1.location,
  }

  axios.post("http://localhost:8080/executor/courseAdd", qs.stringify(data))
      .then((res) => {
        if (res.data.code === 200) {
          ElMessage("增加成功！")
          router.replace("/executor/courseManage")
        } else {
          ElMessage.error(res.data.msg);
        }
      })
}
</script>

<template>
<h2>课程基本信息</h2>
<el-form :inline="true" :model="form" label-width="auto" style="max-width: 700px">
    <el-form-item label="课程编号：">
      <el-input v-model="form.id"/>
    </el-form-item>
    <el-form-item   label="课程名称：">
      <el-input v-model="form.name"/>
    </el-form-item>
    <el-form-item  label="上课时间：">
      <el-input v-model="form.start" style="width:200px"/>
      <el-text>至</el-text>
      <el-input  v-model="form.end" style="width:200px"/>
    </el-form-item>
    <el-form-item label="课程费用：">
      <el-input v-model="form.pay" style="width:200px"/>
      <el-text>￥/人</el-text>
    </el-form-item>
  </el-form><br>
  <h2>课程详细信息</h2>
  <el-form :model="form1" label-width="auto" style="max-width: 300px">
    <el-form-item label="主讲教师：">
      <el-input v-model="form1.teacher"/>
    </el-form-item>
    <el-form-item label="课程简介：">
      <el-input v-model="form1.info"/>
    </el-form-item>
    <el-form-item label="上课地点：">
      <el-input v-model="form1.location"/>
    </el-form-item>
    <el-form-item label="课程状态：">
        <el-radio-group v-model="form1.state">
        <el-radio value="enroll">报名中</el-radio>
        <el-radio value="teach">授课中</el-radio>
        <el-radio value="end">已经结束</el-radio>
      </el-radio-group>
    </el-form-item>
  </el-form>

  <el-button type="primary" @click="back">返回</el-button>
  <el-button type="primary" @click="onSubmit">添加</el-button>
</template>

<style scoped></style>