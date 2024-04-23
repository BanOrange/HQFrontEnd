<template>
    <div>
    <el-input v-model="username" style="width: 240px" placeholder="请输入用户名" />
    </div>
    <el-input v-model="password" type="password" style="width: 240px" placeholder="请输入密码"/><br>
    <el-button type="primary" @click ="handleLogin">登录</el-button>
</template>

<script setup>
import { ref } from 'vue';
let username = ref("");
let password = ref("");


</script>