<script setup>
import {ref, reactive} from 'vue'
import axios from 'axios';
import qs from 'querystring';
import {ElMessage,ElMessageBox} from 'element-plus';
import {onMounted} from 'vue';
import { useRouter,useRoute } from 'vue-router';

let router = useRouter();

//用来装课程的信息
const tableData = ref([])

//用来装搜索条件
const searchForm = reactive({
  course_name: '',
  course_id: '',
})

//向后端发送寻找课程的请求，希望返回该执行人负责的课程信息
//此外需要返回讲师的名称而不是仅仅是讲师编号
function findAllCourse(){
  let username = sessionStorage.getItem("username");
  let data = {
    username: username,
  }
  console.log(username)
  axios.post("http://localhost:8080/executor/getAllCourse", qs.stringify(data))
    .then((res) => {
      console.log(res.data)
      tableData.value = res.data
    })
}

//挂载,但是为了方便开发，先注释掉
onMounted(() =>{
  findAllCourse();
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
      
      let course_id = tableData.value[index].course_id
      console.log(course_id);
      axios.delete(`http://localhost:8080/executor/courseDelete/${course_id}`)
      .then((res)=>{
        ElMessage(res.data.msg)
        findAllCourse();
      })
    })
    .catch(() => {
     
    })
}

//修改课程信息。跳转到另一个界面
const handleModify = (index)=>{
  let course_id = tableData.value[index].course_id;
  router.push({
    path:'/executor/courseModify',
    query:{
      course_id:course_id,
    }
  })
}

//向后端发送寻找课程的请求，希望返回对应课程的信息
//此外需要返回讲师的名称而不是讲师编号
function handleSearch(){
  let data = {
    course_id:searchForm.course_id,
    course_name:searchForm.course_name,
  }
  axios.get('http://localhost:8080/searchCourse',qs.stringify(data))
  .then((res)=>{
    tableData.value = res.data;
  })

}

//查看课程详细信息。跳转到另一个界面
const handleDetail = (index)=>{
  let course_id = tableData.value[index].course_id;
  router.push({
    path:'/manager/CourseDetailView',
    query:{
      course_id: course_id,
    }
  })
}

function handleAdd(){
  router.replace("/executor/courseAdd")
}
</script>

<template>
  <el-form :model="searchForm" label-width="auto" style="max-width: 300px">
    <h1>课程查询</h1><br><br>
    <el-form-item label="课程编号：">
      <el-input v-model="searchForm.course_id"/>
    </el-form-item>
    <el-form-item label="课程名称：">
      <el-input v-model="searchForm.course_name"/>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="handleSearch">查询</el-button>
    </el-form-item>
  </el-form>
  <br><br>
  <h1>课程信息总览</h1>
  <el-button link type="primary" size="large" @click="handleAdd">增加课程</el-button>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column fixed prop="course_id" label="课程编号" width="150"/>
    <el-table-column prop="course_name" label="课程名称" width="120"/>
    <el-table-column prop="course_teacher" label="讲师名称" width="120"/>
    <el-table-column prop="course_fee" label="课程费用(￥)" width="150"/>
    <el-table-column fixed="right" label="操作" width="120">
      <template #default="scope">
        <el-button link type="primary" size="large" @click="handleModify(scope.$index)">修改</el-button>
        <el-button link type="primary" size="large" @click="handleDel(scope.$index)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<style scoped>

</style>