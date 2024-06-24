<script setup>
import { reactive } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus';
import { useRouter, useRoute } from 'vue-router';
import { onMounted } from 'vue';
import axios from 'axios'
import qs from 'querystring';

let router = useRouter();
let route = useRoute();

let id = route.query.id;

//存储执行人的核心信息，和别人不会重复的信息
//如id和电话号等
const form = reactive({
  id: '',
  name: '',
})

function back() {
  router.replace("/manager/executorManage")
}

//根据传过来的ID信息得到整个执行人信息
//逻辑相同，请求域名不需要更改
function getExecutor() {
  let data = {
    executorID: executorID,
  }

  axios.post("http://localhost:8080/executor/getExecutor", qs.stringify(data))
      .then((res) => {
        form.id = res.data.id;
        form.name = res.data.name;
      })

}

//由于这里需要一开始就挂载，但是还没有和后端发生信息交互,暂时注释方便开发
onMounted(() => {
  //   getExecutor();
})

</script>

<template>
  <h2>执行人基本信息</h2>
  <br><br>
  <el-form :model="form" label-width="auto" style="max-width: 300px">
    <el-form-item label="执行人工号：">
      <el-input disabled v-model="form.id" />
    </el-form-item>
    <el-form-item label="姓名：">
      <el-input disabled v-model="form.name" />
    </el-form-item>
  </el-form>
  <br>
  <el-button type="primary" @click="back">返回</el-button>
</template>

<style scoped></style>