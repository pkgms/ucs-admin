import Vue from 'vue';
import VueRouter from 'vue-router';
/* Layout */
import Layout from '@/layout/layout.vue'

Vue.use(VueRouter);

const routes = [
  { path: '*', redirect: '/haveNot' },
  {
    path: '/haveNot',
    name: 'haveNot',
    component: () => import('@/views/haveNot/haveNot.vue'),
  },
  {
    path: '/',
    redirect: '/user',
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/login.vue'),
  },
  // 用户中心
  {
    path: '/user',
    name: '用户中心',
    redirect: '/user/index',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'index',
        component: () => import('@/views/user/index.vue'),
      },
      {
        path: 'edit/:id',
        name: '用户编辑',
        meta: {
          type: '1',
          status: [
            { value: '/user/index', title: '用户中心', Field: '' },
          ],
        },
        component: () => import('@/views/user/edit.vue'),
      },
    ],
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
