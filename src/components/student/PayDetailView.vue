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
let course_fee = "";
let course_name = "";

function back(){
    router.replace("/student/pay")
}
//向后端发送课程ID获取对应课程，返回对应数据，注意其中需要给出的是老师名称
//复用了执行人寻找课程的接口
function getCourse() {
  let data = {
    course_id: course_id,
  }

  axios.post("http://localhost:8080/executor/getCourse", qs.stringify(data))
    .then((res) => {
      course_fee = res.data.course_fee;
      course_name = res.data.course_name;
    })

}

onMounted(() => {
    
})

function finish(){
    router.push("student/pay")
}
 

</script>

<template>
    <el-text>请在1小时内扫描二维码进行缴费，并点击已完成缴费，微信将会验证本次缴费是否有效</el-text><br><br>
    <!-- <img :src="../public/static/QR.jpg" /> -->


    <el-text>缴费课程名称：<span>{{course_name}}</span></el-text><br>
    <el-text>缴费费用：<span>{{course_fee}}</span></el-text>
        <el-button link type="primary" size="large" @click="back">返回</el-button>
                <el-button link type="primary" size="large" @click="finish">已完成缴费</el-button>
</template>

<style scoped></style>