import Vue from 'vue'
import Router from 'vue-router'
/* Layout */
import Layout from '@/layout'
/* Router Modules */

Vue.use(Router)

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
    icon: 'svg-name'             the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: 'dashboard', icon: 'dashboard', affix: true }
      }
    ]
  },
  {
    path: '/apply',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'advertDetail/:id(\\d+)',
        component: () => import('@/views/apply/advertDetail'),
        name: 'AdvertDetail',
        meta: { title: 'advertDetail' },
        hidden: true
      },
      {
        path: 'businessDetail/:id(\\d+)',
        component: () => import('@/views/apply/businessDetail'),
        name: 'BusinessDetail',
        meta: { title: 'businessDetail' },
        hidden: true
      },
      {
        path: 'agentDetail/:id(\\d+)',
        component: () => import('@/views/apply/agentDetail'),
        name: 'AgentDetail',
        meta: { title: 'agentDetail' },
        hidden: true
      },
      {
        path: 'feedbackDetail/:id(\\d+)',
        component: () => import('@/views/apply/feedbackDetail'),
        name: 'FeedbackDetail',
        meta: { title: 'feedbackDetail' },
        hidden: true
      }
    ]
  },
  {
    path: '/customer',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'amountDetails/:cid(\\d+)',
        component: () => import('@/views/customer/amountDetails'),
        name: 'AmountDetails',
        meta: { title: 'amountDetails' },
        hidden: true
      },
      {
        path: 'depositDetails/:cid(\\d+)',
        component: () => import('@/views/customer/depositDetails'),
        name: 'DepositDetails',
        meta: { title: 'depositDetails' },
        hidden: true
      },
      {
        path: 'timeDetails/:cid(\\d+)',
        component: () => import('@/views/customer/timeDetails'),
        name: 'TimeDetails',
        meta: { title: 'timeDetails' },
        hidden: true
      }
    ]
  },
  {
    path: '/order',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'detail/:id(\\d+)',
        component: () => import('@/views/order/detail'),
        name: 'OrderDetail',
        meta: { title: 'orderDetail' },
        hidden: true
      }
    ]
  },
  {
    path: '/system',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'agreementDetail/:id(\\d+)',
        component: () => import('@/views/system/agreementDetail'),
        name: 'AgreementDetail',
        meta: { title: 'agreementDetail' },
        hidden: true
      },
      {
        path: 'guideDetail/:type(\\d+)',
        component: () => import('@/views/system/guideDetail'),
        name: 'GuideDetail',
        meta: { title: 'guideDetail' },
        hidden: true
      }
    ]
  },
  {
    path: '/advert',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'editAdvert/:id',
        component: () => import('@/views/advert/editAdvert'),
        name: 'EditAdvert',
        meta: { title: 'editAdvert' },
        hidden: true
      }
    ]
  },
  {
    path: '/device',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'editDevice/:id',
        component: () => import('@/views/device/editDevice'),
        name: 'EditDevice',
        meta: { title: 'editDevice' },
        hidden: true
      },
      {
        path: 'deviceDetail/:id',
        component: () => import('@/views/device/deviceDetail'),
        name: 'DeviceDetail',
        meta: { title: 'deviceDetail' },
        hidden: true
      }
    ]
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
