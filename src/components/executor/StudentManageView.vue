<script setup>
import {ref, reactive} from 'vue'
import axios from 'axios';
import qs from 'querystring';
import {ElMessage,ElMessageBox} from 'element-plus';
import {onMounted} from 'vue';
import { useRouter,useRoute } from 'vue-router';

let router = useRouter();

const tableData = ref([])


const searchForm = reactive({
  stu_name: '',
  stu_id: '',
})


function findAllStudent(){

  axios.get('http://localhost:8080/executor/findAllStudent')
      .then((res)=>{
        tableData.value = res.data;
        console.log(res.data)
      })
}


onMounted(() =>{
  findAllStudent();
})


function handleSearch() {
  let data = {
    stu_id: searchForm.stu_id,
    stu_name: searchForm.stu_name,
  }

  axios.post("http://localhost:8080/executor/searchStudent", qs.stringify(data))
      .then((res) => {
        tableData.value = res.data;
      })
}


const handleDel = (index) => {
  ElMessageBox.confirm(
      '你确定删除吗?删除会导致对应账户无法正常使用',
      '警告',
      {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning',
      }
  )
      .then(() => {
        let student_id = tableData.value[index].stu_id
        console.log(student_id);
        axios.delete(`http://localhost:8080/executor/studentDelete/${student_id}`)
            .then((res)=>{
              findAllStudent();
              // ElMessage(res.data.msg)
            })
      })
      .catch(() => {
        // ElMessage(res.data.msg)
      })
}


const handleModify = (index)=>{
  let stu_id = tableData.value[index].stu_id;
  console.log(stu_id);
  router.push({
    path:'/executor/studentModify',
    query:{
      stu_id:stu_id,
    }
  })
}

function handleAdd(){
  router.replace("/executor/StudentAdd");
}
</script>

<template>
  <el-form :model="searchForm" label-width="auto" style="max-width: 300px">
    <h2>学生查询</h2><br>
    <el-form-item label="学生学号：">
      <el-input v-model="searchForm.stu_id"/>
    </el-form-item>
    <el-form-item label="学生姓名：">
      <el-input v-model="searchForm.stu_name"/>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="handleSearch">查询</el-button>
    </el-form-item>
  </el-form>
  <br><br>
  <el-button link type="primary" size="large" @click="handleAdd">添加学生信息</el-button>
  <br>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column fixed prop="stu_id" label="学号" width="100" />
    <el-table-column prop="stu_name" label="姓名" width="120" />
    <el-table-column prop="stu_tele" label="电话号码" width="120" />
    <el-table-column prop="stu_company" label="隶属公司" width="100" />
    <el-table-column prop="stu_position" label="工作岗位" width="100" />
    <el-table-column prop="stu_email" label="电子邮件" width="100" />
    <el-table-column prop="stu_level" label="技术水平" width="100" />
    <el-table-column fixed="right" label="操作" width="120">
      <template #default="scope">
        <!-- <el-link type="primary">修改</el-link> -->
        <el-button link type="primary" size="large" @click="handleModify(scope.$index)">修改</el-button>
        <el-button link type="primary" size="large" @click="handleDel(scope.$index)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<style scoped>

</style>