import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },

  ]
})

router.beforeEach((to,from,next)=>{
  if(to.path == '/login'){
    next()
  }else{
    const username = sessionStorage.getItem("username")
    if(username == null){
      next('/login')
    }else{
      next();
    }
  }
})
export default router
