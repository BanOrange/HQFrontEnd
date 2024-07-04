<script setup>
import { ref, reactive } from 'vue'
import axios from 'axios';
import qs from 'querystring';
import { ElIcon, ElMessage } from 'element-plus';
import { onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';

let route = useRoute();
let router = useRouter();
//路由传参传过来的ID，可能会出现问题建议检查一下

let course_name = route.query.course_name;
let course_id = route.query.course_id
const tableData = ref([])




//得到一门课程对应的学员成绩列表
function getCourseStudentForGrade() {
  let data = {
    course_name: course_name,
    course_id: course_id,
  }
  console.log(data)
  axios.post('http://localhost:8080/teacher/getCourseStudent', qs.stringify(data))
    .then((res) => {
      console.log(res.data)
      
      tableData.value = res.data
    });
}


onMounted(() => {
  getCourseStudentForGrade()
})


//进入单个学生的成绩录入
const EnterGrade = (index) => {
    router.push({
      name: 'teacherStudentGradeDetail',
      query: {
        stu_id: tableData.value[index].stu_id,
        stu_name: tableData.value[index].stu_name,
        course_id: course_id,
      }
    })
}


// //返回到刚才的界面
// function back() {
//   router.replace("teacher/enterGrade");
// }
</script>

<template>
  <!-- <h2>成绩信息</h2>
<el-form :inline="true" :model="gradeForm" label-width="auto" style="max-width: 700px">
    <el-form-item   label="课程成绩：">
      <el-input v-model="gradeForm.examgrade"/>
    </el-form-item>
    <el-form-item   label="教师评语：">
      <el-input v-model="gradeForm.teacher_evaluate"/>
    </el-form-item>
</el-form> -->

  <el-table :data="tableData" width="400px" max-height="200">
    <el-table-column fixed prop="stu_name" label="学员名称" width="150" />
    <el-table-column prop="stu_id" label="学员编号" width="150" />
    <el-table-column prop="stu_score" label="成绩" width="100" />
    <el-table-column fixed="right" label="操作" width="200">
      <template #default="scope">
        <el-button type="primary" @click="EnterGrade(scope.$index)">录入成绩</el-button>
      </template>
    </el-table-column>
  </el-table>

  <!-- <el-button type="primary" size="large" @click="back()">返回</el-button> -->


</template>

<style scoped></style>