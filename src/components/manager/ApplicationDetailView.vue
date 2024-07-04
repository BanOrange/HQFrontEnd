<script setup>
import { ref, reactive } from 'vue'
import axios from 'axios';
import qs from 'querystring';
import { ElMessage } from 'element-plus';
import { onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';

let route = useRoute();
let router = useRouter();
//路由传参传过来的ID，可能会出现问题建议检查一下
let apply_id = route.query.apply_id;
//装申请的基本信息

let company_name = ref('');
let apply_budget = ref('');
let apply_want = ref('');
let stu_num = ref('');
let company_tele = ref('');



//返回到总览界面
function back() {
    router.replace("/manager/searchApplication")
}

//得到一个具体培训申请的各项信息
function getApp() {
    let username = sessionStorage.getItem("username");
    let data = {
        apply_id: apply_id,
        uername: username,
    }
    axios.post("http://localhost:8080/manager/getApp",qs.stringify(data))
        .then((res) => {
            company_name.value = res.data.company_name;
            stu_num.value = res.data.stu_num;
            apply_budget.value = res.data.apply_budget;
            apply_want.value = res.data.apply_want;
            company_tele.value = res.data.company_tele;
        })
}

onMounted(() => {
    getApp();
})


</script>

<template>
    <h2>申请基本信息</h2>
    <el-text>公司名称：</el-text>
    <el-input disabled v-model="company_name" style="width:100px"/><br><br>
    <el-text>培训预算：</el-text>
    <el-input disabled v-model="apply_budget" style="width:100px" />
    <el-text>￥/人</el-text>
    <br><br>
    <el-text>培训期望：</el-text><br>
    <el-input  disabled v-model="apply_want" style="width:400px" :autosize="{ minRows: 10, maxRows: 100 }" type="textarea"
        placeholder="请输入您对课程名称及内容等的期望" />
    <br><br>
    <el-text>预估人数：</el-text>
    <el-input disabled v-model="stu_num" style="width:75px" />
    <el-text>人</el-text>
    <br><br>
    <el-text>联系电话：</el-text>
    <el-input disabled v-model="company_tele" style="width:120px" />
    <br><br>
    <el-button type="primary" @click="back">返回</el-button>
</template>

<style scoped></style>