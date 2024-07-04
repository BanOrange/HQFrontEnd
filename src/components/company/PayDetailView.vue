<script setup>
import { ref, reactive } from 'vue'
import axios from 'axios';
import qs from 'querystring';
import { ElMessage } from 'element-plus';
import { onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';

let route = useRoute();
let router = useRouter();

const studentList = JSON.parse(route.query.studentList)
console.log(studentList);
let course_id = route.query.course_id;
let course_name = route.query.course_name;
let course_num = studentList.length;

function back() {
  router.replace("/company/payStudent")
}


onMounted(() => {

})


//向后端发送课程id，学员列表，company的username以及缴费金额，后端需要返回是否缴费成功
function finish() {
  let username = sessionStorage.getItem("username");
  let List = [];
  for(var i=0;i<studentList.length;i++){
    List.push({stu_id: studentList[i].stu_id,
              stu_name: studentList[i].stu_name,
            course_id: course_id,
            username: username,});
  }
  console.log(List)
  let data={
    username: username,
    course_id: course_id,
    studentList: List,
  }

  axios.post("http://localhost:8080/company/pay", List)
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
  <el-text>缴费课程编号：<span>{{ course_id }}</span></el-text><br>
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  <el-text>缴费课程名称：<span>{{ course_name }}</span></el-text><br><br>
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  <el-text>本次缴费人数：<span>{{ course_num }}</span></el-text><br><br>
  <el-button type="primary" size="large" @click="back">返回前界面</el-button>&nbsp;&nbsp;&nbsp;
  <el-button type="primary" size="large" @click="finish">已完成缴费</el-button>
</template>

<style scoped></style>