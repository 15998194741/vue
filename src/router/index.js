import Vue from 'vue';
import Router from 'vue-router';
import { getCookie } from '@/utils/cookie-utils';
Vue.use(Router);

/* Layout */
import Layout from '@/layout';

/**
 * 路由
 * @type {*[]}
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    meta: { title: '登录' },
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/index',
    name: 'index',
    children: [
      {
        path: 'index',
        name: 'business-index',
        meta: { title: '首页' },
        component: () => import('@/views/business')
      },
    ]
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    meta: { title: '404' },
    hidden: true
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
];

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
});

const router = createRouter();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;
