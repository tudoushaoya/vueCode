import Vue from 'vue'
import VueRouter from 'vue-router'
import SignUp from '@/views/SignUp'
import LogIn from '@/views/LogIn.vue'
import Layout from '@/views/Layout.vue'
import ArticlePage from '@/views/Article.vue'
import { getToken } from '@/utils/storage.js'
Vue.use(VueRouter)

const routes = [
  {
    path: '/signup',
    component: SignUp
  },
  {
    path: '/login',
    component: LogIn
  },
  {
    path: '/article/:id',
    component: ArticlePage
  },
  {
    path: '/',
    component: Layout,
    children: [
      { path: '/article', component: () => import('@/views/Article.vue') },
      { path: '/collect', component: () => import('@/views/Collect.vue') },
      { path: '/like', component: () => import('@/views/Like.vue') },
      { path: '/user', component: () => import('@/views/User.vue') }
    ]
  }
]

const router = new VueRouter({
  routes
})
const whiteList = ['/login', '/signup']
router.beforeEach((to, from, next) => {
  const token = getToken()
  console.log(token)
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
