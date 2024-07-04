<script setup>
import {ref, reactive} from 'vue'
import axios from 'axios';
import qs from 'querystring';
import {ElIcon, ElMessage} from 'element-plus';
import {onMounted} from 'vue';
import { useRouter,useRoute } from 'vue-router';

let route = useRoute();
let router = useRouter();

//路由传参传过来的ID
let course_id = route.query.course_id;
let course_name = route.query.course_name;

//对应课程下该公司的学员相关成绩
const tableData = ref([])


//需要后端返回这门课下该公司的所有员工的成绩和老师评语
function getGrade(){
  let username = sessionStorage.getItem("username")
  let data={
    username: username,
    course_id: course_id,
    course_name: course_name,
  }
  console.log("这是前端传输的数据：");
  console.log(data);

  axios.post('http://localhost:8080/company/getGrade', qs.stringify(data))
      .then((res) => {
        console.log(res.data)
        tableData.value = res.data;
      });
}


onMounted(() => {
  getGrade();
})


//返回到刚才的界面
function back(){
  router.replace("company/searchGrade");
}
</script>

<template>
    <h1>公司员工成绩</h1>
  <el-table :data="tableData" width="400px" max-height="200">
    <el-table-column fixed prop="stu_name" label="员工名称" width="150" />
    <el-table-column prop="stu_id" label="员工学号" width="120" />
    <el-table-column prop="stu_score" label="成绩" width="120" />
    <el-table-column prop="teacher_evaluate" label="老师评价" width="200" />
  </el-table>

  <el-button type="primary" size="large" @click="back()">返回</el-button>


</template>

<style scoped>

</style>