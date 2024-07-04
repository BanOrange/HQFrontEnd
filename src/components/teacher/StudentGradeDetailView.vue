<script setup>
import { ref, reactive } from 'vue'
import axios from 'axios';
import qs from 'querystring';
import { ElIcon, ElMessage } from 'element-plus';
import { onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';

let route = useRoute();
let router = useRouter();
//路由传参传过来的ID，可能会出现问题建议检查一下
const stuForm = reactive({
    stu_id: '',
    stu_name: '',
})

stu_id = route.query.stu_id;
stu_name = route.query.stu_name;
let course_id = route.quert.course_id;

//存储成绩，注意在学生查询成绩中只需要给出平均成绩grade即可
const gradeForm = reactive({
    stu_score: "",
    teacher_evaluate: "",
})

//如果该名学生已经有成绩，则将成绩显示出来
function getGrade() {
    let data = {
        stu_id: stu_id,
        course_id: course_id,
    }
    console.log(data)
    axios.post('http://localhost:8080/teacher/getStudentGrade', qs.stringify(data))
        .then((res) => {
            console.log(res.data)
            gradeForm.stu_score = res.data.stu_score;
            gradeForm.teacher_evaluate = res.data.teacher_evaluate;
        });
}


onMounted(() => {
    getGrade();
})


//进入单个学生的成绩录入
const EnterGrade = (index) => {
    router.push({
        name: 'teacherStudentGradeDetail',
        query: {
            stu_id: tableData.value[index].stu_id,
            stu_name: tableData.value[index].stu_name,
        }
    })
}

// //提交成绩
// function onSubmit(){
//     let data={
//         stu_score: gradeForm.stu_score,
//         expergrade: gradeForm.expergrade,
//         examgrade: gradeForm.examgrade,
//         homegrade: gradeForm.homegrade,
//         teacher_evaluate: gradeForm.teacher_evaluate,
//         stu_id: this.stu_id,
//         course_id: this.course_id,
//     }

//     axios.post('http://localhost:8080/teacher/submitGrade', qs.stringify(data))
//       .then((res) => {
//         if (res.data.code === 200) {
//           ElMessage(res.data.msg)
//         } else {
//           ElMessage(res.data.msg)
//         }
//       });
// }

//返回到刚才的界面
function back() {
    router.replace("teacher/EnterCourseGradeView");
}
</script>

<template>
    <h2>学员信息</h2>
    <el-form :inline="true" :model="stuForm" label-width="auto" style="max-width: 700px">
        <el-form-item label="学员学号：">
            <el-input v-model="stuForm.stu_id" />
        </el-form-item>
        <el-form-item label="学员名称：">
            <el-input v-model="stuForm.stu_name" />
        </el-form-item>
    </el-form>
    <h2>成绩信息</h2>
    <el-form :inline="true" :model="gradeForm" label-width="auto" style="max-width: 700px">
        <el-form-item label="课程成绩：">
            <el-input v-model="gradeForm.examgrade" />
        </el-form-item>
        <el-form-item label="教师评语：">
            <el-input v-model="gradeForm.teacher_evaluate" />
        </el-form-item>
    </el-form>

    <el-button type="primary" size="large" @click="back()">返回</el-button>


</template>

<style scoped></style>