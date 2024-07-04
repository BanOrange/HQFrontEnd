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
    report_id: '',
    report_start1: '',
    report_start2: '',
    report_start3: '',
    report_end1: '',
    report_end2: '',
    report_end3: '',
})

//经理向后端发送获取所有报表的请求，希望返回所有的报表
function findAllReport() {
    let username = sessionStorage.getItem("username");
    let data = {
        username: username,
    }
    console.log(username)
    axios.post("http://localhost:8080/manager/getAllReport", qs.stringify(data))
        .then((res) => {
            console.log(res.data);
            tableData.value = res.data;
        })
}

//挂载,但是为了方便开发，先注释掉
onMounted(() => {
    findAllReport();
})



//向后端发送寻找报表的请求，希望返回对应报表的信息
function handleSearch() {
    let report_start = searchForm.report_start1 + '-' + searchForm.report_start2 + '-' + searchForm.report_start3;
    let report_end = searchForm.report_end1 + '-' + searchForm.report_end2 + '-' + searchForm.report_end3;
    if(searchForm.report_start1=="" && searchForm.report_start2=="" && searchForm.report_start3==""){
        report_start = "";
        report_end = "";
    }
    console.log(searchForm.report_end1)
    console.log(report_start)
    console.log(report_end)
    let data = {
        report_start: report_start,
        report_end: report_end,
        report_id: searchForm.report_id,
    }
    axios.post('http://localhost:8080/manager/searchReport', qs.stringify(data))
        .then((res) => {
            tableData.value = res.data;
            
        })

}

const getDetail= (index) =>{
    router.push({
        name: 'managerReportDetail',
        query: {
            report_id: tableData.value[index].report_id,
            
        }
    })
}

</script>

<template>
    <el-form :model="searchForm" label-width="auto" style="max-width: 300px">
        <h1>报表查询</h1><br><br>
        <el-form-item label="报表编号：">
            <el-input v-model="searchForm.course_id" />
        </el-form-item>
        <el-form-item label="开始时间：">
            <el-input v-model="searchForm.report_start1" style="width:60px" />
            <el-text>年</el-text>
            <el-input v-model="searchForm.report_start2" style="width:50px" />
            <el-text>月</el-text>
            <el-input v-model="searchForm.report_start3" style="width:50px" />
            <el-text>日</el-text><br>
        </el-form-item>
        <el-form-item label="结束时间：">
            <el-input v-model="searchForm.report_end1" style="width:60px" />
            <el-text>年</el-text>
            <el-input v-model="searchForm.report_end2" style="width:50px" />
            <el-text>月</el-text>
            <el-input v-model="searchForm.report_end3" style="width:50px" />
            <el-text>日</el-text><br>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="handleSearch">查询</el-button>
        </el-form-item>
    </el-form>
    <br><br>
    <h1>报表信息总览</h1>
    <el-table :data="tableData" style="width: 100%">
        <el-table-column fixed prop="report_id" label="报表编号" width="150" />
        <el-table-column prop="report_start" label="报表时间" width="120" />
        <el-table-column prop="report_income" label="收入(￥)" width="150" />
        <el-table-column fixed="right" label="操作" width="120">
      <template #default="scope">
        <el-button link type="primary" size="large" @click="getDetail(scope.$index)">详情</el-button>
      </template>
    </el-table-column>
    </el-table>
</template>

<style scoped></style>