//本界面是为了选择这门课的哪些学员进行缴费
<script setup>
import { ref, reactive } from 'vue'
import axios from 'axios';
import qs from 'querystring';
import { ElMessage } from 'element-plus';
import { onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';

let route = useRoute();
let router = useRouter();
let course_id = route.query.course_id;
let course_name = route.query.course_name;

let studentList = []
const tableData = ref([])

const tableData1 = ref([])

function back() {
    router.replace("/company/pay")
}

//通过课程ID和软件公司的username，得到该公司选了这门课的所有员工的信息（id，姓名即可）以及他们对应的缴费状态
function getPaymentStudent() {
    let username = sessionStorage.getItem("username");
    let data = {
        username: username,
        course_id: course_id,
    }
    axios.post("http://localhost:8080/company/getPaymentStudent", qs.stringify(data))
        .then((res) => {
            tableData.value = res.data;
            for (var i = 0; i < tableData.value.length; i++) {
                if (tableData.value[i].signup_state == 1) {
                    tableData.value[i].signup_state = "已缴费";
                } else {
                    tableData.value[i].signup_state = "未缴费";
                }
            }
        })
}

onMounted(() => {
    getPaymentStudent();
})

function pay() {
    for (var i = 0; i < tableData.value.length; i++) {
        const item = tableData.value[i];
        if(tableData.value[i].signup_state == "未缴费"){
            studentList.push(item);
        }
    
        if(tableData.value[i].signup_state == "已缴费"){
            ElMessage.error("您选择的员工中已经有人缴过费了，请点击下方的“删去已缴费员工”")
            return;
        }
    }
    if(studentList.length == 0){
            ElMessage.error("所有员工均已缴费")
            return;
        }
    console.log(studentList)
    router.push({
        name: "companyPayDetail",
        query:{
            studentList: window.JSON.stringify(studentList),
            course_id: course_id,
            course_name: course_name,
        }
    })

}

function deletePaid() {
    for (var i = tableData.value.length; i > 0; i--) {
        console.log(tableData.value)
        if (tableData.value[i-1].signup_state == "已缴费") {

        } else {
            const item = table.value[i];
            tableData1.value.add(item);
        }
        tableData.value = tableData1.value;
    }
}


const deleteStu = (index) => {
    let stu_id = tableData.value[index].stu_id;
    tableData1.value.clear;
    for (var i = 0; i < tableData.value.length; i++) {
        if (tableData.value[i].stu_id == stu_id) {

        } else {
            const item = tableData.value[i];
            tableData1.add(item);
        }
    }
    tableData.value = tableData1.value;
}

</script>

<template>
    <h1>课程信息总览</h1>
    <el-table :data="tableData" style="width: 100%">
        <el-table-column fixed prop="stu_id" label="学员ID" width="150" />
        <el-table-column prop="stu_name" label="学员姓名" width="120" />
        <el-table-column prop="signup_state" label="是否已为员工缴费" width="150" />
        <el-table-column fixed="right" label="操作" width="120">
            <template #default="scope">
                <el-button link type="primary" size="large" @click="deleteStu(scope.$index)">不为该学员缴费</el-button>
            </template>
        </el-table-column>
    </el-table>
    <el-button type="primary" size="large" @click="deletePaid">删去已缴费员工</el-button>&nbsp;&nbsp;&nbsp;
    <el-button type="primary" size="large" @click="back">返回</el-button>&nbsp;&nbsp;&nbsp;
    <el-button type="primary" size="large" @click="pay">去缴费</el-button>
</template>

<style scoped></style>