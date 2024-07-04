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
const handleClose = (key, keyPath) => {
  console.log(key, keyPath)
}

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

//用于验证该用户是否是执行人
function verify(){
  let username = sessionStorage.getItem("username");
  let data = {
    username: username,
  }

  axios.post("http://localhost:8080/getUserType", qs.stringify(data))
      .then((res) => {
        if (res.data.userType === "company") {
            //如果成功则不设任何限制
        } else {
          //如果失败则直接传递回login界面
          router.replace("/login");
        }
      })
}

//需要将上面的方法一开始就挂载，但是为了开发的方便暂时注释掉
onMounted(() => {
  // verify();
})
</script>

<template>
  <h1>您好！欢迎使用本系统进行培训选择！</h1>
  <el-row class="tac">
    <el-col :span="4">
      <el-menu default-active="2" class="el-menu-vertical-demo">
        <el-sub-menu index="1">
          <template #title>
            <el-icon>
              <document/>
            </el-icon>
            <span>培训相关</span>
          </template>
          <el-menu-item-group title="管理功能">
            <el-menu-item index="1-1">
              <router-link to="/company/pay">缴费</router-link>
            </el-menu-item>
            <el-menu-item index="1-2">
              <router-link to="/company/searchCourse">查询课程</router-link>
            </el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="课程相关">
            <el-menu-item index="2-1">
              <router-link to="/company/courseApplication">提交培训申请</router-link>
            </el-menu-item>
            <el-menu-item index="2-2">
              <router-link to="/company/searchGrade">查询学员成绩</router-link>
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
          <el-menu-item index="2-1" @click="logOut">退出登陆</el-menu-item>
          <el-menu-item index="2-2">
            <router-link to="/executor/change-password">修改密码</router-link>
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

<style scoped></style>