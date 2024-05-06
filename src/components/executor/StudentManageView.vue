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
  studentName: '',
  studentID: '',
})

//向后端发送得到所有学生信息的请求，返回对应数据，参考下面的el-table
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

//查向后端发送查询学生的请求，返回查询成功与否和对应的学生数据，要求查看下面的el-table
function handleSearch() {
  let data = {
    studentID: searchForm.studentID,
    studentName: searchForm.studentName,
  }

  axios.post("http://localhost:8080/executor/searchStudent", qs.stringify(data))
      .then((res) => {
        if (res.data.code === 200) {
          ElMessage("查询成功")
          tableData.value = res.data;

        } else {
          ElMessage.error(res.data.msg)
        }
      })
}

//向后端发送删除学生的请求，返回删除成功与否
//删除学生，在后端应该判断一下是否已经有账号关联到了该条信息
//如果有的话，应该避免删除，避免让对应的用户不能使用
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

//修改学生信息。跳转到另一个界面
const handleModify = (index)=>{
  let studentID = tableData.value[index].studentID;
  router.push({
    path:'/executor/studentModify',
    query:{
      studentID:studentID,
    }
  })
}

function handleAdd(){
    router.replace("/executor/studentAdd");
}
</script>

<template>
    <el-form :model="searchForm" label-width="auto" style="max-width: 300px">
    <h2>学生查询</h2><br>
    <el-form-item label="学生学号：">
      <el-input v-model="searchForm.studentID"/>
    </el-form-item>
    <el-form-item label="学生姓名：">
      <el-input v-model="searchForm.studentName"/>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="handleSearch">查询</el-button>
    </el-form-item>
  </el-form>
  <br><br>
  <el-button link type="primary" size="large" @click="handleAdd">添加学生信息</el-button>
  <br>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column fixed prop="studentID" label="学号" width="150" />
    <el-table-column prop="studentName" label="姓名" width="120" />
    <el-table-column prop="companyName" label="隶属公司" width="120" />
    <el-table-column prop="jobPosition" label="工作岗位" width="120" />
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