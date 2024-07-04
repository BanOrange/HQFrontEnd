<script setup>
import {ref, reactive} from 'vue'
import axios from 'axios';
import qs from 'querystring';
import {ElMessage} from 'element-plus';
import {onMounted} from 'vue';
import { useRouter,useRoute } from 'vue-router';

let route = useRoute();
let router = useRouter();
//路由传参传过来的ID，可能会出现问题建议检查一下
let id = route.query.id;
//装申请的基本信息
const form = reactive({
  apply_id: '',
  company_name: '',
  apply_budget: '',
  apply_want: '',
  stu_num: '',
  company_tele: '',
})
function getApp(){
  let username = sessionStorage.getItem(username);
  let data
}




// //由于这里需要一开始就挂载，但是还没有和后端发生信息交互，所以会导致报名和返回用不了
// //是正常情况，需要后端先传过来给门课程的数据才行
// onMounted(() => {
//   getCourse();
// })

// //得到该申请的详细信息,需要在一开始就运行
// function getCourse(){
//   let data ={
//     id: id,
//   }

//   axios.post("http://localhost:8080/student/getOneCourse", qs.stringify(data))
//       .then((res) => {
//         form.company_name = res.data.company_name;
//         form.apply_budget = res.data.apply_budget;
//         form.apply_want = res.data.apply_want;
//         form.stu_num = res.data.stu_num;
//         form.company_tele = res.data.company_tele;
//       })
// }


//返回到总览界面
function back(){
  router.replace("/company/CourseView")
}


function addApp(){
  let username = sessionStorage.getItem("username");
  let data ={
    username: username,
    apply_budget: form.apply_budget,
    apply_want: form.apply_want,
    company_tele: form.company_tele,
    stu_num: form.stu_num,

  }
  console.log(data)
  axios.post("http://localhost:8080/company/addApp", qs.stringify(data))
      .then((res) => {
        console.log(res.data)
        if (res.data.code === 200) {
          ElMessage("提交成功，浩奇公司将会尽快联系您！")
        } else {
          ElMessage.error(res.data.msg)
        }
      })
}


</script>

<template>
  <h2>申请信息</h2>
  <h3>请谨慎填写，填写错误请联系浩奇公司客服</h3>
  <el-form :inline="true" :model="form" label-width="auto" style="max-width: 700px">
    <el-form-item   label="培训预算：">
      <el-input v-model="form.apply_budget" style="width:100px"/>
      <el-text>￥/人</el-text>
    </el-form-item><br>
    <el-form-item  label="培训期望：">
      <el-input
        v-model="form.apply_want"
        style="width:400px"
        :autosize="{ minRows: 10, maxRows: 100 }"
        type="textarea"
        placeholder="请输入您对课程名称及内容等的期望"
    />
    </el-form-item><br>
    <el-form-item  label="预估人数：">
      <el-input v-model="form.stu_num" style="width:100px"/>
      <el-text>人</el-text>
    </el-form-item><br>
    <el-form-item label="公司电话：">
      <el-input v-model="form.company_tele" style="width:200px"/>
    </el-form-item>
  </el-form><br>
  <el-button type="primary" @click="back">返回</el-button>
  <el-button type="primary" @click="addApp">提交申请</el-button>
</template>

<style scoped>

</style>