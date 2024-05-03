<script setup>
import { reactive } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus';
import { useRouter, useRoute } from 'vue-router';
import { onMounted } from 'vue';
import axios from 'axios'
import qs from 'querystring';

let router = useRouter();
let route = useRoute();

let ID = route.query.ID;

//存储讲师的基本信息
//编号和姓名
const form = reactive({
    ID: '',
    name: '',
})

//该表单存储讲师的详细信息
const form1 = reactive({
    title: '',
    field: '',
    level: '',
    telephone: '',
    email: '',
})

function back() {
    router.replace("/executor/studentManage")
}

//根据传过来的ID信息得到一个讲师信息
function getTeacher() {
    let data = {
        ID: this.ID,
    }

    axios.post("http://localhost:8080/executor/getTeacher", qs.stringify(data))
        .then((res) => {
            form.name = res.data.name;
            form.ID = res.data.ID;
            form1.title = res.data.title;
            form1.field = res.data.field;
            form1.level = res.data.level;
            form1.telephone = res.data.telephone;
            form1.email = res.data.email;
        })

}

//由于这里需要一开始就挂载，但是还没有和后端发生信息交互,暂时注释方便开发
onMounted(() => {
    //   getTeacher();
})

function onSubmit() {
    let data = {
        ID: form.ID,
        name: form.name,
        title: form1.title,
        field: form1.field,
        level: form1.level,
        telephone: form1.telephone,
        email: form1.email,
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
    <br><br>
    <el-form :model="form" label-width="auto" style="max-width: 300px">
        <el-form-item label="讲师编号：">
            <el-input v-model="form.ID" />
        </el-form-item>
        <el-form-item label="讲师姓名：">
            <el-input v-model="form.name" />
        </el-form-item>
    </el-form>
    <br>
    <h2>讲师详细信息</h2>
    <el-form :model="form1" label-width="auto" style="max-width: 300px">
        <el-form-item label="讲师职称：">
            <el-input v-model="form1.title" />
        </el-form-item>
        <el-form-item label="擅长领域：">
            <el-input v-model="form1.field" />
        </el-form-item>
        <el-form-item label="技术水平：">
            <el-input v-model="form1.level" />
        </el-form-item>
        <el-form-item label="电话号码：">
            <el-input v-model="form1.telephone" />
        </el-form-item>
        <el-form-item label="电子邮箱：">
            <el-input v-model="form1.email" />
        </el-form-item>
    </el-form>
    <el-button type="primary" @click="back">返回</el-button>
    <el-button type="primary" @click="onSubmit">修改</el-button>
</template>

<style scoped></style>