<script setup>
import {ref, reactive} from 'vue'
import axios from 'axios';
import qs from 'querystring';
import {ElMessage} from 'element-plus';
import {onMounted} from 'vue';
import router from '@/router';

const tableData = ref([])
const form = reactive({
  eva_score: '',
  eva_content: '',
})
onMounted(() => {
  getAllCourse();
})

function getAllCourse() {
  axios.get('http://localhost:8080/student/getAllCourse')
      .then((res) => {
        tableData.value = res.data;
      })
}

function onSubmit() {
  let data = {
    id: form.id,
    rank: form.rank,
    evaluate: form.evaluate,
  }
  axios.post("http://localhost:8080/student/courseEvaluate", qs.stringify(data))
      .then((res) => {
        if (res.data.code === 200) {
          ElMessage("评价成功")
          router.replace("/student")
        } else {
          ElMessage.error(res.data.msg)
        }
      })
}

</script>

<template>
  <el-form :model="form" label-width="auto" style="max-width: 300px">
    <h1>填写课程评价</h1><br><br>
    <el-text>选择你要评价的课程</el-text>
    <br><br>
    <el-select
        v-model="form.CourseID"
        placeholder="Select"
        size="large"
        style="width: 240px"
    >
      <el-option
          v-for="item in tableData"
          :key="item.id"
          :label="item.name"
          :value="item.id"
      >
      </el-option>
    </el-select>
    <br><br>
    <el-text>课程评分</el-text>
    <br><br>
    <el-input placeholder/>
    <br><br>
    <el-text>课程评价</el-text>
    <br><br>
    <el-input
        v-model="form.eva_content"
        style="width:400px"
        :autosize="{ minRows: 10, maxRows: 100 }"
        type="textarea"
        placeholder="请输入课程评价"
    />
  </el-form>
  <br>
  <el-button type="primary" @click="onSubmit">提交</el-button>
</template>

<style scoped>

</style>