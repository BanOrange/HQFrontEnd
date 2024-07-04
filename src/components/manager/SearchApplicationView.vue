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
    apply_id:'',
    company_name:'',
})

//经理向后端发送获取培训申请的请求，希望返回所有的培训申请
function findAllApp() {
    let username = sessionStorage.getItem("username");
    let data = {
        username: username,
    }
    console.log(username)
    axios.post("http://localhost:8080/manager/getAllApp", qs.stringify(data))
        .then((res) => {
            console.log(res.data);
            tableData.value = res.data;
        })
}


onMounted(() => {
    findAllApp();
})


const getDetail = (index) =>{
    router.push({
        name: 'managerApplicationDetail',
        query: {
            apply_id: tableData.value[index].apply_id,
            
        }
    })
}

</script>

<template>
    <el-form :model="searchForm" label-width="auto" style="max-width: 300px">
        <h1>申请查询</h1><br><br>
        <el-form-item label="申请编号：">
            <el-input v-model="searchForm.bill_id" />
        </el-form-item>
        <el-form-item label="申请编号：">
            <el-input v-model="searchForm.bill_id" />
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="handleSearch">查询</el-button>
        </el-form-item>
    </el-form>
    <br><br>
    <h1>培训申请总览</h1>
    <el-table :data="tableData" style="width: 100%">
        <el-table-column fixed prop="apply_id" label="申请编号" width="150" />
        <el-table-column prop="company_name" label="公司名称" width="120" />
        <el-table-column prop="apply_budget" label="培训预算￥/人" width="120" />
        <el-table-column fixed="right" label="操作" width="120">
      <template #default="scope">
        <el-button link type="primary" size="large" @click="getDetail(scope.$index)">详情</el-button>
      </template>
    </el-table-column>
        
    </el-table>
</template>

<style scoped></style>