import Vue from 'vue'
import VueRouter from 'vue-router'
import SignUp from '@/views/SignUp'
import LogIn from '@/views/LogIn.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/signup',
    name: 'SignUp',
    component: SignUp
  },
  {
    path: '/login',
    name: 'LogIn',
    component: LogIn
  }
]

const router = new VueRouter({
  routes
})

export default router
