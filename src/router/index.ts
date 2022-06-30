import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'login',
    component: ()=> import('@/views/Login.vue'),
  },
  {
    path: '/register',
    name: 'register',
    component: ()=> import('@/views/Register.vue')
  },
  {
    path: '/home',
    name: 'home',
    component: ()=> import('@/views/Home.vue'),
    children:[
      {
        path: '/all',
        name: 'all',
        component: ()=> import('@/views/All.vue')
      }
    ]
  },
  {
    path: '/complete',
    name: 'complete',
    component: ()=> import('@/views/Complete.vue')
  },
  {
    path: '/movie_page',
    name: 'movie_page',
    component: ()=> import('@/components/MoviePage.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// router.beforeEach((to, from, next) =>{
//   console.log(localStorage.getItem('token'))
//   const token:string | null = localStorage.getItem('token')
//   if (!token && to.path!=='/'){
//     return '/'
//   }else if(to.path!=='/' && token){
//
//   }
// })

export default router
