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

//存储讲师的基本信息
//编号和姓名
const form = reactive({
    teacher_id: '',
    teacher_name: '', 
    teacher_position: '',
})


//该表单存储讲师的详细信息
const form1 = reactive({
    teacher_field: '',
    teacher_tele: '',
    teacher_email: '',
})

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
            form.teacher_name = res.data.teacher_name;
            form.teacher_id = res.data.teacher_id;
            form1.teacher_position = res.data.teacher_position;
            form1.teacher_field = res.data.teacher_field;
            form1.teacher_tele = res.data.teacher_tele;
            form1.teacher_email = res.data.teacher_email;
        })

}

//由于这里需要一开始就挂载，但是还没有和后端发生信息交互,暂时注释方便开发
onMounted(() => {
    //   getTeacher();
})

function onSubmit() {
    let data = {
        teacher_name: form.teacher_name,
        teacher_position: form1.teacher_position,
        teacher_field: form1.teacher_field,
        teacher_tele: form1.teacher_tele,
        teacher_email: form1.teacher_email,
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
        <el-form-item label="讲师姓名：">
            <el-input v-model="form.teacher_name" />
        </el-form-item>
        <el-form-item>
            <el-select v-model="form.teacher_position" placeholder="请选择职称" style="width: 150px">
                <el-option v-for="item in options" :label="item.label" :value="item.value" />
            </el-select>
        </el-form-item>
    </el-form>
    <br>
    <h2>讲师详细信息</h2>
    <el-form :model="form1" label-width="auto" style="max-width: 300px">
        <el-form-item label="擅长领域：">
            <el-input v-model="form1.teacher_field" />
        </el-form-item>
        <el-form-item label="电话号码：">
            <el-input v-model="form1.teacher_tele" />
        </el-form-item>
        <el-form-item label="电子邮箱：">
            <el-input v-model="form1.teacher_email" />
        </el-form-item>
    </el-form>
    <el-button type="primary" @click="back">返回</el-button>
    <el-button type="primary" @click="onSubmit">修改</el-button>
</template>

<style scoped></style>