<script setup>
import {ref, reactive} from 'vue'
import axios from 'axios';
import qs from 'querystring';
import {ElMessage} from 'element-plus';
import {onMounted} from 'vue';
import { useRouter,useRoute } from 'vue-router';

let router = useRouter();
//用来装讲师的信息
const tableData = ref([])

//用来装搜索条件
const searchForm = reactive({
  name: '',
  id: '',
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
//   findAllTeacher();
})

//查询讲师功能，将符合条件的讲师列出来
function handleSearch() {
  let data = {
    id: searchForm.id,
    name: searchForm.name,
  }

  axios.post("http://localhost:8080/executor/searchTeacher", qs.stringify(data))
      .then((res) => {
        if (res.data.code === 200) {
          ElMessage("查询成功")
          tableData.value = res.data;

        } else {
          ElMessage.error(res.data.msg)
        }
      })
}

//查看讲师详细信息。跳转到另一个界面
const handleDetail = (index)=>{
  let id = tableData.value[index].id;
  router.push({
    path:'/manager/teacherDetail',
    query:{
      id:id,
    }
  })
}
</script>

<template>
    <el-form :model="searchForm" label-width="auto" style="max-width: 300px">
    <h2>讲师查询</h2><br>
    <el-form-item label="讲师编号：">
      <el-input v-model="searchForm.id"/>
    </el-form-item>
    <el-form-item label="讲师姓名：">
      <el-input v-model="searchForm.name"/>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="handleSearch">查询</el-button>
    </el-form-item>
  </el-form>
  <br><br>
  <br>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column fixed prop="id" label="讲师编号" width="150" />
    <el-table-column prop="name" label="姓名" width="120" />
    <el-table-column prop="field" label="擅长领域" width="120" />
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