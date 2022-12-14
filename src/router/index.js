import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SearchResult from '../views/SearchResult.vue'
import DocumentDisplay from '../views/DocumentDisplay.vue'
import InstitutionPortal from '../views/InstitutionPortal/InstitutionPortal.vue'
import ScholarPortal from '../views/ScholarPortal/ScholarPortal.vue'
import ApplySettle from "@/views/ScholarPortal/ApplySettle.vue";
import UserCenter from '../views/UserCenter.vue'
import adminView from "@/views/Administrator/AdminView";
import LoginView from "@/views/LoginView";
import confirmView from "@/views/ConfirmView";


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta:{
      title:"ZScholar"
    },
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
    meta:{
      title:"登录 - ZScholar"
    },
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/search',
    name: 'searchResult',
    component: SearchResult,
    meta:{
      title:"搜索结果 - ZScholar"
    },
  },
  {
    path: '/document',
    name: 'documentDisplay',
    component: DocumentDisplay,
    meta:{
      title:"论文详情 - ZScholar"
    },
  },
  {
    path: '/institution/:institutionID',
    name: 'institutionPortal',
    component: InstitutionPortal,
    meta:{
      title:"机构门户 - ZScholar"
    },
  },
  {
    path: '/scholar',
    name: 'scholarPortal',
    component: ScholarPortal,
    meta:{
      title:"学者门户 - ZScholar"
    },
  },
  {
    path: '/apply',
    name: 'applySettle',
    component: ApplySettle,
    meta:{
      title:"申请入住 - ZScholar"
    },
  },
  {
    path: '/user',
    name: 'userCenter',
    component: UserCenter,
    meta:{
      title:"个人图书馆 - ZScholar"
    },
  },
  {
    path: '/confirm',
    name: 'confirm',
    component: confirmView,
    meta:{
      title:"账号验证 - ZScholar"
    },
  },
  {
    path: '/admin',
    name: 'adminView',
    component: adminView,
    meta:{
      title:"管理中心 - ZScholar"
    },
  },
  {
    path: '/searchAdvance',
    name: 'searchAdvance',
    component: () => import('../components/searchResult/searchAdvance/AdvanceMain.vue'),
    meta:{
      title:"高级搜索 - ZScholar"
    },
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


export default router
