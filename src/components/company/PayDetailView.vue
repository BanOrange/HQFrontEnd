<script setup>
import { ref, reactive } from 'vue'
import axios from 'axios';
import qs from 'querystring';
import { ElMessage } from 'element-plus';
import { onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';

let route = useRoute();
let router = useRouter();
var studentList = new Array();
studentList = route.query.studentList;
let course_id = route.query.Course_id;
let course_fee = route.query.course_fee;
let course_name = route.query.course_name
let course_num = 0;

function back() {
  router.replace("/company/payStudent")
}

//计算一下总费用
function calc(){
  var fee = 0;
  var number = 0;
  var length=0;
  if(studentList){
    length = studentList.length;
  }
  for(var i=0;i<length;i++){
    fee += course_fee;
    number++;
  }
  course_fee = fee;
  course_num = number;
}

onMounted(() => {
  calc();
})


//向后端发送课程id，学员列表，company的username以及缴费金额，后端需要返回是否缴费成功
function finish() {
  let username = sessionStorage.getItem("username");
  let data={
    username: username,
    course_id: course_id,
    studentList: studentList,

    //可能用不上
    course_fee: course_fee,
  }

  axios.post("http://localhost:8080/company/pay", qs.stringify(data))
    .then((res) => {
      if(res.data.code==200){
        ElMessage.success("缴费成功")
      }else{
        ElMessage.error(res.data.msg)
      }
    })

}


</script>

<template>
  <el-text>请在1小时内扫描二维码进行缴费，并点击已完成缴费，后续将会验证本次缴费是否有效</el-text><br><br>
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  <img src="/QR.jpg" alt="缴费二维码" style="width:150px" /> <br>
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  <el-text>缴费课程名称：<span>{{ course_name }}</span></el-text><br>
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  <el-text>缴费费用：<span>{{ course_fee }}</span></el-text><br><br>
  <el-button type="primary" size="large" @click="back">返回前界面</el-button>&nbsp;&nbsp;&nbsp;
  <el-button type="primary" size="large" @click="finish">已完成缴费</el-button>
</template>

<style scoped></style>