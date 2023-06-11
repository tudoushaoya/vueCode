import Vue from 'vue'

import VueRouter from 'vue-router'
Vue.use(VueRouter)
import MyMusic from '@/views/MyMusic.vue'
import FindMusic from '@/views/FindMusic.vue'
import NotFound from '@/views/NotFound.vue'
const router = new VueRouter({
  mode: 'history',
  routes: [
    // 路由重定向
    { path: '/', redirect: '/find' },
    { path: '/find', component: FindMusic },
    { path: '/my', component: MyMusic },
    { path: '*', component: NotFound },
  ],
})

export default router
