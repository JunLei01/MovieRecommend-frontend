<template >
    <div class="writeBoard">
      <el-form :rules="rules" ref="loginForm" :model="loginForm" class="loginContainer">
        <h3 class="loginTitle">登  录</h3>

        <el-form-item label="账号" prop="username">
            <el-input type="text" autocomplete="false" v-model="loginForm.username" placeholder="请输入账号"></el-input>
        </el-form-item>

        <el-form-item label="密码" prop="password">
            <el-input type="password" autocomplete="false" v-model="loginForm.password" placeholder="请输入密码"></el-input>
        </el-form-item>

        <el-form-item prop="code">
            <el-input type="text" autocomplete="false" v-model="loginForm.code" placeholder="验证码" style="width: 200px; margin-right: 5px"></el-input>
            <img :src="captchUrl" @click="updateCaptcha">
        </el-form-item>

        <el-form-item>
            <el-checkbox v-model="checked" >记住密码</el-checkbox>
            <el-button type="primary" style="width: 100%" @click="submitLogin">登录</el-button>
        </el-form-item>

        <el-form-item>
            <el-link href="/register" type="info" style="position: absolute; right: 10px">没有账号？去注册</el-link>
            <el-link type="info">忘记密码</el-link>
        </el-form-item>

      </el-form>
    </div>
</template>

<script>
import {ElMessage} from "element-plus";
import axios, {Axios} from "axios";
import router from '../router'
import { setToken } from "../utils/setToken";

export default {
  name: "Login",
  data(){
    return{
      captchUrl: require('../assets/code.jpg'),
      capchCode: '',
      loginForm:{
        username: '',
        password: '',
        code: ''
      },
      checked: true,
      rules:{
        username: [{ required: true, message: '请输入账号', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, message: '密码的长度至少6位', trigger: 'blur' },],
        code: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
      }
    }
  },
  methods:{
    updateCaptcha(){
      axios.post('/api/capture').then(res => {
        this.capchCode = res.data.code
        sessionStorage.setItem("code", res.data.code)
      })
    },
    submitLogin(){
      console.log(this.capchCode)
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.capchCode = sessionStorage.getItem("code")
          console.log(this.loginForm.code, this.capchCode, 111111111)
          if(this.loginForm.code){
            let data = new FormData()
            data.append('name', this.loginForm.username)
            data.append('password', this.loginForm.password)
            axios.post('/api/login', data).then(res => {
              console.log(res, typeof res)
              if ( res.data.code===200 ){
                if (res.data.first===0){
                  ElMessage.warning({message: res.data.message})
                  console.log(res.data.first)
                  router.push('/complete')
                }else {
                  console.log('login successful！')
                  ElMessage.success({message: res.data.message})
                  setToken("username", res.data.userInfo['user_account_id'])
                  console.log(res.data.first)
                  sessionStorage.setItem("userInformation", JSON.stringify(res.data.userInfo))
                  sessionStorage.setItem("type_recommend", JSON.stringify(res.data.type_recommend))
                  sessionStorage.setItem('recommend', JSON.stringify(res.data.recommend))
                  router.push('/home')
                }
              }else {
                console.log('login fail!')
                ElMessage.error({message: res.data.message})
                this.updateCaptcha()
              }
            })
          }else {
            ElMessage.error({message: "验证码错误！"})
          }

        } else {
          ElMessage.error({
            showClose: true,
            message: "请填写所有字段！",
            center: true,
          });
          return false;
        }
      });
    }
  }
}
</script>

<style>
    .writeBoard{
      background-image: url("../assets/background.png");
      background-size: cover;
      width: 100%;
      height: 100%;
      position: fixed;
    }
    .loginContainer{
      border-radius: 15px 50px;
      background-clip: padding-box;
      margin: 188px auto;
      width: 350px;
      position: absolute;
      right: 300px;
      top: 80px;
      padding: 15px 35px 15px 35px;
      border: 1px solid #eaeaea;
      box-shadow: 0 0 25px #cac6c6;
      background-color: #fff;
    }
    .loginTitle{
      margin: 0px auto 48px auto;
      text-align: center;
    }


    .el-button .custom-loading .circular {
      margin-right: 6px;
      width: 18px;
      height: 18px;
      animation: loading-rotate 2s linear infinite;
    }
    .el-button .custom-loading .circular .path {
      animation: loading-dash 1.5s ease-in-out infinite;
      stroke-dasharray: 90, 150;
      stroke-dashoffset: 0;
      stroke-width: 2;
      stroke: var(--el-button-text-color);
      stroke-linecap: round;
    }
    .el-form-item__content{
      display: flex;
      align-items: center;
    }
</style>