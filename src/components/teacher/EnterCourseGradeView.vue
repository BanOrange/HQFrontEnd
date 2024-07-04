<script setup>
import { ref, reactive } from 'vue'
import axios from 'axios';
import qs from 'querystring';
import { ElMessage } from 'element-plus';
import { onMounted } from 'vue';
import router from '@/router';

let cid = "";
//查询课程所需要的信息
const form = reactive({
  course_name: '',
  course_id: '',
})

//该门课程下的学生数据
const tableData = ref([])

//查询课程相关的学生成绩功能
//只能查跟该名老师有关的课程而不能查询其他课程
//返回的数据应该是学生列表和该门课程的ID
function handleSearch() {
  let username = sessionStorage.getItem("username");
  let data = {
    course_id: form.course_id,
    course_name: form.course_name,
    username: username,
  }

  axios.post("http://localhost:8080/teacher/getGradeCourse", qs.stringify(data))
    .then((res) => {
      tableData.value = res.data;
      cid = res.data.cid;
    })
}

//得到该讲师负责的所有课程
function getGradeCourse() {
  let username = sessionStorage.getItem("username");
  let data = {
    username: username
  }

  axios.post("http://localhost:8080/teacher/searchSelected", qs.stringify(data))
    .then((res) => {
      tableData.value = res.data;
    })
}


//录入单名学生的成绩
const EnterGrade = (index) => {
  if (tableData.value[index].course_state == "阅卷中") {
    router.push({
      name: 'teacherGradeDetail',
      query: {
        course_id: tableData.value[index].course_id,
        course_name: tableData.value[index].course_name,
      }
    })
  }else{
    ElMessage("这门课程还没有到录入成绩的阶段，请之后再录入")
  }
}

onMounted(() => {
  getGradeCourse();
})
</script>

<template>
  <el-form :model="form" label-width="auto" style="max-width: 300px">
    <h1>查询要录入成绩的课程</h1><br><br>
    <el-form-item label="课程编号：">
      <el-input v-model="form.course_id" />
    </el-form-item>
    <el-form-item label="课程名称：">
      <el-input v-model="form.course_name" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="handleSearch">查询</el-button>
    </el-form-item>
  </el-form>

  <el-table :data="tableData" width="400px" max-height="200">
    <el-table-column fixed prop="course_name" label="课程名称" width="150" />
    <el-table-column prop="course_id" label="课程编号" width="150" />
    <el-table-column prop="course_state" label="课程状态" width="150" />
    <el-table-column fixed="right" label="操作" width="200">
      <template #default="scope">
        <el-button type="primary" @click="EnterGrade(scope.$index)">录入</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<style scoped></style>