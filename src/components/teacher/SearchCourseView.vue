<script setup>
import {ref, reactive} from 'vue'
import axios from 'axios';
import qs from 'querystring';
import {ElMessage} from 'element-plus';
import {onMounted} from 'vue';
import router from '@/router';


const tableData = ref([])
const form = reactive({
  CourseName: '',
  CourseID: '',
})
let checkList = [];
const Select = (index) => {
  if (checkList.includes(index)) {
    checkList.splice(checkList.indexOf(index), 1);
  } else {
    checkList.push(index);
  }
  console.log(checkList);
}

onMounted(() => {
  getAllCourse();
})

//得到所有课程
function getAllCourse() {
  axios.get('http://localhost:8080/getAllCourse')
      .then((res) => {
        tableData.value = res.data;
      })
}

//查询功能
function handleSearch() {
  let data = {
    CourseID: form.CourseID,
    CourseName: form.CourseName,
  }

  axios.post("http://localhost:8080/searchCourse", qs.stringify(data))
      .then((res) => {
        if (res.data.code === 200) {
          ElMessage("查询成功")
          tableData.value = res.data;

        } else {
          ElMessage.error(res.data.msg)
        }
      })
}

//查看所教授的课程
function searchSelected() {
  let username = sessionStorage.getItem("username");
  let data = {
    username: username
  }

  axios.post("http://localhost:8080/teacher/searchSelected", qs.stringify(data))
      .then((res) => {
        if (res.data.code == 200) {
          ElMessage("查询成功")
          tableData.value = res.data;

        } else {
          ElMessage.error(res.data.msg)
        }
      })
}

//查看课程的详情
const getDetails = (index) => {
  this.$router.push({
    path: 'student/coursedetail',
    query: {
      CourseID: tableData.value[index].CourseID
    }
  })
}
</script>

<template>
  <el-form :model="form" label-width="auto" style="max-width: 300px">
    <h1>课程查询</h1><br><br>
    <el-form-item label="课程编号：">
      <el-input v-model="form.CourseName"/>
    </el-form-item>
    <el-form-item label="课程名称：">
      <el-input v-model="form.CourseID"/>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="handleSearch">查询</el-button>
    </el-form-item>
  </el-form>
  <br><br>
  
  <el-table :data="tableData" width="400px" max-height="200">
    <el-table-column fixed prop="CourseID" label="课程编号" width="150"/>
    <el-table-column prop="CourseName" label="课程名称" width="120"/>
    <el-table-column prop="TeacherName" label="讲师名称" width="120"/>
    <el-table-column prop="CoursePrice" label="课程费用(￥)" width="150"/>
    <el-table-column fixed="right" label="选择" width="200">
      <template #default="scope">
        <el-button type="primary" @click="getDetails(scope.$index)">详情</el-button>
      </template>
    </el-table-column>
  </el-table>
  <br><br>
  <el-button type="primary" @click="searchSelected">查询所教授的课程列表</el-button>
</template>

<style scoped>
</style>