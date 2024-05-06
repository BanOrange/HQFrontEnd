<script setup>
import { reactive } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus';
import { useRouter, useRoute } from 'vue-router';
import { onMounted } from 'vue';
import axios from 'axios'
import qs from 'querystring';

let router = useRouter();
let route = useRoute();
let courseID = route.query.courseID;

//装课程的基本信息
const form = reactive({
    courseID: '',
    courseName: '',
    courseStartTime: '',
    courseEndTime: '',
    coursePrice: '',
})

//用来装课程的详细信息
const form1 = reactive({
    teacher: '',
    courseInfo: '',
    courseState: '',
    courseLocation: '',
})

function back() {
    router.replace("/executor/studentManage")
}

//向后端发送课程ID获取对应课程，返回对应数据
function getCourse() {
    let data = {
        courseID: courseID,
    }

    axios.post("http://localhost:8080/executor/getCourse", qs.stringify(data))
        .then((res) => {
            form.courseID = res.data.courseID;
            form.courseName = res.data.courseName;
            form.courseStartTime = res.data.courseStartTime;
            form.courseEndTime = res.data.courseEndTime;
            form.coursePrice = res.data.coursePrice;
            form1.teacher = res.data.teacher;
            form1.courseInfo = res.data.courseInfo;
            form1.courseState = res.data.courseState;
            form1.courseLocation = res.data.courseLocation;
        })

}

//由于这里需要一开始就挂载，但是还没有和后端发生信息交互,暂时注释方便开发
onMounted(() => {
    //   getCourse();
})

//向后端发送修改课程信息的请求，返回是否修改成功
function onSubmit() {
    let data = {
        courseID: form.courseID,
        courseName: form.courseName,
        courseStartTime: form.courseStartTime,
        courseEndTime: form.courseEndTime,
        coursePrice: form.coursePrice,
        teacher: form1.teacher,
        courseInfo: form1.courseInfo,
        courseState: form1.courseState,
        courseLocation: form1.courseLocation,
    }

    axios.post("http://localhost:8080/executor/courseAdd", qs.stringify(data))
        .then((res) => {
            if (res.data.code === 200) {
                ElMessage("增加成功！")
                router.replace("/executor/courseManage")
            } else {
                ElMessage.error(res.data.msg);
            }
        })
}
</script>

<template>
    <h2>课程基本信息</h2>
    <el-form :inline="true" :model="form" label-width="auto" style="max-width: 700px">
        <el-form-item label="课程编号：">
            <el-input disabled v-model="form.courseID" />
        </el-form-item>
        <el-form-item label="课程名称：">
            <el-input v-model="form.courseName" />
        </el-form-item>
        <el-form-item label="上课时间：">
            <el-input v-model="form.courseStartTime" style="width:200px" />
            <el-text>至</el-text>
            <el-input v-model="form.courseEndTime" style="width:200px" />
        </el-form-item>
        <el-form-item label="课程费用：">
            <el-input v-model="form.coursePrice" style="width:200px" />
            <el-text>￥/人</el-text>
        </el-form-item>
    </el-form><br>
    <h2>课程详细信息</h2>
    <el-form :model="form1" label-width="auto" style="width: 500px">
        <el-form-item label="主讲教师：">
            <el-input v-model="form1.teacher" />
        </el-form-item>
        <el-form-item label="课程简介：">
            <el-input v-model="form1.courseInfo" />
        </el-form-item>
        <el-form-item label="上课地点：">
            <el-input v-model="form1.courseLocation" />
        </el-form-item>
        <el-form-item label="课程状态：">
            <el-radio-group v-model="form1.courseState">
                <el-radio value="enroll">报名中</el-radio>
                <el-radio value="teach">授课中</el-radio>
                <el-radio value="end">已经结束</el-radio>
            </el-radio-group>
        </el-form-item>
    </el-form>

    <el-button type="primary" @click="back">返回</el-button>
    <el-button type="primary" @click="signUp">报名</el-button>
</template>

<style scoped></style>