<script setup>
import { reactive,ref} from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus';
import { useRouter, useRoute } from 'vue-router';
import { onMounted } from 'vue';
import axios from 'axios'
import qs from 'querystring';

let router = useRouter();
let end = "";
let start = "";
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
  course_state: '',
  course_teacher: '',
})
const teacherData = reactive({})
const options = [
  {
    label: '未开课',
    value: '未开课',
  },
  {
    value: '报名中',
    label: '报名中',
  },
  {
    label: '授课中',
    value: '授课中',
  },
  {
    label: '阅卷中',
    value: '阅卷中',
  },
  {
    label: '评价中',
    value: '评价中',
  },
  {
    label: '已结束',
    value: '已结束',
  },
]

function back() {
  router.replace("/executor/courseManage")
}

//找到所有的讲师信息,用于给执行人选择讲师，复用了之前的接口
function findAllTeacher() {
    axios.get('http://localhost:8080/executor/findallteacher')
        .then((res) => {
            teacherData.value = res.data;
            console.log(res.data)
        })
}



//向后端发送添加课程的请求，返回是否添加成功
function onSubmit() {
  if(form.course_start1>9999 || form.course_start1<2000 ){
    ElMessage.error("您输入的年开始时间有误")
    return;
  }
  if(form.course_start2 > 13 || form.course_start2<1 ){
    ElMessage.error("您输入的月开始时间有误")
    return;
  }
  if(form.course_start3 > 31 || form.course_start3 <1 ){
    ElMessage.error("您输入的日开始时间有误")
    return;
  }

  if(form.course_end1>9999 || form.course_end1<2000){
    ElMessage.error("您输入的年结束时间有误")
    return;
  }
  if(form.course_end2>31 || form.course_end1<1){
    ElMessage.error("您输入的月结束时间有误")
    return;
  }
  if(form.course_end3>31 || form.course_end3<1){
    ElMessage.error("您输入的日结束时间有误")
    return;
  }
  let username = sessionStorage.getItem("username")
  start = form.course_start1 + '-' + form.course_start2 + '-' + form.course_start3;
  end = form.course_end1 + '-' + form.course_end2 + '-' + form.course_end3;
  let data = {
    username: username,
    course_id: form.course_id,
    course_name: form.course_name,
    course_start: start,
    course_end: end,
    course_fee: form.course_fee,
    course_teacher: form.course_teacher,
    course_info: form.course_info,
    course_state: form.course_state,
    course_place: form.course_place,
  }
  console.log(data)
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

//挂载,但是为了方便开发，先注释掉
onMounted(() =>{
  findAllTeacher();
  console.log(teacherData.value)
})

function getNotice(){
  ElMessageBox.alert('您好，浩奇公司开设了一门名为《'+form.course_name+'》的课程，课程费用为'+form.course_fee+'￥,欢迎您进入官网查询该课程的详细信息','开课通知')
}
</script>

<template>
  <h2>新增课程信息</h2>
  <el-form :inline="true" :model="form" label-width="auto" style="max-width: 500px">
    <el-form-item label="课程编号：">
      <el-input v-model="form.course_id" />
    </el-form-item>
    <el-form-item label="课程名称：">
      <el-input v-model="form.course_name" />
    </el-form-item>
    <el-form-item label="课程开始时间：">
      <el-input v-model="form.course_start1" style="width:60px" />
      <el-text>年</el-text>
      <el-input v-model="form.course_start2" style="width:50px" />
      <el-text>月</el-text>
      <el-input v-model="form.course_start3" style="width:50px" />
      <el-text>日</el-text><br>
    </el-form-item>
    <el-form-item label="课程结束时间：">
      <el-input v-model="form.course_end1" style="width:60px" />
      <el-text>年</el-text>
      <el-input v-model="form.course_end2" style="width:50px" />
      <el-text>月</el-text>
      <el-input v-model="form.course_end3" style="width:50px" />
      <el-text>日</el-text>
    </el-form-item>
    <el-form-item label="课程费用：">
      <el-input v-model="form.course_fee" style="width: 100px" />
      <el-text>￥/人</el-text>
    </el-form-item>
    <el-form-item label="课程讲师：">
      <el-select v-model="form.course_teacher" placeholder="请选择讲师" style="width: 150px">
      <el-option v-for="item in teacherData.value" :label="item.teacher_name" :value="item.teacher_id" />
    </el-select>
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
      <el-select v-model="form.course_state" placeholder="请选择课程状态" style="width: 150px">
      <el-option v-for="item in options" :label="item.label" :value="item.value" />
    </el-select>
    </el-form-item>
  </el-form>

  <el-button type="primary" @click="back">返回</el-button>
  <el-button type="primary" @click="onSubmit">添加</el-button>
  <el-button type="primary" @click="getNotice">一键生成开课通知</el-button>
</template>

<style scoped></style>