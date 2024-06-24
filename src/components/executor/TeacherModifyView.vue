<script setup>
import { reactive } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus';
import { useRouter, useRoute } from 'vue-router';
import { onMounted } from 'vue';
import axios from 'axios'
import qs from 'querystring';

let router = useRouter();
let route = useRoute();

let teacher_id = route.query.teacher_id;

//讲师的基本信息
    teacherid = ref('');
    teacher_name = ref('');
    teacher_position = "jiangshi";

 //存储讲师的详细信息
    teacher_field = ref('');
    teacher_tele = ref('');
    teacher_email = ref('');

    const options = [
  {
    label: '讲师',
    value: '讲师',
  },
  {
    value: '资深讲师',
    label: '资深讲师',
  },
  {
    label: '领域专家',
    value: '领域专家',
  },
]
function back() {
    router.replace("/executor/teacherManage")
}

//根据传过来的ID信息得到一个讲师信息
function getTeacher() {
    let data = {
        teacher_id: teacher_id,
    }

    axios.post("http://localhost:8080/executor/getTeacher", qs.stringify(data))
        .then((res) => {
            teacher_name = res.data.teacher_name;
            teacherid = res.data.teacher_id;
            teacher_position = res.data.teacher_position;
            teacher_field = res.data.teacher_field;
            teacher_tele = res.data.teacher_tele;
            teacher_email = res.data.teacher_email;
        })

}

//由于这里需要一开始就挂载，但是还没有和后端发生信息交互,暂时注释方便开发
onMounted(() => {
    //   getTeacher();
})

function onSubmit() {
    let data = {
        teacher_name: teacher_name,
        teacher_position: teacher_position,
        teacher_field: teacher_field,
        teacher_tele: teacher_tele,
        teacher_email: teacher_email,
    }

    axios.post("http://localhost:8080/executor/teacherModify", qs.stringify(data))
        .then((res) => {
            if (res.data.code === 200) {
                ElMessage("修改成功！")
                router.replace("/executor/teacherManage")
            } else {
                ElMessage.error(res.data.msg);
            }
        })
}
</script>

<template>
    <h2>讲师基本信息</h2>
    <br>
    <el-label>讲师编号：</el-label>
    <el-input label="讲师编号" disabled v-model="teacherid" />
    <el-label>讲师名称：</el-label>
    <el-input label="讲师名称"  v-model="teacher_name" />
    <el-label>讲师职称：</el-label>
    <el-select v-model="teacher_position" placeholder="请选择职称" style="width: 150px">
      <el-option v-for="item in options" :label="item.label" :value="item.value" />
    </el-select>
    <br>
    <h2>讲师详细信息</h2>
    <br>
    <el-label>擅长领域：</el-label>
    <el-input  v-model="teacher_field" />
    <el-label>讲师电话：</el-label>
    <el-input  v-model="teacher_tele" />
    <el-label>电子邮箱：</el-label>
    <el-input  v-model="teacher_email" />
    <el-button type="primary" @click="back">返回</el-button>
    <el-button type="primary" @click="onSubmit">修改</el-button>
</template>

<style scoped></style>