<script setup>
import {ref,onMounted} from 'vue';
import {useRouter,useRoute} from "vue-router";

import axios from 'axios'
import qs from 'qs'
import {ElMessage} from 'element-plus'

const route = useRoute();
const router = useRouter();

let username = ref("");
let password = ref("");
let userType = ref("");

function handleRegister(){
  router.replace("/register")
}


//向后端发送用户名和密码，希望后端返回是否登录成功
function handleLogin() {
  if(remember.checked == true){
    let usernameSave = username.value;
    let passwordSave = password.value;
	
	//获取当前时间
	var date=new Date();
	var expireDays=1;
	
	//将date设置为10天以后的时间
	date.setTime(date.getTime()+expireDays*24*3600*1000);
	
	//将userId和userName两个cookie设置为10天后过期
	document.cookie="usernameSave="+escape(usernameSave)+";expire="+date.toGMTString();
	document.cookie="passwordSave="+escape(passwordSave)+";expire="+date.toGMTString();
  }

  sessionStorage.setItem("username", username.value)     //为了防止路由屏蔽所以在这里建立会话，最终做完的时候要删除！！
  let data = {
    username: username.value,
    password: password.value,
    usertype: userType.value
  }
  console.log(data);
  axios.post('http://localhost:8080/login', qs.stringify(data))
      .then((res) => {
        if (res.data.code === 200) {
          sessionStorage.setItem("username", username.value)
          router.replace(userType.value === 'student' ? '/student' : userType.value === 'teacher' ? '/teacher' : userType.value === 'manager' ? '/manager' : userType.value === 'staff' ? '/staff' : 'executor')
          console.log(res.data.msg)
        } else {
          ElMessage.error(res.data.msg)
        }
      })
  }

  function handleForget(){
    router.replace("/findpassword");
  }

  function LoginByMem(){
    let usernameSaveNow = "";
    let passwordSaveNow = "";
    var cookieStr = document.cookie;
		var cookieArr = cookieStr.split("; ");
		for ( var i = 0; i < cookieArr.length; i++) {
			var cookieObj = cookieArr[i].split("=");
			if (cookieObj[0] == "usernameSave"){
				usernameSaveNow = cookieObj[1];
			};
      if(cookieObj[0] == "passwordSave"){
        passwordSaveNow = cookieObj[1];
      };
		};

    if(usernameSaveNow != ""){
      username.value = usernameSaveNow;
      password.value = passwordSaveNow;
      remember.checked = true;
    };
  }

  onMounted(() =>{
    LoginByMem();
  })
const options = [
  {
    label: '学员/软件公司',
    options: [
      {
        label: '学员',
        value: 'student',
      },
    ]
  },
  {
    label: '培训人员',
    options: [
      {
        label: '总经理',
        value: 'manager',
      },
      {
        label: '讲师',
        value: 'teacher',
      },
      {
        label: '执行人',
        value: 'executor',
      },
      {
        label: '现场工作人员',
        value: 'staff',
      },
    ],
  },
]
</script>

<template>
  <div id="login">
    <h1>欢迎使用浩奇培训管理系统!</h1><br>
    <el-input v-model="username" style="width: 240px" placeholder="请输入用户名"/>
    <br><br>
    <el-input v-model="password" type="password" style="width: 240px" placeholder="请输入密码"/>
    <br><br>
    <div id="selector">
      <label>请选择用户类型</label><br>
      <el-select v-model="userType" placeholder="请选择身份" style="width: 240px">
        <el-option-group
          v-for="group in options"
          :key="group.label"
          :label="group.label"
        >
        <el-option
          v-for="item in group.options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
        </el-option-group>
      </el-select>
    </div>
    <br>
    <input type="checkbox" id="remember" /><label>记住我</label><br>
    <el-button type="primary" size="large" @click="handleRegister">去注册</el-button>
    <el-button type="primary" size="large" @click="handleLogin">登录</el-button>
    <br>
    <el-link type="primary" @click="handleForget">忘记密码？</el-link>
  </div>
</template>

<style>
#slogan1{
  text-align:left
}
</style>