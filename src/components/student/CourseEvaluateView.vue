<script setup>
import { ref, reactive } from 'vue'
import axios from 'axios';
import qs from 'querystring';
import { ElMessage } from 'element-plus';
import { onMounted } from 'vue';
import router from '@/router';

const tableData = ref([])
const form = reactive({
  eva_score: '',
  eva_content: '',
})

const searchForm = reactive({
  course_name: '',
  course_id: '',
})

onMounted(() => {
  getStudentCourse();
})

const evaluate = (index) => {
  console.log(tableData.value[index].course_id)
  if (tableData.value[index].course_state == "反馈中") {
    router.push({
      name: 'studentCourseEvaluateDetail',
      query: {
        course_id: tableData.value[index].course_id,
      }
    })
  }else if(tableData.value[index].course_state == "已结束"){
    ElMessage("该门课程已经结束了，感谢您的选择")
  }else{
    ElMessage.error("该门课程还没有进入评价阶段，请稍候再评价吧")
  }
}

//查询该学员报名的所有课程，后端返回这些课程list，无需判断课程状态
function getStudentCourse() {
  let username = sessionStorage.getItem("username");
  let data = {
    username: username,
  }
  axios.post('http://localhost:8080/student/getStudentCourse', qs.stringify(data))
    .then((res) => {
      console.log(res.data)
      tableData.value = res.data;
    })
}

function handleSearch(){
  let data={
    course_name: searchForm.course_name,
    course_id: searchForm.course_id,
  }
  axios.post('http://localhost:8080/student/searchCourse', qs.stringify(data))
    .then((res) => {
      tableData.value = res.data;
    })
}


</script>

<template>
  <el-form :model="form" label-width="auto" style="max-width: 300px">
    <h1>课程查询</h1><br><br>
    <el-form-item label="课程编号：">
      <el-input v-model="searchForm.course_name" />
    </el-form-item>
    <el-form-item label="课程名称：">
      <el-input v-model="searchForm.course_id" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="handleSearch">查询</el-button>
    </el-form-item>
  </el-form>
  <br><br>
  <el-table :data="tableData" width="400px" max-height="200">
    <el-table-column fixed prop="course_id" label="课程编号" width="150" />
    <el-table-column prop="course_name" label="课程名称" width="120" />
    <el-table-column prop="course_teacher" label="讲师名称" width="120" />
    <el-table-column prop="course_state" label="课程状态" width="120" />
    <el-table-column prop="course_fee" label="课程费用(￥)" width="150" />
    <el-table-column fixed="right" label="选择" width="200">
      <template #default="scope">
        <el-button type="primary" @click="evaluate(scope.$index)">去评价</el-button>
      </template>
    </el-table-column>
  </el-table>
  <br><br>
</template>

<style scoped></style>