<script setup>
import {ref, reactive} from 'vue'
import axios from 'axios';
import qs from 'querystring';
import {ElMessage} from 'element-plus';
import {onMounted} from 'vue';
import { useRouter,useRoute } from 'vue-router';

let route = useRoute();
let router = useRouter();
//路由传参传过来的ID，可能会出现问题建议检查一下
let id = route.query.id
//装课程的基本信息
const form = reactive({
  course_id: '',
  course_name: '',
  course_start: '',
  course_end: '',
  course_fee: '',
})


//用来装课程的详细信息
const form1 = reactive({
  course_info: '',
  course_state: '',
  course_place: '',
})

//由于这里需要一开始就挂载，但是还没有和后端发生信息交互，所以会导致报名和返回用不了
//是正常情况，需要后端先传过来给门课程的数据才行
onMounted(() => {
  getCourse();
})

//得到该门课程的课程的详细信息,需要在一开始就运行
function getCourse(){
  let data ={
    id: id,
  }

  axios.post("http://localhost:8080/student/getOneCourse", qs.stringify(data))
      .then((res) => {
        form.course_id = res.data.course_id;
        form.course_name = res.data.course_name;
        form.course_start = res.data.course_start;
        form.course_end = res.data.course_end;
        form.course_fee = res.data.course_fee;
        form1.course_info = res.data.course_info;
        form1.course_state = res.data.course_state;
        form1.course_place = res.data.course_place;
      })
}


//返回到总览界面
function back(){
  router.replace("/student/SearchCourseView")
}

//向后端发送报名请求,需要后端发送是否报名成功或者其他异常情况
function signUp(){
  let username = sessionStorage.getItem("username");
  let data ={
    username: username,
    course_id:form.course_id,
  }

  axios.post("http://localhost:8080/student/signup", qs.stringify(data))
      .then((res) => {
        if (res.data.code === 200) {
          ElMessage("报名成功")
        } else {
          ElMessage.error(res.data.msg)
        }
      })
}

</script>

<template>
  <h2>课程基本信息</h2>
  <el-form :inline="true" :model="form" label-width="auto" style="max-width: 700px">
    <el-form-item label="课程编号：">
      <el-input disabled v-model="form.course_id"/>
    </el-form-item>
    <el-form-item   label="课程名称：">
      <el-input disabled v-model="form.course_name"/>
    </el-form-item>
    <el-form-item  label="上课时间：">
      <el-input disabled v-model="form.course_start" style="width:200px"/>
      <el-text>至</el-text>
      <el-input disabled v-model="form.course_end" style="width:200px"/>
    </el-form-item>
    <el-form-item label="课程费用：">
      <el-input disabled v-model="form.course_fee" style="width:200px"/>
      <el-text>￥/人</el-text>
    </el-form-item>
  </el-form><br>
  <h2>课程详细信息</h2>
  <el-form :model="form1" label-width="auto" style="max-width: 300px">
    <el-form-item label="课程简介：">
      <el-input disabled v-model="form1.course_info"/>
    </el-form-item>
    <el-form-item label="上课地点：">
      <el-input disabled v-model="form1.course_place"/>
    </el-form-item>
    <el-form-item label="课程状态：">
      <el-input disabled v-model="form1.course_state"/>
    </el-form-item>
  </el-form>

  <el-button type="primary" @click="back">返回</el-button>
  <el-button type="primary" @click="signUp">报名</el-button>
</template>

<style scoped>

</style>