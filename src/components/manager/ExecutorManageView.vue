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
  executorName: '',
  executorID: '',
})

//找到所有的执行人信息
function findAllExecutor(){
  axios.get('http://localhost:8080/manager/findAllExecutor')
  .then((res)=>{
    tableData.value = res.data;
  })
}

//挂载,但是为了方便开发，先注释掉
onMounted(() =>{
//   findAllExecutor();
})

//查询执行人功能，将符合条件的执行人列出来
function handleSearch() {
  let data = {
    executorID: searchForm.executorID,
    executorName: searchForm.executorName,
  }

  axios.post("http://localhost:8080/manager/searchExecutor", qs.stringify(data))
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
    <el-form :model="searchForm" label-width="auto" style="max-width: 300px">
    <h2>执行人查询</h2><br>
    <el-form-item label="执行人工号：">
      <el-input v-model="searchForm.executorID"/>
    </el-form-item>
    <el-form-item label="执行人姓名：">
      <el-input v-model="searchForm.executorName"/>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="handleSearch">查询</el-button>
    </el-form-item>
  </el-form>
  <br><br>

  <br>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column fixed prop="executorID" label="工号" width="150" />
    <el-table-column prop="executorName" label="姓名" width="120" />
    <el-table-column prop="executorSate" label="工作状态" width="120" />
  </el-table>
</template>

<style scoped>

</style>