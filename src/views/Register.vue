<template>
  <div>
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="registerContainer">
      <h3 class="loginTitle">注册</h3>

      <el-form-item label="用户名" prop="name">
        <el-input type="text" autocomplete="false" v-model="ruleForm.name" placeholder="名字"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input type="password" v-model="ruleForm.pass" autocomplete="off" placeholder="输入密码"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off" placeholder="确认密码"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="mobile">
        <el-input type="text" autocomplete="false" v-model="ruleForm.mobile" placeholder="输入手机号"></el-input>
      </el-form-item>
      <el-form-item prop="code">
        <el-input type="text" autocomplete="false" v-model="ruleForm.code" placeholder="验证码" style="width: 100px; margin-right: 5px"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')" style="width: 40%">提交</el-button>
        <el-button @click="resetForm('ruleForm')" style="width: 40%">重置</el-button>
      </el-form-item>

      <el-form-item>
        <el-link href="/" type="info" style="position: absolute; right: 10px">已有账号？去登录</el-link>
      </el-form-item>

    </el-form>

  </div>
</template>

<script>
import { ElMessage } from "element-plus";
import axios, { Axios } from "axios";
import router from "@/router";


export default {
  name: "Register",
  data() {
    var checkMobile = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('手机号不能为空'));
      }
      setTimeout(() => {
          if (value.length != 11) {
            callback(new Error('手机号非法！'));
          } else {
            callback();
          }
      }, 1000);
    };
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        name: '',
        pass: '',
        checkPass: '',
        mobile: '',
        code: ''
      },
      rules: {
        name: [ { required:true, message: '名字不能为空', trigger: ['blur', 'change'] } ],
        pass: [ { required:true, validator: validatePass, trigger: 'blur' } ],
        checkPass: [ { required:true, validator: validatePass2, trigger: 'blur' } ],
        mobile: [ { required:true, validator: checkMobile, trigger: ['blur', 'change'] } ],
        code: [ { required:true, message: '验证码不为空', trigger: ['blur', 'change'] } ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let data = new FormData()
          data.append('name', this.ruleForm.name)
          data.append('password', this.ruleForm.pass)
          data.append('password2', this.ruleForm.checkPass)
          data.append('code', this.ruleForm.code)
          data.append('mobile', this.ruleForm.mobile)
          axios.post("/api/register", data).then(
               res => {
                if (res.data.code === '400') {
                  console.log(res.data.message)
                  ElMessage.error({ message: res.data.message })
                }else {
                  console.log(res.data.message)
                  ElMessage.success({ message: res.data.message })
                  router.push('\\'+'/')
                }
              }
          )
        } else {
          ElMessage.error({
            showClose: true,
            message: "请填写所有字段！",
            center: true,
          })
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>


<style>
    .registerContainer{
      border-radius: 15px;
      background-clip: padding-box;
      margin: 188px auto;
      width: 350px;
      padding: 15px 35px 15px 35px;
      background: #fff;
      border: 1px solid #eaeaea;
      box-shadow: 0 0 25px #cac6c6;
    }
</style>