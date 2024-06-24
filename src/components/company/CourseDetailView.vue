<script setup>
import { ref, reactive } from 'vue'
import axios from 'axios';
import qs from 'querystring';
import { ElMessage } from 'element-plus';
import { onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';

let route = useRoute();
let router = useRouter();
let id = route.query.id

const form = reactive({
  id: '',
  name: '',
  start: '',
  end: '',
  fee: '',
})


const form1 = reactive({
  teacher: '',
  info: '',
  state: '',
  place: '',
})



onMounted(() => {
  getCourse();
})


function getCourse() {
  let data = {
    id: id,
  }

  axios.post("http://localhost:8080/executor/getCourse", qs.stringify(data))
      .then((res) => {
        form.id = res.data.id;
        form.name = res.data.name;
        form.start = res.data.start;
        form.end = res.data.end;
        form.fee = res.data.fee;
        form1.teacher = res.data.teacher;
        form1.info = res.data.info;
        form1.state = res.state;
        form1.place = res.place;
      })
}


//返回到总览界面
function back(){
  router.replace("/company/courseManage");
}

</script>

<template>
  <h2>课程基本信息</h2>
  <el-form :inline="true" :model="form" label-width="auto" style="max-width: 700px">
    <el-form-item label="课程编号：">
      <el-input disabled v-model="form.id" />
    </el-form-item>
    <el-form-item label="课程名称：">
      <el-input disabled v-model="form.name" />
    </el-form-item>
    <el-form-item label="上课时间：">
      <el-input disabled v-model="form.start" style="width:200px" />
      <el-text>至</el-text>
      <el-input disabled v-model="form.end" style="width:200px" />
    </el-form-item>
    <el-form-item label="课程费用：">
      <el-input disabled v-model="form.fee" style="width:200px" />
      <el-text>￥/人</el-text>
    </el-form-item>
  </el-form><br>
  <h2>课程详细信息</h2>
  <el-form :model="form1" label-width="auto" style="max-width: 300px">
    <el-form-item label="主讲教师：">
      <el-input disabled v-model="form1.teacher" />
    </el-form-item>
    <el-form-item label="课程简介：">
      <el-input disabled v-model="form1.info" />
    </el-form-item>
    <el-form-item label="上课地点：">
      <el-input disabled v-model="form1.place" />
    </el-form-item>
    <el-form-item label="课程状态：">
      <el-input disabled v-model="form1.state" />
    </el-form-item>
  </el-form>

  <el-button type="primary" @click="back">返回</el-button>
</template>

<style scoped></style>