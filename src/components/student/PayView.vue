<script setup>
import {reactive} from 'vue'
import {ElMessage, ElMessageBox} from 'element-plus';
import {useRouter, useRoute} from 'vue-router';
import {onMounted} from 'vue';
import axios from 'axios'
import qs from 'querystring';

let router = useRouter();
const form = reactive({
  course: '',
  money: '',
})

function back() {
  router.replace("/student")
}

function onSubmit() {
  let data = {
    course: form.course,
    money: form.money,
  }
  axios.post("http://localhost:8080/student/pay", qs.stringify(data))
      .then((res) => {
        if (res.data.code === 200) {
          ElMessage("缴费成功！")
          router.replace("/student")
        } else {
          ElMessage.error(res.data.msg);
        }
      })
}


</script>

<template>
  <div>
    <h2>培训费用缴纳</h2>
    <el-form :model="form" label-width="auto" style="max-width: 300px">
      <el-form-item label="课程名称" prop="course">
        <el-input v-model="form.course"></el-input>
      </el-form-item>
      <el-form-item label="支付金额" prop="money">
        <el-input v-model="form.money"></el-input>
      </el-form-item>
      <el-form-item label="支付方式：">
        <el-select v-model="form.method" placeholder="请选择支付方式">
          <el-option label="支付宝" value="alipay"></el-option>
          <el-option label="微信" value="wechat"></el-option>
          <el-option label="银行卡" value="bank"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">支付</el-button>
        <el-button @click="back">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped>

</style>