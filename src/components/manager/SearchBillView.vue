<script setup>
import { ref, reactive } from 'vue'
import axios from 'axios';
import qs from 'querystring';
import { ElMessage, ElMessageBox } from 'element-plus';
import { onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';

let router = useRouter();

//用来装账单的信息
const tableData = ref([])

//用来装搜索条件
const searchForm = reactive({
    bill_id: '',
    bill_start1: '',
    bill_start2: '',
    bill_start3: '',
    bill_end1: '',
    bill_end2: '',
    bill_end3: '',
})

//经理向后端发送获取账单的请求，希望返回所有的账单
function findAllBill() {
    let username = sessionStorage.getItem("username");
    let data = {
        username: username,
    }
    console.log(username)
    axios.post("http://localhost:8080/manager/getAllBill", qs.stringify(data))
        .then((res) => {
            console.log(res.data);
            tableData.value = res.data;
        })
}

//挂载,但是为了方便开发，先注释掉
onMounted(() => {
    findAllBill();
})



//向后端发送寻找账单的请求，希望返回对应账单的信息
function handleSearch() {
    let bill_start = searchForm.bill_start1 + '-' + searchForm.bill_start2 + '-' + searchForm.bill_start3;
    let bill_end = searchForm.bill_end1 + '-' + searchForm.bill_end2 + '-' + searchForm.bill_end3;
    if(searchForm.bill_start1=="" && searchForm.bill_start2=="" && searchForm.bill_start3==""){
        bill_start = "";
        bill_end = "";
    }
    console.log(bill_start)
    console.log(bill_end)
    let data = {
        bill_start: bill_start,
        bill_end: bill_end,
        bill_id: searchForm.bill_id,
    }
    axios.post('http://localhost:8080/manager/searchBill', qs.stringify(data))
        .then((res) => {
            tableData.value = res.data;
        })

}

</script>

<template>
    <el-form :model="searchForm" label-width="auto" style="max-width: 300px">
        <h1>账单查询</h1><br><br>
        <el-form-item label="账单编号：">
            <el-input v-model="searchForm.bill_id" />
        </el-form-item>
        <el-form-item label="开始时间：">
            <el-input v-model="searchForm.bill_start1" style="width:60px" />
            <el-text>年</el-text>
            <el-input v-model="searchForm.bill_start2" style="width:50px" />
            <el-text>月</el-text>
            <el-input v-model="searchForm.bill_start3" style="width:50px" />
            <el-text>日</el-text><br>
        </el-form-item>
        <el-form-item label="结束时间：">
            <el-input v-model="searchForm.bill_end1" style="width:60px" />
            <el-text>年</el-text>
            <el-input v-model="searchForm.bill_end2" style="width:50px" />
            <el-text>月</el-text>
            <el-input v-model="searchForm.bill_end3" style="width:50px" />
            <el-text>日</el-text><br>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="handleSearch">查询</el-button>
        </el-form-item>
    </el-form>
    <br><br>
    <h1>账单信息总览</h1>
    <el-table :data="tableData" style="width: 100%">
        <el-table-column fixed prop="bill_id" label="账单编号" width="150" />
        <el-table-column prop="bill_time" label="账单时间" width="120" />
        <el-table-column prop="course_id" label="课程编号" width="120" />
        <el-table-column prop="bill_income" label="账单金额(￥)" width="150" />
    </el-table>
</template>

<style scoped></style>