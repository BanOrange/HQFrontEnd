<script setup>
import { reactive,ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus';
import { useRouter, useRoute } from 'vue-router';
import { onMounted } from 'vue';
import axios from 'axios'
import qs from 'querystring';

let router = useRouter();
let route = useRoute();

let teacher_id = route.query.teacher_id;

//讲师的基本信息
    let teacherid = ref('');
    let teacher_name = ref('');
    let teacher_position = ref('');

 //存储讲师的详细信息
    let teacher_field = ref('');
    let teacher_tele = ref('');
    let teacher_email = ref('');

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
            teacherid.value = teacher_id;
            teacher_name.value = res.data[0].teacher_name;
            teacher_position.value = res.data[0].teacher_position;
            teacher_field.value = res.data[0].teacher_field;
            teacher_tele.value = res.data[0].teacher_tele;
            teacher_email.value = res.data[0].teacher_email;
        })

}

//由于这里需要一开始就挂载，但是还没有和后端发生信息交互,暂时注释方便开发
onMounted(() => {
      getTeacher();
})

function onSubmit() {
    let data = {
        teacher_id: teacher_id,
        teacher_name: teacher_name.value,
        teacher_position: teacher_position.value,
        teacher_field: teacher_field.value,
        teacher_tele: teacher_tele.value,
        teacher_email: teacher_email.value,
    }
    console.log(data)

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
    <el-text>讲师编号：</el-text>
    <el-input v-model="teacherid" style="width:200px" /><br>
    <el-text>讲师名称：</el-text>
    <el-input v-model="teacher_name" style="width:200px"/><br>
    <el-text>讲师职称：</el-text>
    <el-select v-model="teacher_position" placeholder="请选择职称" style="width: 150px">
      <el-option v-for="item in options" :label="item.label" :value="item.value" />
    </el-select>

    <h2>讲师详细信息</h2>
    <br>
    <el-text>擅长领域：</el-text>
    <el-input v-model="teacher_field" style="width:200px"/><br>
    <el-text>电话号码：</el-text>
    <el-input v-model="teacher_tele"style="width:200px"/><br>
    <el-text>电子邮箱：</el-text>
    <el-input v-model="teacher_email" style="width:200px"/><br>
    <br>
    <el-button type="primary" @click="back">返回</el-button>
    <el-button type="primary" @click="onSubmit">修改</el-button>
</template>

<style scoped></style>