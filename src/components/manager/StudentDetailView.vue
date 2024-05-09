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

//存储学员的核心信息，和别人不会重复的信息
//如学号和电话号等
const form = reactive({
    id: '',
    name: '',
    telephone: '',
})

//该表单存储学生的其他信息
const form1 = reactive({
    company: '',
    position: '',
    email: '',
    level: '',
})

function back() {
    router.replace("/manager/studentManage")
}

//根据传过来的ID信息得到整个学生信息
//逻辑相同，请求域名不需要更改
function getStudent() {
    let data = {
        studentID: studentID,
    }

    axios.post("http://localhost:8080/executor/getStudent", qs.stringify(data))
        .then((res) => {
            form.id = res.data.id;
            form.name = res.data.name;
            form.telephone = res.data.telephone;
            form1.company = res.data.companyName;
            form1.position = res.data.jobPosition;
            form1.email = res.data.email;
            form1.level = res.data.level;
        })

}

//由于这里需要一开始就挂载，但是还没有和后端发生信息交互,暂时注释方便开发
onMounted(() => {
    //   getStudent();
})

</script>

<template>
    <h2>学员基本信息</h2>
    <br><br>
    <el-form :model="form" label-width="auto" style="max-width: 300px">
        <el-form-item label="学号：">
            <el-input disabled v-model="form.id" />
        </el-form-item>
        <el-form-item label="姓名：">
            <el-input disabled v-model="form.name" />
        </el-form-item>
        <el-form-item label="电话号码：">
            <el-input disabled v-model="form.telephone" />
        </el-form-item>
    </el-form>
    <br>
    <h2>学员详细信息</h2>
    <el-form :model="form1" label-width="auto" style="max-width: 300px">
        <el-form-item label="公司名称：">
            <el-input disabled v-model="form1.company" />
        </el-form-item>
        <el-form-item label="工作岗位：">
            <el-input disabled v-model="form1.position" />
        </el-form-item>
        <el-form-item label="电子邮件：">
            <el-input disabled v-model="form1.email" />
        </el-form-item>
        <el-form-item label="技术水平：">
            <el-radio-group disabled v-model="form1.level">
                <el-radio value="high">高级</el-radio>
                <el-radio value="middle">中级</el-radio>
                <el-radio value="low">入门</el-radio>
            </el-radio-group>
        </el-form-item>
    </el-form>
    <el-button type="primary" @click="back">返回</el-button>
</template>

<style scoped></style>