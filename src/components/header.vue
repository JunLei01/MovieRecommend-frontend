<template>
  <el-row :gutter="10">
    <el-col>
      <el-menu
          :default-active="activeIndex2"
          class="headerContainter"
          mode="horizontal"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          @select="menuClick">

        <el-col :span="4">
<!--          <el-image :src="logoURL"></el-image>-->
        </el-col>


        <el-menu-item index="/home" style="width: 200px" >
          <h1>首 页</h1>
        </el-menu-item>
        <el-menu-item index="/movie_list" style="width: 200px">
          <h1>题 材</h1>
        </el-menu-item>

        <el-col :span="8"><div class="grid-content ep-bg-purple" />
          <el-input v-model="search" placeholder="Please input" style="height: 45px; width: 500px; border: 5px">
            <template #append>搜索</template>
          </el-input>
        </el-col>

        <el-col :span="3" :push="2"><div class="grid-content ep-bg-purple" />
          <el-dropdown @command="usercommand">
                <span class="el-dropdown-link" style="color: #eaeaea">
                  {{ user.user_name }}<img :src="userFaceURL" style="width: 50px; height: 50px; " />
                </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="/person_center">个人中心</el-dropdown-item>
                <el-dropdown-item command="/history">观看历史</el-dropdown-item>
                <el-dropdown-item command="/favorite">我的收藏</el-dropdown-item>
                <el-dropdown-item command="4">设置</el-dropdown-item>
                <el-dropdown-item command="/">
                  退出登录
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </el-col>
      </el-menu>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import { getUser } from "@/utils/getData";
import {removeToken} from "@/utils/setToken";
import router from "@/router";
import axios from "axios";
import {ElMessage} from "element-plus";

const logoURL = require('../assets/APPLOGO.jpg')
let user = getUser("userInformation")

const userFaceURL = require("../assets/face/xdx.jpg")

//个人中心下拉菜单响应
const usercommand = (command: string) => {
  if (command==='/') {
    sessionStorage.clear()
    removeToken("username")
    router.push(command)
  } else {
    let data = new FormData
    data.append('account', user['user_account'])
    axios.post('/api/get_record', data).then(res => {
      if (res.data.code === 200) {
        sessionStorage.setItem('history', JSON.stringify(res.data.surf))
        sessionStorage.setItem('favorite', JSON.stringify(res.data.favorite))
      }else {
        ElMessage.warning({message: "用户数据丢失！"})
      }
    })
    router.push(command)
    }
}

const menuClick = (index: string) => {
  if(index==="/movie_list"){
    let data = new FormData;
    data.append("type", "全部类型")
    data.append("year", "全部年份")
    data.append("region", "全部地区")
    axios.post('/api/all_movie', data).then(res => {
      if(res.data.code === 200){
        console.log(res)
        sessionStorage.setItem("all_movie", JSON.stringify(res.data.movies))
        router.push(index)
      }else {
        console.log(404)
      }
    })
  }else {
    router.push(index)
  }
}

</script>



<style scoped>
.common-layout {
  /*background-image: linear-gradient(#59cde9, #0a2a88);*/
}

.el-dropdown-link img{
  width: 48px;
  height: 48px;
  border-radius: 24px;
  margin-left: 8px;
}


.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}



.el-dropdown-link {
  top: 0px;
  font-size: 20px;
  line-height: 1.7;
  margin-bottom: 10px;
}


.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #59cde9;
  font-size: 32px;
  font-weight: 600;
}

</style>