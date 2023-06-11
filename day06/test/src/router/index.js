import Vue from 'vue'
import VueRouter from 'vue-router'
import MyMusic from '@/views/MyMusic.vue'
import FindMusic from '@/views/FindMusic.vue'
import NotFound from '@/views/NotFound.vue'
import SiChuan from '@/views/SiChuan.vue'
import ChengDu from '@/views/ChengDu.vue'
import NeiJiang from '@/views/NeiJiang.vue'
import ArticleDetail from '@/views/ArticleDetail.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/find'
  },
  {
    path: '/find',
    component: FindMusic,
    name: 'find'
  },
  {
    path: '/my',
    component: MyMusic
  },
  {
    path: '/sc',
    component: SiChuan,
    children: [
      {
        path: 'cd',
        component: ChengDu
      },
      {
        path: 'nj',
        component: NeiJiang
      }
    ]
  },
  {
    path: '/article/:id',
    component: ArticleDetail
  },
  {
    path: '*',
    component: NotFound
  }
]

const router = new VueRouter({
  routes
})

export default router
