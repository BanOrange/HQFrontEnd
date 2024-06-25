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
let id = route.query.id;
let name = route.query.name;
let cid = route.query.cid;

//装学生的基本信息
const form = reactive({
  id: id,
  name: name,
})

//存储成绩，注意在学生查询成绩中只需要给出平均成绩grade即可
const gradeForm = reactive({
    grade:"",
    expergrade:"",
    examgrade:"",
    homegrade:"",
    comments:"",
})

//如果该名学生已经有成绩，则将成绩显示出来
function getGrade(){
    let data={
        id: id,
        cid: cid
    }

    axios.post('http://localhost:8080/teacher/getGrade', qs.stringify(data))
      .then((res) => {
          gradeForm.grade = res.data.grade;
          gradeForm.examgrade = res.dada.examgrade;
          gradeForm.expergrade = res.data.expergrade;
          gradeFrom.comments = res.data.comments;
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
        expergrade: gradeForm.expergrade,
        examgrade: gradeForm.examgrade,
        homegrade: gradeForm.homegrade,
        comments: gradeForm.comments,
        id: this.id,
        cid: this.cid,
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
    router.replace("teacher/EnterCourseGradeView");
}
</script>

<template>
<h2>学生基本信息</h2>
<el-form :inline="true" :model="form" label-width="auto" style="max-width: 700px">
    <el-form-item label="学生名称：">
      <el-input disabled v-model="form.name"/>
    </el-form-item>
    <el-form-item   label="学号：">
      <el-input disabled v-model="form.id"/>
    </el-form-item>
</el-form>
<br>
<h2>成绩信息</h2>
<el-form :inline="true" :model="gradeForm" label-width="auto" style="max-width: 700px">
    <el-form-item label="平均成绩：">
      <el-input v-model="gradeForm.grade"/>
    </el-form-item>
    <el-form-item   label="实验成绩：">
      <el-input v-model="gradeForm.expergrade"/>
    </el-form-item>
    <el-form-item   label="作业成绩：">
      <el-input v-model="gradeForm.homegrade"/>
    </el-form-item>
    <el-form-item   label="考试成绩：">
      <el-input v-model="gradeForm.examgrade"/>
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