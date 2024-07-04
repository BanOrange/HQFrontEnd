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
let course_id = route.query.course_id

//用来装查询用到的ID
const form = reactive({
  course_id: '',
})

//用来装签到信息
const tableData = ref([])

//获取当前课程的最后一次签到的签到信息情况，主要是返回一个学生列表，其中包含学生的签到状态
function handleSearchCheck() {
  if(course_id!=""){
    let data = {
    course_id: course_id,
  }
  }
  let data = {
    course_id: form.course_id,
  }

  axios.post("http://localhost:8080/staff/checkDetail", qs.stringify(data))
      .then((res) => {
          tableData.value = res.data;
      })
}
</script>

<template>
    <el-form :model="form" label-width="auto" style="max-width: 300px">
    <h1>签到查询</h1><br><br>
    <el-form-item label="课程编号：">
      <el-input v-model="form.name"/>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="handleSearchCheck">查询</el-button>
    </el-form-item>
  </el-form>
  <br>
  <h1>签到情况</h1>
  <el-table :data="tableData" width="400px" max-height="200">
    <el-table-column prop="time" label="签到日期" width="120"/>
    <el-table-column fixed prop="name" label="课程名称" width="150"/>
    <el-table-column fixed prop="id" label="课程编号" width="150"/>
    <el-table-column prop="name" label="学生名称" width="120"/>
    <el-table-column prop="sid" label="学生编号" width="120"/>
    <el-table-column prop="state" label="签到状态" width="120"/>
  </el-table>
</template>

<style scoped>

</style>