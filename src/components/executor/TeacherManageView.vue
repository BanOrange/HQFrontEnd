<script setup>
import {ref, reactive} from 'vue'
import axios from 'axios';
import qs from 'querystring';
import {ElMessage,ElMessageBox} from 'element-plus';
import {onMounted} from 'vue';
import { useRouter,useRoute } from 'vue-router';

let router = useRouter();
//用来装讲师的信息
const tableData = ref([])

//用来装搜索条件
const searchForm = reactive({
  teacher_name: '',
  teacher_id: '',
})

//找到所有的讲师信息
function findAllTeacher(){
  axios.get('http://localhost:8080/executor/findallteacher')
  .then((res)=>{
    tableData.value = res.data;
  })
}

//挂载,但是为了方便开发，先注释掉
onMounted(() =>{
  findAllTeacher();
})

//查询讲师功能，将符合条件的讲师列出来
function handleSearch() {
  let data = {
    teacher_id: searchForm.teacher_id,
    teacher_name: searchForm.teacher_name,
  }

  axios.post("http://localhost:8080/executor/searchTeacher", qs.stringify(data))
      .then((res) => {
        tableData.value = res.data;
      })
}

//删除讲师，在后端应该判断一下是否已经有还在上的课程与该名教师相关
//如果有的话，应该避免删除，避免影响课程进行
const handleDel = (index) => {
  ElMessageBox.confirm(
    '你确定删除吗?删除可能会导致系统的意外错误',
    '警告',
    {
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
      type: 'warning',
    }
  )
    .then(() => {
      let teacher_id = tableData.value[index].teacher_id;
      console.log(teacher_id)
      axios.delete(`http://localhost:8080/executor/teacherDelete/${teacher_id}`)
      .then((res)=>{
        ElMessage(res.data.msg)
        findAllTeacher();
      })
    })
    .catch((res) => {
      ElMessage.error(res.data.msg)
    })
}

//修改讲师信息。跳转到另一个界面
const handleModify = (index)=>{
  let teacher_id = tableData.value[index].teacher_id;
  router.push({
    path:'/executor/teacherModify',
    query:{
      teacher_id: teacher_id,
    }
  })
}

//查看讲师详细信息。跳转到另一个界面
const handleDetail = (index)=>{
  let teacher_id = tableData.value[index].teacher_id;
  router.push({
    path:'/executor/teacherDetail',
    query:{
      teacher_id: teacher_id,
    }
  })
}

function handleAdd(){
    router.replace("/executor/teacherAdd");
}
</script>

<template>
    <el-form :model="searchForm" label-width="auto" style="max-width: 300px">
    <h2>讲师查询</h2><br>
    <el-form-item label="讲师编号：">
      <el-input v-model="searchForm.teacher_id"/>
    </el-form-item>
    <el-form-item label="讲师姓名：">
      <el-input v-model="searchForm.teacher_name"/>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="handleSearch">查询</el-button>
    </el-form-item>
  </el-form>
  <br><br>
  <el-button link type="primary" size="large" @click="handleAdd">添加讲师信息</el-button>
  <br>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column fixed prop="teacher_id" label="讲师编号" width="150" />
    <el-table-column prop="teacher_name" label="姓名" width="120" />
    <el-table-column prop="teacher_field" label="擅长领域" width="120" />
    <el-table-column prop="teacher_tele" label="电话号码" width="150" />
    <el-table-column fixed="right" label="操作" width="200" >
      <template #default="scope">
        <el-button link type="primary" size="large" @click="handleDetail(scope.$index)">详情</el-button>
        <el-button link type="primary" size="large" @click="handleModify(scope.$index)">修改</el-button>
        <el-button link type="primary" size="large" @click="handleDel(scope.$index)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<style scoped>

</style>