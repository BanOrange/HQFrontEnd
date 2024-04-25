<script setup>
import { reactive } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus';
import { useRouter,useRoute } from 'vue-router';
import { onMounted} from 'vue';
import axios from 'axios'
import qs from 'querystring';

let router = useRouter();
const form = reactive({

  })

function back(){
  router.replace("/student")
}
function onSubmit(){
  let data = {

  }
  axios.post("http://localhost:8080/student/pay",qs.stringify(data))
      .then((res) => {
        if(res.data.code === 200){
          ElMessage("缴费成功！")
          router.replace("/student")
        }else{
          ElMessage.error(res.data.msg);
        }
      })
}


</script>

<template>
  <div>
    <h2>培训费用缴纳</h2>
  </div>
</template>

<style scoped>

</style>