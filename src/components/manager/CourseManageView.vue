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
  name: '',
  id: '',
})

//找到所有的课程信息
//由于和执行人用的是同一套逻辑，所以请求域名不需要变化
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


//搜索课程
function handleSearch(){
  let data = {
    id:searchForm.id,
    name:searchForm.name,
  }
  axios.get('http://localhost:8080/executor/findcourse',qs.stringify(data))
  .then((res)=>{
    tableData.value = res.data;
  })

}

//查看课程详细信息。跳转到另一个界面
const handleDetail = (index)=>{
  let id = tableData.value[index].id;
  router.push({
    path:'/manager/courseDetail',
    query:{
      id:id,
    }
  })
}
</script>

<template>
   <el-form :model="searchForm" label-width="auto" style="max-width: 300px">
    <h1>课程查询</h1><br><br>
    <el-form-item label="课程编号：">
      <el-input v-model="searchForm.id"/>
    </el-form-item>
    <el-form-item label="课程名称：">
      <el-input v-model="searchForm.name"/>
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
        <el-button link type="primary" size="large" @click="handleDetail(scope.$index)">详情</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<style scoped>

</style>