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

//装学生的基本信息
const form = reactive({
  stu_id: stu_id,
  stu_name: stu_name,
})

//存储成绩，注意在学生查询成绩中只需要给出平均成绩grade即可
// const gradeForm = reactive({
//     stu_score:"",
//     expergrade:"",
//     examgrade:"",
//     homegrade:"",
//     teacher_evaluate:"",
// })

// //如果该名学生已经有成绩，则将成绩显示出来
// function getGrade(){
//     let data={
//         stu_id: stu_id,
//         course_id: course_id,
//     }

//     axios.post('http://localhost:8080/teacher/getGrade', qs.stringify(data))
//       .then((res) => {
//           gradeForm.stu_score = res.data.stu_score;
//           gradeForm.examgrade = res.data.examgrade;
//           gradeForm.expergrade = res.data.expergrade;
//           gradeForm.teacher_evaluate = res.data.teacher_evaluate;
//       });
// }
//由于还没有和后端建立联系，所以这里会报错
//必须在一开始就读取成绩显示出来


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

// //提交成绩
// function onSubmit(){
//     let data={
//         stu_score: gradeForm.stu_score,
//         expergrade: gradeForm.expergrade,
//         examgrade: gradeForm.examgrade,
//         homegrade: gradeForm.homegrade,
//         teacher_evaluate: gradeForm.teacher_evaluate,
//         stu_id: this.stu_id,
//         course_id: this.course_id,
//     }

//     axios.post('http://localhost:8080/teacher/submitGrade', qs.stringify(data))
//       .then((res) => {
//         if (res.data.code === 200) {
//           ElMessage(res.data.msg)
//         } else {
//           ElMessage(res.data.msg)
//         }
//       });
// }

//返回到刚才的界面
function back() {
  router.replace("teacher/EnterCourseGradeView");
}
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
    <el-table-column prop="stu_score" label="成绩" width="150" />
    <el-table-column prop="grade_state" label="录入状态" width="150" />
    <el-table-column fixed="right" label="操作" width="200">
      <template #default="scope">
        <el-button type="primary" @click="EnterGrade(scope.$index)">录入成绩</el-button>
      </template>
    </el-table-column>
  </el-table>

  <el-button type="primary" size="large" @click="back()">返回</el-button>


</template>

<style scoped></style>