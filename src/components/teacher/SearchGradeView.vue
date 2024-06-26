<script setup>
import {ref, reactive} from 'vue'
import axios from 'axios';
import qs from 'querystring';
import {ElMessage} from 'element-plus';
import {onMounted} from 'vue';
import router from '@/router';



const tableData = ref([])
const form = reactive({
  name: '',
  id: '',
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


onMounted(() => {
  getAllGrade();
})

function getAllGrade() {
  let data = {
    id: form.id,
    name: form.name,
  }
  axios.post("http://localhost:8080/teacher/getAllGrade", qs.stringify(data))
      .then((res) => {
        tableData.value = res.data;
      })
}

function handleSearch() {
  let data = {
    id: form.id,
    name: form.name,
  }

  axios.post("http://localhost:8080/searchCourse", qs.stringify(data))
      .then((res) => {
        if (res.data.code === 200) {
          ElMessage("查询成功")
          tableData.value = res.data;

        } else {
          ElMessage.error(res.data.msg)
        }
      })
}

</script>


<template>
  <h1>教师成绩查询</h1>
  <el-form :model="form">
    <el-form-item label="课程编号">
      <el-input v-model="form.id"></el-input>
    </el-form-item>
    <el-form-item label="课程名称">
      <el-input v-model="form.name"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="handleSearch">查询</el-button>
    </el-form-item>
  </el-form>
  <el-table :data="tableData" width="400px" max-height="200">
    <el-table-column fixed prop="studentName" label="学员名称" width="150"/>
    <el-table-column prop="studentId" label="学员编号" width="120"/>
    <el-table-column prop="grade" label="成绩" width="120"/>
    <el-table-column prop="Credit" label="学分" width="120"/>
  </el-table>
</template>

<style scoped>

</style>