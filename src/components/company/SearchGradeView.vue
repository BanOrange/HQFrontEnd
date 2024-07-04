<script setup>
import {ref, reactive} from 'vue'
import axios from 'axios';
import qs from 'querystring';
import {ElMessage} from 'element-plus';
import {onMounted} from 'vue';
import router from '@/router';

//查询课程所需要的信息
const form = reactive({
  course_name: '',
  course_id: '',
})

//得到该公司所有员工选过的课程，复用了之前的接口
function getStudentGrade(){
  let username = sessionStorage.getItem("username");
    let data = {
        username: username,
    }
    console.log(username)
    axios.post("http://localhost:8080/company/getAllPayment", qs.stringify(data))
        .then((res) => {
          console.log(res.data)
            tableData.value = res.data;
        })
}

onMounted(() => {
  getStudentGrade();
})

//查看课程对应的学员具体成绩
const searchGrade = (index) => {
  router.push({
    name: 'companyGradeDetail',
    query: {
      course_id:tableData.value[index].course_id,
      course_name:tableData.value[index].course_name,
    }
  })
}

//对应的课程信息
const tableData = ref([])


//模糊查询课程，此功能暂时封存
function handleSearch() {
  let username = sessionStorage.getItem("username");
  let data = {
    course_id: form.id,
    course_name : form.name,
    username: username,
  }

  axios.post("http://localhost:8080/company/getStudentGrade", qs.stringify(data))
      .then((res) => {
        tableData.value = res.data;
      })
}

</script>

<template>
  <el-form :model="form" label-width="auto" style="max-width: 300px">
    <h1>查询课程成绩</h1><br><br>
    <el-form-item label="课程编号：">
      <el-input v-model="form.id"/>
    </el-form-item>
    <el-form-item label="课程名称：">
      <el-input v-model="form.name"/>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="handleSearch">查询</el-button>
    </el-form-item>
  </el-form>

  <h1>以下本公司员工所选课程</h1>
  <el-table :data="tableData" width="500px" max-height="200">
    <el-table-column fixed prop="course_name" label="课程名称" width="150" />
    <el-table-column prop="course_id" label="课程编号" width="150" />
    <el-table-column fixed="right" label="操作" width="200">
      <template #default="scope">
        <el-button type="primary" @click="searchGrade(scope.$index)">查询成绩</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<style scoped>

</style>