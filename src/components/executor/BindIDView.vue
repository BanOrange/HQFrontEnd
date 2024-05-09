<script setup>
import {reactive} from 'vue'
import {ElMessage, ElMessageBox} from 'element-plus';
import {useRouter, useRoute} from 'vue-router';
import {onMounted} from 'vue';
import axios from 'axios'
import qs from 'querystring';

let router = useRouter();
const form = reactive({
  name: '',
  id: '',
})

function back() {
  router.replace("/executor")
}


//向后端返回绑定身份的请求，希望返回是否绑定成功
function onSubmit() {
  let username = sessionStorage.getItem("username");
  let data = {
    username: username,
    name:form.name,
    id:form.id,
  }

  axios.post("http://localhost:8080/executor/bindid", qs.stringify(data))
      .then((res) => {
        if (res.data.code === 200) {
          ElMessage("绑定成功！")
          router.replace("/executor")
        } else {
          ElMessage.error(res.data.msg);
        }
      })
}
</script>

<template>
  <h2>个人信息</h2>
  <el-text>如果不填入正确信息，那么其他功能将不能正确运行</el-text>
  <el-text>只能绑定一次，请务必保证信息与预留在公司的信息相同</el-text>
  <br><br>
  <el-form :model="form" label-width="auto" style="max-width: 300px">
    <el-form-item label="员工姓名：">
      <el-input v-model="form.name"/>
    </el-form-item>
    <el-form-item label="员工工号：">
      <el-input v-model="form.id"/>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="back">返回</el-button>
      <el-button type="primary" @click="onSubmit">绑定</el-button>
    </el-form-item>
  </el-form>
</template>

<style scoped></style>