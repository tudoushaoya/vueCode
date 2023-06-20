import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

Vue.use(VueRouter)

const routes = [
  { path: '/signin', component: () => import('@/views/SignIn.vue') },
  {
    path: '/',
    component: () => import('@/layout'),
    redirect: '/dashboard',
    children: [
      { path: '/dashboard', component: () => import('@/views/dashboard.vue') },
      { path: '/article', component: () => import('@/views/Article') }
    ]
  }
]

const router = new VueRouter({

  routes
})
const whiteList = ['/signin', '/404']
router.beforeEach((to, from, next) => {
  const token = store.state.user.token
  if (token) {
    next()
  } else {
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next('/signin')
    }
  }
})

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

export default router
