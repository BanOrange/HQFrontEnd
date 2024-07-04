<script setup>
import { reactive } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus';
import { useRouter, useRoute } from 'vue-router';
import { onMounted } from 'vue';
import axios from 'axios'
import qs from 'querystring';

let router = useRouter();
let route = useRoute();

let stu_id = route.query.stu_id;

//存储学员的核心信息，和别人不会重复的信息
//如学号和电话号等
const form = reactive({
    stu_id: '',
    stu_name: '',
    stu_tele: '',
})

//该表单存储学生的其他信息
const form1 = reactive({
    stu_company: '',
    stu_position: '',
    stu_email: '',
    stu_level: '',
    stu_state: '',
})

function back() {
    router.replace("/executor/studentManage")
}

//根据传过来的ID信息得到整个学生信息
function getStudent() {
    let data = {
        student_id: stu_id,
    }
console.log(data)
    axios.post("http://localhost:8080/executor/getStudent", qs.stringify(data))
        .then((res) => {
            console.log(res.data)
            form.stu_id = res.data[0].stu_id;
            form.stu_name = res.data[0].stu_name;
            form.stu_tele = res.data[0].stu_tele;
            form1.stu_company = res.data[0].stu_company;
            form1.stu_position = res.data[0].stu_position;
            form1.stu_email = res.data[0].stu_email;
            form1.stu_level = res.data[0].stu_level;
            form1.stu_state = res.data[0].stu_state;
        })

}

//由于这里需要一开始就挂载，但是还没有和后端发生信息交互,暂时注释方便开发
onMounted(() => {
      getStudent();
})

function onSubmit() {
    let data = {
        stu_id: form.stu_id,
        stu_name: form.stu_name,
        stu_tele: form.stu_tele,
        stu_company: form1.stu_company,
        stu_position: form1.stu_position,
        stu_email: form1.stu_email,
        stu_level: form1.stu_level,
        stu_state: form1.stu_state,
    }
    console.log(data)
    axios.post("http://localhost:8080/executor/studentModify", qs.stringify(data))
        .then((res) => {
            console.log(res.data.msg)
            if (res.data.code === 200) {
                ElMessage("修改成功！")
                // router.replace("/executor/studentManage")
            } else {
                ElMessage.error(res.data.msg);
            }
        })
}
</script>

<template>
    <h2>学员基本信息</h2>
    <br><br>
    <el-form :model="form" label-width="auto" style="max-width: 300px">
        <el-form-item label="学号：">
            <el-input v-model="form.stu_id" />
        </el-form-item>
        <el-form-item label="姓名：">
            <el-input v-model="form.stu_name" />
        </el-form-item>
        <el-form-item label="电话号码：">
            <el-input v-model="form.stu_tele" />
        </el-form-item>
    </el-form>
    <br>
    <h2>学员详细信息</h2>
    <el-form :model="form1" label-width="auto" style="max-width: 300px">
        <el-form-item label="公司名称：">
            <el-input v-model="form1.stu_company" />
        </el-form-item>
        <el-form-item label="工作岗位：">
            <el-input v-model="form1.stu_position" />
        </el-form-item>
        <el-form-item label="电子邮件：">
            <el-input v-model="form1.stu_email" />
        </el-form-item>
        <el-form-item label="技术水平：">
            <el-radio-group v-model="form1.stu_level">
                <el-radio value="high">高级</el-radio>
                <el-radio value="middle">中级</el-radio>
                <el-radio value="low">入门</el-radio>
            </el-radio-group>
        </el-form-item>
    </el-form>
    <el-button type="primary" @click="back">返回</el-button>
    <el-button type="primary" @click="onSubmit">修改</el-button>
</template>

<style scoped></style>