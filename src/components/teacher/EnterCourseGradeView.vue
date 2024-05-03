<script setup>
import {ref, reactive} from 'vue'
import axios from 'axios';
import qs from 'querystring';
import {ElMessage} from 'element-plus';
import {onMounted} from 'vue';
import router from '@/router';

let courseID="";
//查询课程所需要的信息
const form = reactive({
  CourseName: '',
  CourseID: '',
})

//该门课程下的学生数据
const tableData = ref([])

//查询课程相关的学生成绩功能
//只能查跟该名老师有关的课程而不能查询其他课程
//返回的数据应该是学生列表和该门课程的ID
function handleSearch() {
  let username = sessionStorage.getItem("username");  
  let data = {
    CourseID: form.CourseID,
    CourseName: form.CourseName,
    username: username,
  }

  axios.post("http://localhost:8080/teacher/getStudentGrade", qs.stringify(data))
      .then((res) => {
        if (res.data.code === 200) {
            ElMessage("查询成功")
            tableData.value = res.data;
            courseID = res.data.courseID;
        } else {
          ElMessage.error(res.data.msg)
        }
      })
}

//录入单名学生的成绩
const EnterGrade = (index) =>{
    router.push({
    name:'teacherGradeDetail',
    query: {
      studentID: tableData.value[index].studentID,
      studentName: tableData.value[index].studentName,
      courseID: this.courseID,
    }
  })
}
</script>

<template>
 <el-form :model="form" label-width="auto" style="max-width: 300px">
    <h1>请选择要录入成绩的课程</h1><br><br>
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

<el-table :data="tableData" width="400px" max-height="200">
    <el-table-column fixed prop="studentName" label="学生名称" width="150" />
    <el-table-column prop="studentID" label="学生学号" width="120" />
    <el-table-column prop="gradeState" label="成绩录入状态" width="120" />
    <el-table-column fixed="right" label="操作" width="400">
      <template #default="scope">
        <el-button type="primary" @click="EnterGrade(scope.$index)">录入</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<style scoped>

</style>