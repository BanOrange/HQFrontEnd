<script setup>
import {ref, reactive} from 'vue'
import axios from 'axios';
import qs from 'querystring';
import {ElIcon, ElMessage} from 'element-plus';
import {onMounted} from 'vue';
import { useRouter,useRoute } from 'vue-router';

let route = useRoute();
let router = useRouter();
//路由传参传过来的ID，可能会出现问题建议检查一下
let studentID = route.query.studentID;
let studentName = route.query.studentName;
let courseId = route.query.courseId;

//装学生的基本信息
const form = reactive({
  studentID: studentID,
  stuentName: studentName,
})

//存储成绩，注意在学生查询成绩中只需要给出平均成绩grade即可
const gradeForm = reactive({
    grade:"",
    experimentGrade:"",
    examGrade:"",
    homeworkGrade:"",
    comments:"",
})

//如果该名学生已经有成绩，则将成绩显示出来
function getGrade(){
    let data={
        studentID: studentID,
        courseID: courseID
    }

    axios.post('http://localhost:8080/teacher/getGrade', qs.stringify(data))
      .then((res) => {
        if (res.data.code === 200) {
          gradeForm.grade = res.data.grade;
          gradeForm.examGrade = res.dada.examGrade;
          gradeForm.experimentGrade = res.data.experimentGrade;
          gradeFrom.comments = res.data.comments;
        } else {
          ElMessage(res.data.msg)
        }
      });
}
//由于还没有和后端建立联系，所以这里会报错
//必须在一开始就读取成绩显示出来
onMounted(() => {
  getGrade();
})

//提交成绩
function onSubmit(){
    let data={
        grade: gradeForm.grade,
        experimentGrade: gradeForm.experimentGrade,
        examGrade: gradeForm.examGrade,
        homeworkGrade: gradeForm.homeworkGrade,
        comments: gradeForm.comments,
        studentID: this.studentID,
        courseID: this.courseID,
    }

    axios.post('http://localhost:8080/teacher/submitGrade', qs.stringify(data))
      .then((res) => {
        if (res.data.code === 200) {
          ElMessage(res.data.msg)
        } else {
          ElMessage(res.data.msg)
        }
      });
}

//返回到刚才的界面
function back(){
    router.replace("teacher/enterGrade");
}
</script>

<template>
<h2>学生基本信息</h2>
<el-form :inline="true" :model="form" label-width="auto" style="max-width: 700px">
    <el-form-item label="学生名称：">
      <el-input disabled v-model="form.studentName"/>
    </el-form-item>
    <el-form-item   label="学号：">
      <el-input disabled v-model="form.studentID"/>
    </el-form-item>
</el-form>
<br>
<h2>成绩信息</h2>
<el-form :inline="true" :model="gradeForm" label-width="auto" style="max-width: 700px">
    <el-form-item label="平均成绩：">
      <el-input v-model="gradeForm.grade"/>
    </el-form-item>
    <el-form-item   label="实验成绩：">
      <el-input v-model="gradeForm.experimentGrade"/>
    </el-form-item>
    <el-form-item   label="作业成绩：">
      <el-input v-model="gradeForm.homeworkGrade"/>
    </el-form-item>
    <el-form-item   label="考试成绩：">
      <el-input v-model="gradeForm.examGrade"/>
    </el-form-item>
    <el-form-item   label="教师评语：">
      <el-input v-model="gradeFrom.comments"/>
    </el-form-item>
</el-form>

<el-button type="primary" size="large" @click="back()">返回</el-button>
<el-button type="primary" size="large" @click="onSubmit()">提交成绩</el-button>


</template>

<style scoped>

</style>