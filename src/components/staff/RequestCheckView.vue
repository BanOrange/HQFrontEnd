<script setup>
import {ref, reactive} from 'vue'
import axios from 'axios';
import qs from 'querystring';
import {ElMessage} from 'element-plus';
import {onMounted} from 'vue';
import router from '@/router';

const studentList = reactive({})
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
  getAllCourse();
})

//得到所有课程
function getAllCourse() {
  axios.get('http://localhost:8080/getAllCourse')
      .then((res) => {
        tableData.value = res.data;
      })
}

//查询功能
function handleSearch() {
  let data = {
    id: form.id,
    name: form.name,
  }

  axios.post("http://localhost:8080/searchCourse", qs.stringify(data))
      .then((res) => {
          tableData.value = res.data;
      })
}


//发起签到
const getDetails = (index) => {
  router.push({
    path: 'staff/checkDetail',
    query: {
      id: tableData.value[index].id
    }
  })
}
</script>

<template>
  <el-form :model="form" label-width="auto" style="max-width: 300px">
    <h1>查询课程</h1><br><br>
    <el-form-item label="课程编号：">
      <el-input v-model="form.name"/>
    </el-form-item>
    <el-form-item label="课程名称：">
      <el-input v-model="form.id"/>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="handleSearch">查询</el-button>
    </el-form-item>
  </el-form>
  <br><br>
  <h1>请选择您想发起签到的课程</h1>
  <el-table :data="tableData" width="400px" max-height="200">
    <el-table-column fixed prop="id" label="课程编号" width="150"/>
    <el-table-column prop="name" label="课程名称" width="120"/>
    <el-table-column prop="Tteacher" label="讲师名称" width="120"/>
    <el-table-column prop="pay" label="课程费用(￥)" width="150"/>
    <el-table-column fixed="right" label="选择" width="200">
      <template v-slot="studentList">
        <el-button type="primary" @click="getDetails(scope.$index)">发起签到</el-button>
        
      </template>
    </el-table-column>
  </el-table>
  <br><br>
</template>

<style scoped>
</style>