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
  },
  {
    path: '/movie_list',
    name: 'movie_list',
    component: ()=> import('@/views/movieList.vue')
  },
  {
    path: '/person_center',
    name: 'person_center',
    component: ()=> import('@/views/person_Center.vue'),
    children: [
      {
        path: '/myspace',
        name: 'myspace',
        component: ()=> import('@/views/myType.vue')
      },
      {
        path: '/history',
        name: 'history',
        component: ()=> import('@/views/myHistory.vue')
      },
      {
        path: '/favorite',
        name: 'favorite',
        component: ()=> import('@/views/myFavorite.vue')
      }
    ]
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
