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

const teacherData = reactive({})
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

const options = [
  {
    label: '未开课',
    value: '未开课',
  },
  {
    value: '报名中',
    label: '报名中',
  },
  {
    label: '授课中',
    value: '授课中',
  },
  {
    label: '阅卷中',
    value: '阅卷中',
  },
  {
    label: '评价中',
    value: '评价中',
  },
  {
    label: '已结束',
    value: '已结束',
  },
]


function back() {
    router.replace("/executor/studentManage")
}
//找到所有的讲师信息,用于给执行人选择讲师，复用了之前的接口
function findAllTeacher() {
    axios.get('http://localhost:8080/executor/findallteacher')
        .then((res) => {
            teacherData.value = res.data;
            console.log(res.data)
        })
}

//向后端发送课程ID获取对应课程，返回对应数据，注意其中需要给出的是老师名称
//复用了执行人寻找课程的接口
function getCourse() {
  let data = {
    course_id: course_id,
  }


  axios.post("http://localhost:8080/executor/getCourse", qs.stringify(data))
    .then((res) => {
      
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
      findAllTeacher();
})

//向后端发送修改课程信息的请求，返回是否修改成功
function onSubmit() {
    let start = course_start1.value + '-' + course_start2.value + '-' + course_start3.value;
    let end = course_end1.value + '-' + course_end2.value + '-' + course_end3.value;
    let data = {
        course_id: course_id1.value,
        course_name: course_name.value,
        course_start: start,
        course_end: end,
        course_fee: course_fee.value,
        course_teacher: course_teacher.value,
        course_info: course_info.value,
        course_state: course_state.value,
        course_place: course_place.value,
    }
    console.log(data);
    axios.post("http://localhost:8080/executor/courseModify", qs.stringify(data))
        .then((res) => {
          console.log(res.data)
            if (res.data.code === 200) {
                ElMessage("修改成功！")
                router.replace("/executor/courseManage")
            } else {
                ElMessage.error(res.data.msg);
            }
        })
}

function getNotice(){
  ElMessageBox.alert('您好，浩奇公司开设的一门名为《'+course_name.value+'》的课程即将开始。请您及时进入官网查询课程简介以获取上课具体时间和地点，祝您学有所成','课程即将开课通知')
}
</script>

<template>
    <h1>课程信息</h1>
    <el-text>课程编号：</el-text>
    <el-input disabled v-model="course_id1" style="width:200px" /><br><br>
    <el-text>课程名称：</el-text>
    <el-input v-model="course_name" style="width:200px" /><br><br>
    <el-text>课程开始时间：</el-text>
    <el-input v-model="course_start1" style="width:60px" />
    <el-text>年</el-text>
    <el-input v-model="course_start2" style="width:50px" />
    <el-text>月</el-text>
    <el-input v-model="course_start3" style="width:50px" />
    <el-text>日</el-text><br><br>
    <el-text>课程结束时间：</el-text>
    <el-input v-model="course_end1" style="width:60px" />
    <el-text>年</el-text>
    <el-input v-model="course_end2" style="width:50px" />
    <el-text>月</el-text>
    <el-input v-model="course_end3" style="width:50px" />
    <el-text>日</el-text><br><br>
    <el-text>课程费用：</el-text>
    <el-input v-model="course_fee" style="width: 100px" />
    <el-text>￥/人</el-text><br><br>
    <el-text>课程讲师：</el-text>
    <el-select v-model="course_teacher" placeholder="请选择讲师" style="width: 150px">
        <el-option v-for="item in teacherData.value" :label="item.teacher_name" :value="item.teacher_id" />
    </el-select><br><br>
    <el-text>上课地点：</el-text>
    <el-input v-model="course_place" style="width:200px" /><br><br>
    <el-text>课程简介：</el-text><br>
    <el-input v-model="course_info" style="width:400px" :autosize="{ minRows: 10, maxRows: 100 }" type="textarea"
        placeholder="请输入这门课的简介" /><br><br>
    <el-text>课程状态：</el-text>
    <el-select v-model="course_state" placeholder="请选择课程状态" style="width: 150px">
        <el-option v-for="item in options" :label="item.label" :value="item.value" />
    </el-select><br><br>

    <el-button type="primary" @click="back">返回</el-button>&nbsp;&nbsp;&nbsp;
    <el-button type="primary" @click="onSubmit">修改</el-button>
    <el-button type="primary" @click="getNotice">一键生成培训通知</el-button>

</template>

<style scoped></style>