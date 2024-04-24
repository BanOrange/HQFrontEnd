//这个界面提示用户如何找回密码

<script setup>
import { useRouter } from 'vue-router';

let router = useRouter();

function handleBack(){
    router.replace("login")
}
</script>

<template>
<div id = "tips">
   <h1 style="color:red">官方邮箱:HQCompany@126.com</h1>
<h1>请将您的个人信息发送至浩奇公司官方邮箱，<br>
我们会尽快核对信息并用邮件告知您新的用户名和密码</h1> 

<el-button type="primary" size="large" id="back" @click="handleBack">返回登录界面</el-button>
</div>
</template>

<style scoped>
#tips{
    text-align: center;
}
</style>