import Vue from 'vue'
import VueRouter from 'vue-router'
import SignUp from '@/views/SignUp'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'SignUp',
    component: SignUp
  }

]

const router = new VueRouter({
  routes
})

export default router
