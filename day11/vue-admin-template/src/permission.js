import router, { asyncRoutes } from '@/router'
import store from '@/store'
import defaultSettings from '@/settings'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
const whiteList = ['/login', '/404']

router.beforeEach(async(to, from, next) => {
  NProgress.start()// 开启进度
  const token = store.getters.token
  if (token) {
    if (to.path === '/login') {
      next('/')
    } else {
      if (!store.getters.name) {
        const res = await store.dispatch('user/getInfo')
        console.log(res.roles.menus)
        console.log(asyncRoutes)
        const arr = asyncRoutes.filter(item => res.roles.menus.includes(item.name))
        store.commit('user/updateRoutes', arr)
        console.log(arr)
        // 动态添加路由规则
        router.addRoutes([...arr, { path: '*', redirect: '/404', hidden: true }])
        next(to.path)// hack方法 确保addRoutes已完成
      }
      next()
    }
  } else {
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next('/login')
    }
  }
  NProgress.done() // 避免用户登录之后再次跳转登录时进度条的bug
})

// 后置路由守卫
router.afterEach((to) => {
  NProgress.done() // 关闭进度
  if (to.meta.title) {
    document.title = defaultSettings.title + '-' + to.meta.title
  } else {
    document.title = defaultSettings.title
  }
})

// import router from './router'
// import store from './store'
// import { Message } from 'element-ui'
// import NProgress from 'nprogress' // progress bar
// import 'nprogress/nprogress.css' // progress bar style
// import { getToken } from '@/utils/auth' // get token from cookie
// import getPageTitle from '@/utils/get-page-title'

// NProgress.configure({ showSpinner: false }) // NProgress Configuration

// const whiteList = ['/login'] // no redirect whitelist

// router.beforeEach(async(to, from, next) => {
//   // start progress bar
//   NProgress.start()

//   // set page title
//   document.title = getPageTitle(to.meta.title)

//   // determine whether the user has logged in
//   const hasToken = getToken()

//   if (hasToken) {
//     if (to.path === '/login') {
//       // if is logged in, redirect to the home page
//       next({ path: '/' })
//       NProgress.done()
//     } else {
//       const hasGetUserInfo = store.getters.name
//       if (hasGetUserInfo) {
//         next()
//       } else {
//         try {
//           // get user info
//           await store.dispatch('user/getInfo')

//           next()
//         } catch (error) {
//           // remove token and go to login page to re-login
//           await store.dispatch('user/resetToken')
//           Message.error(error || 'Has Error')
//           next(`/login?redirect=${to.path}`)
//           NProgress.done()
//         }
//       }
//     }
//   } else {
//     /* has no token*/

//     if (whiteList.indexOf(to.path) !== -1) {
//       // in the free login whitelist, go directly
//       next()
//     } else {
//       // other pages that do not have permission to access are redirected to the login page.
//       next(`/login?redirect=${to.path}`)
//       NProgress.done()
//     }
//   }
// })

// router.afterEach(() => {
//   // finish progress bar
//   NProgress.done()
// })
