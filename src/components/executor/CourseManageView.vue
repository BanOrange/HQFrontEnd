<script setup>
import {ref, reactive} from 'vue'
import axios from 'axios';
import qs from 'querystring';
import {ElMessage} from 'element-plus';
import {onMounted} from 'vue';
import { useRouter,useRoute } from 'vue-router';

let router = useRouter();

//用来装课程的信息
const tableData = ref([])

//用来装搜索条件
const searchForm = reactive({
  courseName: '',
  courseID: '',
})

//向后端发送得到所有课程信息的请求，需要返回tableData中对应的数据，下文el-table中列明了数据
function findAllCourse(){
  axios.get('http://localhost:8080/executor/findallcourse')
  .then((res)=>{
    tableData.value = res.data;
  })
}

//挂载,但是为了方便开发，先注释掉
onMounted(() =>{
//   findAllCourse();
})


//向后端发送删除课程的请求，在后端应该判断一下这门课程的状态
//如果正在上课或者报名阶段的话，应该避免删除，避免让对应的用户不能使用
//希望返回是否删除成功
const handleDel = (index) => {
  ElMessageBox.confirm(
    '你确定删除吗?',
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
      let courseID = tableData.value[index].courseID
      console.log(courseID);
      axios.delete(`http://localhost:8080/executor/courseDelete/${courseID}`)
      .then((res)=>{
        findAllCourse();
      })
    })
    .catch(() => {
     
    })
}

//修改课程信息。跳转到另一个界面
const handleModify = (index)=>{
  let courseID = tableData.value[index].courseID;
  router.push({
    path:'/executor/courseModify',
    query:{
      courseID:courseID,
    }
  })
}

//向后端发送寻找课程的请求，希望返回对应课程的信息，数据要求同上
function handleSearch(){
  let data = {
    courseID:searchForm.courseID,
    courseNAme:searchForm.courseName,
  }
  axios.get('http://localhost:8080/executor/findcourse',qs.stringify(data))
  .then((res)=>{
    tableData.value = res.data;
  })

}
//添加课程，跳转到添加界面
function handleAdd(){
    router.replace("/executor/courseAdd");
}
</script>

<template>
   <el-form :model="searchForm" label-width="auto" style="max-width: 300px">
    <h1>课程查询</h1><br><br>
    <el-form-item label="课程编号：">
      <el-input v-model="searchForm.courseID"/>
    </el-form-item>
    <el-form-item label="课程名称：">
      <el-input v-model="searchForm.courseName"/>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="handleSearch">查询</el-button>
    </el-form-item>
  </el-form>
  <br><br>
  <h1>课程信息总览</h1>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column fixed prop="courseID" label="课程编号" width="150"/>
    <el-table-column prop="courseName" label="课程名称" width="120"/>
    <el-table-column prop="teacherName" label="讲师名称" width="120"/>
    <el-table-column prop="coursePrice" label="课程费用(￥)" width="150"/>
    <el-table-column fixed="right" label="操作" width="120">
      <template #default="scope">
        <!-- <el-link type="primary">修改</el-link> -->
        <el-button link type="primary" size="large" @click="handleModify(scope.$index)">修改</el-button>
        <el-button link type="primary" size="large" @click="handleDel(scope.$index)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-button link type="primary" size="large" @click="handleAdd">添加课程</el-button>
</template>

<style scoped>

</style>