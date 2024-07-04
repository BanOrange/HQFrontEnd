<script setup>
import {ref, reactive} from 'vue'
import axios from 'axios';
import qs from 'querystring';
import {ElMessage} from 'element-plus';
import {onMounted} from 'vue';
import router from "@/router/index.js";

const form = reactive({
  username: '',
  course_id: '',
  course_name: '',
  signin_state: '', //签到状态，0表示未签到，1表示以签到
  signin_ok: '', //工作人员是否发起签到，是为1否0
  signin_state1: '',
  signin_ok1: '',
})

const checkedCourses = ref([])

onMounted(() => {
  getAllCheck()
})

function getAllCheck() {
  let username = sessionStorage.getItem("username")
  let data = qs.stringify({
    username: username,
  });
  console.log(username);
  axios.post("http://localhost:8080/student/getAllCheck", data)
      .then((res) => {
        console.log(res.data);
        checkedCourses.value = res.data;
        for(var i=0;i<checkedCourses.value.length;i++){
          if(checkedCourses.value[i].signin_ok == 1){
            checkedCourses.value[i].signin_ok1 = "可以签到";
          }else{
            checkedCourses.value[i].signin_ok1 = "不可以签到";
          }
        }
        for(var i=0;i<checkedCourses.value.length;i++){
          if(checkedCourses.value[i].signin_state == 1){
            checkedCourses.value[i].signin_state1 = "已签到";
          }else{
            checkedCourses.value[i].signin_state1 = "未签到";
          }
        }
      })
      .catch((error) => {
        console.error(error);
      });

}



const addCheck=(index)=> {
  let username = sessionStorage.getItem("username")
  console.log(checkedCourses.value[index].signin_ok);
  console.log(checkedCourses.value[index].signin_state);
  if (checkedCourses.value[index].signin_ok === 0) {
    ElMessage.error("签到未开始")
    return;
  }
  if(checkedCourses.value[index].signin_state === 1){
    ElMessage.error("已经签到")
    return;
  }
  let data = {
    username: username,
    course_id: checkedCourses.value[index].course_id,
  }
  console.log(data);



  axios.post("http://localhost:8080/student/addCheck", qs.stringify(data))
      .then((res) => {
        console.log(res.data);
        if (res.data.code === 200) {
          ElMessage("签到成功")
          getAllCheck()   //更新签到列表
        } else {
          ElMessage.error(res.data.msg)
        }
      })
}


</script>



<template>
  <h1>学生课程签到</h1>
  <el-form :model="form">
    <el-form-item label="学生用户名">
      <el-input v-model="form.username" style="width:200px"></el-input>
    </el-form-item>
    <el-form-item label="课程编号">
      <el-input v-model="form.course_id" style="width:200px"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="getAllCheck">查询已签到课程</el-button>
    </el-form-item>
  </el-form>
  <h1>请选择您想签到的课程</h1>

  <el-table :data="checkedCourses" width="400px" max-height="200">
    <el-table-column fixed prop="course_id" label="课程ID" width="150"/>
    <el-table-column fixed prop="course_name" label="课程名称" width="150"/>
    <el-table-column fixed prop="signin_state1" label="是否已经签到" width="150"/>
    <el-table-column fixed prop="signin_ok1" label="是否开始签到" width="150"/>
    <el-table-column fixed="right" label="选择" width="200">
      <template #default="scope">
        <el-button type="primary" @click="addCheck(scope.$index)">签到</el-button>
      </template>
    </el-table-column>

  </el-table>
</template>

<style scoped>
</style>