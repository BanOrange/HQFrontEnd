<script setup>
import {ref, reactive} from 'vue'
import axios from 'axios';
import qs from 'querystring';
import {ElMessage} from 'element-plus';
import {onMounted} from 'vue';
import router from '@/router';

//用来装课程的信息
const tableData = ref([])

<<<<<<< HEAD
const tableData = [
  {
    course_id:"1",
    course_name:"1",
    course_state:"1",
  },
]

const form = reactive({
  course_name: '',
  course_id: '',
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
=======
//用来装搜索条件
const searchForm = reactive({
  course_name: '',
  course_id: '',
})
>>>>>>> temp

onMounted(() => {
  getAllCourse();
})

//得到所有课程，复用了公共接口
function getAllCourse() {
  axios.get('http://localhost:8080/getAllCourse')
      .then((res) => {
        tableData.value = res.data;
      })
}

//模糊查询功能
function handleSearch() {
  let data = {
<<<<<<< HEAD
    course_id: form.course_id,
    course_name: form.course_name,
=======
    course_id: searchForm.course_id,
    course_name: searchForm.course_name,
>>>>>>> temp
  }
  axios.post("http://localhost:8080/searchCourse", qs.stringify(data))
      .then((res) => {
        tableData.value = res.data;
      })
}

//查看学生已选课程
function searchSelected() {
  let username = sessionStorage.getItem("username");
  let data = {
    username: username
  }
  axios.post("http://localhost:8080/student/searchSelected", qs.stringify(data))
      .then((res) => {
        tableData.value = res.data;
      })
}

//查看课程的详情
const getDetails = (index) => {
  router.push({
<<<<<<< HEAD
    name: 'CourseDetailView',
=======
    name: 'studentCourseDetail',
>>>>>>> temp
    query: {
      course_id:tableData.value[index].course_id,
    }
  })
}
</script>

<template>
  <el-form :model="searchForm" label-width="auto" style="max-width: 300px">
    <h1>课程查询</h1><br><br>
    <el-form-item label="课程编号：">
<<<<<<< HEAD
      <el-input v-model="form.course_id"/>
    </el-form-item>
    <el-form-item label="课程名称：">
      <el-input v-model="form.course_name"/>
=======
      <el-input v-model="searchForm.course_id"/>
    </el-form-item>
    <el-form-item label="课程名称：">
      <el-input v-model="searchForm.course_name"/>
>>>>>>> temp
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="handleSearch">查询</el-button>
    </el-form-item>
  </el-form>
  <br><br>
<<<<<<< HEAD
  <el-table :data="tableData" width="400px" max-height="200">
    <el-table-column fixed prop="course_id" label="课程编号" width="150"/>
    <el-table-column prop="course_name" label="课程名称" width="120"/>
    <el-table-column prop="course_state" label="课程状态" width="120"/>
    <el-table-column prop="course_place" label="上课地点" width="120"/>
    <el-table-column prop="course_start" label="课程开始时间" width="120"/>
    <el-table-column prop="course_end" label="课程结束时间" width="120"/>
    <el-table-column prop="course_info" label="课程简介" width="120"/>
    <el-table-column fixed="right" label="选择" width="200">
=======
  <h1>课程信息总览</h1>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column fixed prop="course_id" label="课程编号" width="150"/>
    <el-table-column prop="course_name" label="课程名称" width="120"/>
    <el-table-column prop="course_teacher" label="讲师名称" width="120"/>
    <el-table-column prop="course_fee" label="课程费用(￥)" width="150"/>
    <el-table-column fixed="right" label="操作" width="120">
>>>>>>> temp
      <template #default="scope">
        <el-button link type="primary" size="large" @click="getDetails(scope.$index)">详情</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-button type="primary" size="large" @click="searchSelected">查询已选课程列表</el-button>
</template>

<style scoped>
</style>