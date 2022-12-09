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


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
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
    component: SearchResult
  },
  {
    path: '/document',
    name: 'documentDisplay',
    component: DocumentDisplay
  },
  {
    path: '/institution',
    name: 'institutionPortal',
    component: InstitutionPortal
  },
  {
    path: '/scholar',
    name: 'scholarPortal',
    component: ScholarPortal
  },
  {
    path: '/apply',
    name: 'applySettle',
    component: ApplySettle
  },
  {
    path: '/user',
    name: 'userCenter',
    component: UserCenter
  },
  {
    path: '/admin',
    name: 'adminView',
    component: adminView
  },
  {
    path: '/searchAdvance',
    name: 'searchAdvance',
    component: () => import('../components/searchResult/searchAdvance/AdvanceMain.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


export default router
