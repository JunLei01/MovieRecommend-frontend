import { createStore } from 'vuex'
import { getToken } from '@/utils/setToken'
import axios from "axios";


import { ElMessage } from 'element-plus'
import router from '../router'
import * as url from "url";

axios.defaults.timeout = 2000
axios.defaults.headers.post['Content-Type'] = "application/json;charset=utf-8"
axios.defaults.baseURL = ""

axios.interceptors.request.use((config)=>{
  config.headers = config.headers || {}
  if (getToken('token')){
    // @ts-ignore
    config.headers.token = getToken('token')
  }
  return config;
},error => {
  console.log(error)
})

// 响应拦截器
axios.interceptors.response.use(success=>{
  //业务逻辑错误
  if (success.status && success.status == 200) {
    if (success.data.code==500||success.data.code==401||success.data.status==403){
      ElMessage.error({message:success.data.message,
        center:true})
      return;
    }
    if (success.data.message){
      ElMessage.success({message:success.data.message,
        center:true})
    }
  }
  return success.data;
},error => {
  if (error.response.code==404||error.response.code==504) {
    ElMessage.error({message: '服务器被吃了o(╯□╰)o',
      center:true});
  }else if (error.response.code==403) {
    ElMessage.error({message: '权限不足，请联系管理员！',
      center:true})
  }else if (error.response.code==401) {
    ElMessage.error({message: '尚未登录，请登录！',
      center:true})
    router.replace('/')
  }else {
    if (error.response.data.message){
      ElMessage.error({message: error.response.data.message,
        center:true})
    } else {
      ElMessage.error({message: '未知错误！',
        center:true})
    }
  }
  return;
});

// export function fetch (resolve: any, reject: any) {
//   return new Promise((resolve, reject) => {
//     axios.post(url, params).then(
//         res => {
//           console.log("get data!")
//           resolve(res.data.userInfo);
//         }
//     ).catch((error) => {
//       console.log(error)
//       reject(error)
//     })
//   })
// }


//
// let base = ''
// export const postRequest = (url, params) => {
//   return axios({
//     method: 'post',
//     url: '${base}${url}',
//     data: params
//   })
// }
//
// export const putRequest = (url, params) => {
//   return axios({
//     method: 'put',
//     url: '${base}${url}',
//     data: params
//   })
// }
//
// export const getRequest = (url, params) => {
//   return axios({
//     method: 'get',
//     url: '${base}${url}',
//     data: params
//   })
// }
//
// export const deleteRequest = (url, params) => {
//   return axios({
//     method: 'delete',
//     url: '${base}${url}',
//     data: params
//   })
// }