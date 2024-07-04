<script setup>
import {useRouter} from 'vue-router';
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from '@element-plus/icons-vue'
import {ElMessageBox} from "element-plus";
import axios from 'axios';
import qs from 'querystring';
import {ElMessage} from 'element-plus';
import {onMounted} from 'vue';


let router = useRouter();
function logOut() {
  ElMessageBox.confirm('确定要退出登录吗?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    router.replace("/login")
  }).catch(() => {
    // 用户点击了取消，不做任何操作
  });
}

</script>

<template>
<h1>老师您好！欢迎使用本系统！</h1>
  <el-row class="tac">
    <el-col :span="4">
      <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
        <el-sub-menu index="1">
          <template #title>
            <el-icon>
              <document/>
            </el-icon>
            <span>培训相关</span>
          </template>
          <el-menu-item-group title="课程">
            <el-menu-item index="1-1">
              <router-link to="/teacher/searchCourse">查询课程信息</router-link>
            </el-menu-item>
            <el-menu-item index="1-2">
              <router-link to="/teacher/enterGrade">录入课程成绩</router-link>
            </el-menu-item>
            <el-menu-item index="1-3">
              <router-link to="/teacher/searchEvaluate">查阅课程评价</router-link>
            </el-menu-item>
          </el-menu-item-group>
        </el-sub-menu>

        <el-sub-menu index="2">
          <template #title>
            <el-icon>
              <icon-menu/>
            </el-icon>
            <span>账户操作</span>
          </template>
          <!-- <el-menu-item index="2-1">
            <router-link to="/teacher/bindid">绑定身份信息</router-link>
          </el-menu-item> -->

          <el-menu-item index="2-1" @click="logOut">退出登陆</el-menu-item>

          <el-menu-item index="2-2">
            <router-link to="/teacher/change-password">修改密码</router-link>
          </el-menu-item>

        </el-sub-menu>
      </el-menu>
    </el-col>
    <el-col :span="3">
    </el-col>
    <el-col :span="15">
      <router-view></router-view>
    </el-col>
  </el-row>
</template>

<style scoped>

</style>