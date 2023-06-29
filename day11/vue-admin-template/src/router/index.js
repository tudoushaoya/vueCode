import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */

// 只有当路由规则有hidden:false（不写默认就是false),并且有meta,meta中有title以及icon才会显示

// 静态路由
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index')
    // hidden: false,
    // // 你不用的话可以忽略它，但是我们可以在里配置一些变量，变量是随意写 用的话要用to.meta.key
    // meta: {
    //   title: '登录',
    //   icon: 'eye'
    // }
  },

  {
    path: '/404',
    component: () => import('@/views/404')
    // hidden: false,
    // meta: {
    //   title: '404',
    //   icon: 'eye-open'
    // }
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard', // 默认访问后台首页就会重定向到仪表盘
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'Dashboard', icon: 'dashboard' }
    }]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

// 动态路由
export const asyncRoutes = [
  {
    path: '/department',
    component: () => import('@/layout'),
    children: [
      {
        path: '',
        name: 'department', // 暂时没有用 将来和动态筛选当前用户有哪些路由规则是有关系
        component: () => import('@/views/department'),
        meta: {
          title: '组织',
          icon: 'tree' // 图标
        }
      }
    ]
  },
  {
    path: '/approval',
    component: () => import('@/layout'),
    children: [{
      path: '',
      name: 'approval',
      component: () => import('@/views/approval'),
      meta: {
        title: '审批',
        icon: 'tree-table'
      }
    }]
  },
  {
    path: '/attendance',
    component: Layout,
    children: [{
      path: '',
      name: 'attendance',
      component: () => import('@/views/attendance'),
      meta: {
        title: '考勤',
        icon: 'excel'
      }
    }]
  },
  {
    path: '/employee',
    component: Layout,
    children: [{
      path: '',
      name: 'employee',
      component: () => import('@/views/employee'),
      meta: {
        title: '员工',
        icon: 'people'
      }
    },
    {
      path: 'detail/:id?',
      name: 'detail',
      component: () => import('@/views/employee/detail'),
      hidden: true,
      meta: {
        title: '员工详情'
      }
    }
    ]
  },
  {
    path: '/permission',
    component: Layout,
    children: [{
      path: '',
      name: 'permission',
      component: () => import('@/views/permission'),
      meta: {
        title: '权限',
        icon: 'lock'
      }
    }]
  },
  {
    path: '/role',
    component: Layout,
    children: [{
      path: '',
      name: 'role',
      component: () => import('@/views/role'),
      meta: {
        title: '角色',
        icon: 'setting'
      }
    }]
  },
  {
    path: '/salary',
    component: Layout,
    children: [{
      path: '',
      name: 'salary',
      component: () => import('@/views/salary'),
      meta: {
        title: '工资',
        icon: 'money'
      }
    }]
  },
  {
    path: '/social',
    component: Layout,
    children: [{
      path: '',
      name: 'social',
      component: () => import('@/views/social'),
      meta: {
        title: '社保',
        icon: 'table'
      }
    }]
  }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
