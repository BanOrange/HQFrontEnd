<script setup>
import { ref } from 'vue'
import axios from 'axios';
import qs from 'querystring';
import { ElMessage } from 'element-plus';
import { onMounted} from 'vue';


const tableData = ref([])
let checkList = [];
const Select = (index) => {
  if(checkList.includes(index)){
    checkList.splice(checkList.indexOf(index), 1);
  }else{
    checkList.push(index);
  }
  console.log(checkList);
}

onMounted(() =>{
  getAllCheck();
})

function getAllCheck(){
  axios.get('http://localhost:8080/student/getAllCheck')
  .then((res)=>{
    tableData.value = res.data;
  })
}

function check(){
  let idlist = [];
  for(let i=0;i<checkList.length;i++){
    idList.push(tableData.value[index].RequestID);
  }
  let data={
    idlist : idlist,
  }

  axios.post("http://localhost:8080/student/check",qs.stringify(data))
    .then((res) => {
        if(res.data.code == 200){
          ElMessage("签到成功")

        }else{
            ElMessage.error(res.data.msg)
        }
    })
}


</script>

<template>
    <el-table :data="tableData" width="400px" max-height="200">
    <el-table-column fixed prop="name" label="课程名称" width="150" />
    <el-table-column prop="time" label="请求时间" width="120" />
    <el-table-column prop="state" label="请求状态" width="120" />
    <el-table-column prop="id" label="请求编号" width="120" />
    <el-table-column fixed="right" label="选择" width="200">
      <template #default="scope">
        <el-checkbox size="large" @click="Select(scope.$index)" label="选择"/> 
      </template>
    </el-table-column>
  </el-table>
  <br><br>
  <el-button type="primary" @click="check">确认签到</el-button>
</template>

<style scoped>
</style>