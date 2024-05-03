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
let CourseID = route.query.CourseID
//装课程的基本信息
const form = reactive({
  courseID: '',
  courseName: '',
  courseStartTime: '',
  courseEndTime: '',
  coursePrice: '',
})

//用来装课程的详细信息
const form1 = reactive({
  teacher: '',
  courseInfo: '',
  courseState: '',
  courseLocation: '',
})

//由于这里需要一开始就挂载，但是还没有和后端发生信息交互，所以会导致报名和返回用不了
//是正常情况，需要后端先传过来给门课程的数据才行
onMounted(() => {
  getCourse();
})

//得到该门课程的课程的详细信息,需要在一开始就运行
function getCourse(){
    let data ={
        CourseID: this.CourseID,
    }

    axios.post("http://localhost:8080/student/getOneCourse", qs.stringify(data))
      .then((res) => {
        if (res.data.code === 200) {
            form.value.courseID = res.data.courseID;
            form.value.courseName = res.data.courseName;
            form.value.courseStartTime = res.data.courseStartTime;
            form.value.courseEndTime = res.data.courseEndTime;
            form.value.coursePrice = res.data.coursePrice;
            form1.value.teacher = res.data.teacher;
            form1.value.courseInfo = res.data.courseInfo;
            form1.value.courseState = res.data.courseState;
            form1.value.courseLocation = res.data.courseLocation;
        } else {
          ElMessage.error(res.data.msg)
        }
      })
}


//返回到总览界面
function back(){
    router.replace("/student/searchCourse")
}

//向后端发送报名请求
function signUp(){
    let username = sessionStorage.getItem("username");
    let data ={
        uername: username,
        courseID:form.id,
    }

    axios.post("http://localhost:8080/student/signup", qs.stringify(data))
      .then((res) => {
        if (res.data.code == 200) {
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
      <el-input disabled v-model="form.courseID"/>
    </el-form-item>
    <el-form-item   label="课程名称：">
      <el-input disabled v-model="form.courseName"/>
    </el-form-item>
    <el-form-item  label="上课时间：">
      <el-input disabled v-model="form.courseStartTime" style="width:200px"/>
      <el-text>至</el-text>
      <el-input disabled v-model="form.courseEndTime" style="width:200px"/>
    </el-form-item>
    <el-form-item label="课程费用：">
      <el-input disabled v-model="form.coursePrice" style="width:200px"/>
      <el-text>￥/人</el-text>
    </el-form-item>
  </el-form><br>
  <h2>课程详细信息</h2>
  <el-form :model="form1" label-width="auto" style="max-width: 300px">
    <el-form-item label="主讲教师：">
      <el-input disabled v-model="form1.teacher"/>
    </el-form-item>
    <el-form-item label="课程简介：">
      <el-input disabled v-model="form1.courseInfo"/>
    </el-form-item>
    <el-form-item label="上课地点：">
      <el-input disabled v-model="form1.courseLocation"/>
    </el-form-item>
    <el-form-item label="课程状态：">
      <el-input disabled v-model="form1.courseState"/>
    </el-form-item>
  </el-form>

  <el-button type="primary" @click="back">返回</el-button>
  <el-button type="primary" @click="signUp">报名</el-button>
</template>

<style scoped>

</style>