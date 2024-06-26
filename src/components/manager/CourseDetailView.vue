<script setup>
import { reactive, ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus';
import { useRouter, useRoute } from 'vue-router';
import { onMounted } from 'vue';
import axios from 'axios'
import qs from 'querystring';

let router = useRouter();
let route = useRoute();
let course_id = route.query.course_id;
//课程信息
let course_id1 = ref('');
let course_name = ref('');
let course_start1 = ref('');
let course_start2 = ref('');
let course_start3 = ref('');
let course_end1 = ref('');
let course_end2 = ref('');
let course_end3 = ref('');
let course_fee = ref('');
let course_teacher = ref('');
let course_info = ref('');
let course_state = ref('');
let course_place = ref('');

course_id1.value = course_id;


function back() {
    router.replace("/manager/searchCourse")
}


//向后端发送课程ID获取对应课程，返回对应数据，注意其中需要给出的是老师名称
//复用了执行人寻找课程的接口
function getCourse() {
  let data = {
    course_id: course_id,
  }

  axios.post("http://localhost:8080/executor/getCourse", qs.stringify(data))
    .then((res) => {
      console.log(res.data);
      course_id1.value = res.data.course_id
      course_name.value = res.data.course_name

      var start = res.data.course_start.split("-");
      course_start1.value = start[0]
      course_start2.value = start[1]
      course_start3.value = start[2]

      var end = res.data.course_end.split("-");
      course_end1.value = end[0]
      course_end2.value = end[1]
      course_end3.value = end[2]

      course_fee.value = res.data.course_fee
      course_teacher.value = res.data.course_teacher
      course_info.value = res.data.course_info
      course_state.value = res.data.course_state
      course_place.value = res.data.course_place
    })

}

//由于这里需要一开始就挂载，但是还没有和后端发生信息交互,暂时注释方便开发
onMounted(() => {
      getCourse();
})

</script>

<template>
<<<<<<< HEAD
  <h2>课程基本信息</h2>
  <el-form :inline="true" :model="form" label-width="auto" style="max-width: 700px">
    <el-form-item label="课程编号：">
      <el-input disabled v-model="form.id" />
    </el-form-item>
    <el-form-item label="课程名称：">
      <el-input disabled v-model="form.name" />
    </el-form-item>
    <el-form-item label="上课时间：">
      <el-input disabled v-model="form.start" style="width:200px" />
      <el-text>至</el-text>
      <el-input disabled v-model="form.end" style="width:200px" />
    </el-form-item>
    <el-form-item label="课程费用：">
      <el-input disabled v-model="form.fee" style="width:200px" />
      <el-text>￥/人</el-text>
    </el-form-item>
  </el-form><br>
  <h2>课程详细信息</h2>
  <el-form :model="form1" label-width="auto" style="max-width: 300px">
    <el-form-item label="主讲教师：">
      <el-input disabled v-model="form1.teacher" />
    </el-form-item>
    <el-form-item label="课程简介：">
      <el-input disabled v-model="form1.info" />
    </el-form-item>
    <el-form-item label="上课地点：">
      <el-input disabled v-model="form1.place" />
    </el-form-item>
    <el-form-item label="课程状态：">
      <el-input disabled v-model="form1.state" />
    </el-form-item>
  </el-form>

  <el-button type="primary" @click="back">返回</el-button>
=======
    <h1>课程信息</h1>
    <el-text>课程编号：</el-text>
    <el-input disabled v-model="course_id1" style="width:200px" /><br><br>
    <el-text>课程名称：</el-text>
    <el-input disabled v-model="course_name" style="width:200px" /><br><br>
    <el-text>课程开始时间：</el-text>
    <el-input disabled v-model="course_start1" style="width:60px" />
    <el-text>年</el-text>
    <el-input disabled v-model="course_start2" style="width:50px" />
    <el-text>月</el-text>
    <el-input disabled v-model="course_start3" style="width:50px" />
    <el-text>日</el-text><br><br>
    <el-text>课程结束时间：</el-text>
    <el-input disabled v-model="course_end1" style="width:60px" />
    <el-text>年</el-text>
    <el-input disabled v-model="course_end2" style="width:50px" />
    <el-text>月</el-text>
    <el-input disabled v-model="course_end3" style="width:50px" />
    <el-text>日</el-text><br><br>
    <el-text>课程费用:</el-text>
    <el-input disabled v-model="course_fee" style="width: 100px" />
    <el-text>￥/人</el-text><br><br>
    <el-text>课程讲师：</el-text>
    <el-input disabled v-model="course_teacher" style="width: 100px" /><br><br>
    <el-text>上课地点：</el-text>
    <el-input disabled v-model="course_place" style="width:200px" /><br><br>
    <el-text>课程简介：</el-text><br>
    <el-input disabled v-model="course_info" style="width:500px" :autosize="{ minRows: 10, maxRows: 100 }" type="textarea"
     /><br><br>
    <el-text>课程状态：</el-text>
    <el-input disabled v-model="course_state" style="width: 100px" />
    <br><br>

    <el-button type="primary" size="large" @click="back">返回</el-button>
>>>>>>> dev_qjk
</template>

<style scoped></style>