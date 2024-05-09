//修改密码界面
<script setup>
import { reactive } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus';
import { useRouter,useRoute } from 'vue-router';
import { onMounted} from 'vue';
import axios from 'axios'
import qs from 'querystring';

let router = useRouter();
const form = reactive({

  newPassword: '',
});
function back(){
  router.replace("/student")
}
function onChangePassword(){
  let username = sessionStorage.getItem("username");
  let data = {
    username: username,
    newPassword: form.newPassword,
  };
  axios.post('http://localhost:8080/student/change-password', qs.stringify(data))
      .then((res) => {
        if (res.data.code === 200) {
          ElMessage('密码修改成功');
        } else {
          ElMessage.error('密码修改失败');
        }
      });
}
</script>

<style scoped>
/* Add your CSS styles here */
</style>

<template>
    <h2>修改密码</h2>
  <el-form :model="form" label-width="auto" style="max-width: 300px">
      <el-form-item label="新密码">
        <el-input
            v-model="form.newPassword"
            style="width: 240px"
            type="password"
            placeholder="请输入新密码"
            show-password
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="back">返回</el-button>
        <el-button type="primary" @click="onChangePassword">提交</el-button>
      </el-form-item>
    </el-form>
</template>