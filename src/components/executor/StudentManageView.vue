<script setup>
import {ref, reactive} from 'vue'
import axios from 'axios';
import qs from 'querystring';
import {ElMessage} from 'element-plus';
import {onMounted} from 'vue';
import { useRouter,useRoute } from 'vue-router';

let router = useRouter();

const tableData = ref([])


const searchForm = reactive({
  name: '',
  id: '',
})


function findAllStudent(){
  axios.get('http://localhost:8080/executor/findallstudent')
      .then((res)=>{
        tableData.value = res.data;
      })
}


onMounted(() =>{
  findAllStudent();
})


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
        ElMessage({
          type: 'success',
          message: '删除成功',
        })
        let studentID = tableData.value[index].studentID
        console.log(sid);
        axios.delete(`http://localhost:8080/executor/studentDelete/${studentID}`)
            .then((res)=>{
              findAllStudent();
            })
      })
      .catch(() => {

      })
}


const handleModify = (index)=>{
  let id = tableData.value[index].id;
  router.push({
    path:'/executor/StudentModifyView',
    query:{
      id:id,
    }
  })
}

function handleAdd(){
  router.replace("/executor/StudentAddView");
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
    <el-table-column prop="level" label="学生年级" width="120" />
    <el-table-column prop="email" label="电子邮件" width="120" />
    <el-table-column prop="tele" label="电话号码" width="120" />
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