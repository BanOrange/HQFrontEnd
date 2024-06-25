<script setup>
import { reactive } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus';
import { useRouter, useRoute } from 'vue-router';
import { onMounted } from 'vue';
import axios from 'axios'
import qs from 'querystring';

let router = useRouter();

//装课程信息
const form = reactive({
  course_id: '',
  course_name: '',
  course_info: '',
  course_start1: '',
  course_start2: '',
  course_start3: '',
  course_end1: '',
  course_end2: '',
  course_end3: '',
  course_fee: '',
  course_place: '',
  course_state: ''
})


function back() {
  router.replace("/executor/studentManage")
}

function getTeacher(){
  let data={
    username: username,
  }

  axios.post("http://localhost:8080/executor/getAllteacher", qs.stringify(data))
    .then((res) => {
      if (res.data.code === 200) {
        ElMessage("增加成功！")
        router.replace("/executor/courseManage")
      } else {
        ElMessage.error(res.data.msg);
      }
    })
}

//向后端发送添加课程的请求，返回是否添加成功
function onSubmit() {
  let data = {
    id: form.id,
    name: form.name,
    start: form.start,
    end: form.end,
    pay: form.pay,
    teacher: form1.teacher,
    info: form1.info,
    state: form1.state,
    location: form1.location,
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
  <h2>新增课程信息</h2>
  <el-form :inline="true" :model="form" label-width="auto" style="max-width: 300px">
    <el-form-item label="课程编号：">
      <el-input v-model="form.course_id" />
    </el-form-item>
    <el-form-item label="课程名称：">
      <el-input v-model="form.course_name" />
    </el-form-item>
    <el-form-item label="上课时间：">
      <el-input v-model="form.start1" style="width:200px" />
      <el-text>-</el-text>
      <el-input v-model="form.start2" style="width:200px" />
      <el-text>-</el-text>
      <el-input v-model="form.start3" style="width:200px" /><br>
      <el-input v-model="form.end1" style="width:200px" />
      <el-text>-</el-text>
      <el-input v-model="form.end2" style="width:200px" />
      <el-text>-</el-text>
      <el-input v-model="form.end3" style="width:200px" />
    </el-form-item>
    <el-form-item label="课程费用：">
      <el-input v-model="form.course_fee" style="width:200px" />
      <el-text>￥/人</el-text>
    </el-form-item>
    <el-form-item label="主讲教师：">
      <el-input v-model="form1.course_teacher" />
    </el-form-item>
    <el-form-item label="上课地点：">
      <el-input v-model="form.course_place" />
    </el-form-item>
    <el-form-item label="课程简介">
      <el-input v-model="form.course_info" 
      style="width:400px" 
      :autosize="{ minRows: 10, maxRows: 100 }" 
      type="textarea"
        placeholder="请输入这门课的简介" />
    </el-form-item>
    <el-form-item label="课程状态：">
      <el-radio-group v-model="form.course_state">
        <el-radio value="未开课">未开课</el-radio>
        <el-radio value="报名中">报名中</el-radio>
        <el-radio value="授课中">授课中</el-radio>
        <el-radio value="阅卷中">阅卷中</el-radio>
        <el-radio value="反馈中">反馈中</el-radio>
        <el-radio value="已结束">已结束</el-radio>
      </el-radio-group>
    </el-form-item>
  </el-form>

  <el-button type="primary" @click="back">返回</el-button>
  <el-button type="primary" @click="onSubmit">添加</el-button>
</template>

<style scoped></style>