<script setup>
import { reactive, ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus';
import { useRouter, useRoute } from 'vue-router';
import { onMounted } from 'vue';
import axios from 'axios'
import qs from 'querystring';

let router = useRouter();
let route = useRoute();
let Report_id = route.query.Report_id;
//课程信息
let report_id = ref('');
report_id.value = Report_id;
let report_start1 = ref('');
let report_start2 = ref('');
let report_start3 = ref('');
let report_end1 = ref('');
let report_end2 = ref('');
let report_end3 = ref('');
let report_income = ref('');
let teacher_num = ref('');
let stu_num = ref('');
let course_num = ref('');
let company_num = ref('');
let executor_num = ref('');



function back() {
    router.replace("/manager/searchReport")
}


//向后端发送报表ID获取对应报表，后端需要返回对应数据项
function getReport() {
  let data = {
    report_id: report_id.value,
  }

  axios.post("http://localhost:8080/manager/getReport", qs.stringify(data))
    .then((res) => {
      console.log(res.data);
      report_id.value = res.data[0].report_id
        if(res.data.report_start == null) {
            console.log("wrong")
        }
      const start = res.data[0].report_start.split("-");
      report_start1.value = start[0]
      report_start2.value = start[1]
      report_start3.value = start[2]
    
      const end = res.data[0].report_end.split("-");
      report_end1.value = end[0]
      report_end2.value = end[1]
      report_end3.value = end[2]

      report_income.value = res.data[0].report_income;
      teacher_num.value = res.data[0].teacher_num;
      stu_num.value = res.data[0].stu_num;
      course_num.value = res.data[0].course_num;
      company_num.value = res.data[0].company_num;
      executor_num.value = res.data[0].executor_num;
      
    })

}

//由于这里需要一开始就挂载，但是还没有和后端发生信息交互,暂时注释方便开发
onMounted(() => {
    getReport();
})

</script>

<template>
    <h1>报表信息</h1>
    <el-text>报表编号：</el-text>
    <el-input disabled v-model="report_id" style="width:200px" /><br><br>
    <el-text>报表开始时间：</el-text>
    <el-input disabled v-model="report_start1" style="width:60px" />
    <el-text>年</el-text>
    <el-input disabled v-model="report_start2" style="width:50px" />
    <el-text>月</el-text>
    <el-input disabled v-model="report_start3" style="width:50px" />
    <el-text>日</el-text><br><br>
    <el-text>报表结束时间：</el-text>
    <el-input disabled v-model="report_end1" style="width:60px" />
    <el-text>年</el-text>
    <el-input disabled v-model="report_end2" style="width:50px" />
    <el-text>月</el-text>
    <el-input disabled v-model="report_end3" style="width:50px" />
    <el-text>日</el-text><br><br>
    <el-text>时间内收入:</el-text>
    <el-input disabled v-model="report_income" style="width: 50px" />
    <el-text>￥</el-text><br><br>
    <el-text>讲师人数：</el-text>
    <el-input disabled v-model="teacher_num" style="width: 50px" /><br><br>
    <el-text>课程数量：</el-text>
    <el-input disabled v-model="course_num" style="width:50px" /><br><br>
    <el-text>学员人数：</el-text>
    <el-input disabled v-model="stu_num" style="width:50px" /><br><br>
    <el-text>培训公司数量：</el-text>
    <el-input disabled v-model="company_num" style="width: 50px" /><br><br>
    <el-text>执行人数量：</el-text>
    <el-input disabled v-model="executor_num" style="width: 50px" />
    <br><br>

    <el-button type="primary" size="large" @click="back">返回</el-button>
</template>

<style scoped></style>