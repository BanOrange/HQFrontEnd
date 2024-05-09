<script setup>
import {ref, reactive} from 'vue'
import axios from 'axios';
import qs from 'querystring';
import {ElMessage} from 'element-plus';
import {onMounted} from 'vue';
import { useRouter,useRoute } from 'vue-router';

let router = useRouter();
//用来装学生的信息
const tableData = ref([])

//用来装搜索条件
const searchForm = reactive({
  name: '',
  id: '',
})

//找到所有的学生信息
function findAllStudent(){
  axios.get('http://localhost:8080/executor/findallstudent')
  .then((res)=>{
    tableData.value = res.data;
  })
}

//挂载,但是为了方便开发，先注释掉
onMounted(() =>{
//   findAllStudent();
})

//查询学生功能，将符合条件的学生列出来
//与执行人逻辑相同，不需要更换请求域名
function handleSearch() {
  let data = {
    id: searchForm.id,
    name: searchForm.name,
  }

  axios.post("http://localhost:8080/executor/searchStudent", qs.stringify(data))
      .then((res) => {
          tableData.value = res.data;
      })
}

//查看学生详细信息。跳转到另一个界面
const handleDetail = (index)=>{
  let studentID = tableData.value[index].studentID;
  router.push({
    path:'/manager/studentDetail',
    query:{
      id:id,
    }
  })
}
</script>

<template>
    <el-form :model="searchForm" label-width="auto" style="max-width: 300px">
    <h2>学生查询</h2><br>
    <el-form-item label="学生学号：">
      <el-input v-model="searchForm.id"/>
    </el-form-item>
    <el-form-item label="学生姓名：">
      <el-input v-model="searchForm.name"/>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="handleSearch">查询</el-button>
    </el-form-item>
  </el-form>
  <br><br>
  <el-button link type="primary" size="large" @click="handleAdd">添加学生信息</el-button>
  <br>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column fixed prop="id" label="学号" width="150" />
    <el-table-column prop="name" label="姓名" width="120" />
    <el-table-column prop="company" label="隶属公司" width="120" />
    <el-table-column prop="position" label="工作岗位" width="120" />
    <el-table-column fixed="right" label="操作" width="120">
      <template #default="scope">
        <!-- <el-link type="primary">修改</el-link> -->
        <el-button link type="primary" size="large" @click="handleDetail(scope.$index)">详情</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<style scoped>

</style>