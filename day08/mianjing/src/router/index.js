import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import RegisterPage from '../views/Register.vue'
import Layout from '../views/Layout.vue'
import Article from '../views/Article.vue'
import Like from '../views/Like.vue'
import Collect from '../views/Collect.vue'
import User from '../views/User.vue'
import Detail from '../views/Detail.vue'
import { getToken } from '../utils/storage'
Vue.use(VueRouter)

const routes = [
  { path: '/login', component: Login },
  { path: '/register', component: RegisterPage },
  { path: '/article/:id', component: Detail },
  {
    path: '/',
    component: Layout,
    redirect: '/article',
    children: [
      { path: '/article', component: Article },
      { path: '/like', component: Like },
      { path: '/collect', component: Collect },
      { path: '/user', component: User }
    ]
  }

]

const router = new VueRouter({
  routes
})
const whiteList = ['/login', '/register']
router.beforeEach((to, from, next) => {
  const token = getToken()
  // 如果有token，直接放行
  if (token) {
    next()
  } else {
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next('/login')
    }
  }
})
export default router
