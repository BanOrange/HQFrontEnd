<script setup>
import {ref, reactive} from 'vue'
import axios from 'axios';
import qs from 'querystring';
import {ElMessage} from 'element-plus';
import {onMounted} from 'vue';
import { useRouter, useRoute } from 'vue-router';

let route = useRoute();
let course_id = route.query.course_id;

const tableData = ref([])

let eva_content=ref('');
let eva_score=ref('');

onMounted(() => {
  getCourseEvaluate();
})

//可以不用判断课程状态，前端已经帮忙判断了
//需要得到对应课程的评价信息（如果存在的话）
function getCourseEvaluate(){
  let username = sessionStorage.getItem("username");
  let data = {
    username: username,
    course_id: course_id,
  }
  console.log(data)
  axios.post("http://localhost:8080/student/getCourseEvaluate", qs.stringify(data))
      .then((res) => {
        eva_score.value = res.data.eva_score;
        eva_content.value = res.data.eva_score;
      })
}

//提交或者重新提交课程评价，也不用判断课程状态了，因为前端帮忙判断了
function onSubmit() {
  if(eva_score.value>100 || eva_score.value<0){
    ElMessage.error("您的评价分数不在范围内")
  }
  if(eva_content.value == ''){
    console.log(eva_content.value)
    ElMessage("您的评价意见不能为空，谢谢")
    return;
  }
  let username = sessionStorage.getItem("username");
  let data = {
    course_id: course_id,
    username: username,
    eva_score: eva_score.value,
    eva_content: eva_content.value,
  }
  console.log(data)
  axios.post("http://localhost:8080/student/courseEvaluate", qs.stringify(data))
      .then((res) => {
        if (res.data.code === 200) {
          ElMessage("评价成功")
          router.replace("/student/courseEvaluate")
        } else {
          ElMessage.error(res.data.msg)
        }
      })
}

</script>

<template>
<h1>填写课程评价</h1><br>
    <el-text>课程内容评分</el-text>
    <br><br>
    <el-input style="width:150px" placeholder="请输入评价分值" v-model="eva_score"/>
    <el-text>分(0-100)</el-text>
    <br><br>
    <el-text>课程评价意见</el-text>
    <br><br>
    <el-input
        v-model="eva_content"
        style="width:400px"
        :autosize="{ minRows: 10, maxRows: 100 }"
        type="textarea"
        placeholder="请输入您对这门课的评价意见"
    />
  <br><br>
  <el-button type="primary" @click="onSubmit">提交</el-button>
</template>

<style scoped>

</style>