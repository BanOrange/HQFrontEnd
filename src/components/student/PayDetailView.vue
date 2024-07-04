<script setup>
import { ref, reactive } from 'vue'
import axios from 'axios';
import qs from 'querystring';
import { ElMessage } from 'element-plus';
import { onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';

let route = useRoute();
let router = useRouter();
let course_id = route.query.course_id;
let course_name = route.query.course_name;

function back() {
  router.replace("/student/pay")
}

//学员向后端发送请求进行缴费，后端需要返回是否成功
function finish() {
  let username = sessionStorage.getItem("username");
  let data = {
    //学员的username和课程的id
    username: username,
    course_id: course_id,
    corse_name: course_name,
  }

  axios.post("http://localhost:8080/student/pay", qs.stringify(data))
    .then((res) => {
      if(res.data.code == 200){
        ElMessage.success("缴费成功");
      }else{
        ElMessage.error(res.data.msg);
      }
    })

  
}


</script>

<template>
  <el-text>请在1小时内扫描二维码进行缴费，并点击已完成缴费，后续将会验证本次缴费是否有效</el-text><br><br>
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  <img src="/QR.jpg" alt="缴费二维码" style="width:150px" /> <br>
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  <el-text>缴费课程编号：<span>{{ course_id }}</span></el-text><br>
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  <el-text>缴费课程名称：<span>{{ course_name }}</span></el-text><br><br>
  <el-button type="primary" size="large" @click="back">返回前界面</el-button>&nbsp;&nbsp;&nbsp;
  <el-button type="primary" size="large" @click="finish">已完成缴费</el-button>
</template>

<style scoped></style>