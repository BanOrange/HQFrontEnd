<script setup>
import {ref, reactive} from 'vue'
import axios from 'axios';
import qs from 'querystring';
import {ElMessage} from 'element-plus';
import {onMounted} from 'vue';
import { useRouter,useRoute } from 'vue-router';

let router = useRouter();
//用来装执行人的信息
const tableData = ref([])

//用来装搜索条件
const searchForm = reactive({
  name: '',
  id: '',
})

//找到所有的执行人信息
function findAllExecutor(){
  axios.get('http://localhost:8080/manager/findAllExecutor')
      .then((res)=>{
        tableData.value = res.data;
      })
}

function handleSearch() {
  let data = {
    executorID: searchForm.executorID,
    executorName: searchForm.executorName,
  }

  axios.post("http://localhost:8080/manager/searchExecutor", qs.stringify(data))
      .then((res) => {
        tableData.value = res.data;
      })
}

onMounted(async () => {
  const res = await axios.get('http://localhost:8080/manager/executorWorkStatus')
  tableData.value = res.data
})
</script>

<style scoped>
</style>



<template>
  <el-form :model="searchForm" label-width="auto" style="max-width: 300px">
    <h2>执行人查询</h2><br>
    <el-form-item label="执行人工号：">
      <el-input v-model="searchForm.id"/>
    </el-form-item>
    <el-form-item label="执行人姓名：">
      <el-input v-model="searchForm.name"/>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="handleSearch">查询</el-button>
    </el-form-item>
  </el-form>
  <br><br>
  <div>
    <h2>执行人工作状态</h2>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="executorName" label="执行人姓名" width="120" />
      <el-table-column prop="courseName" label="课程名称" width="120" />
      <el-table-column prop="courseStatus" label="课程状态" width="120" />
    </el-table>
  </div>
</template>