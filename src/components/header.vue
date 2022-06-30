<template>
  <el-header height="100px">
    <el-row :gutter="20">
      <el-col :span="4">
        <el-image :src="logoURL"></el-image>
      </el-col>
      <el-col :span="16"><div class="grid-content ep-bg-purple" />
        <el-input v-model="search" placeholder="Please input" style="height: 45px; width: 500px; border: 5px">
          <template #append>搜索</template>
        </el-input>
      </el-col>

      <el-col :span="3" push="1"><div class="grid-content ep-bg-purple" />
        <el-dropdown @command="usercommand">
                <span class="el-dropdown-link" >
                  {{ user.user_name_id }}<img :src="userFaceURL" style="width: 50px; height: 50px" />
                </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="1">个人中心</el-dropdown-item>
              <el-dropdown-item command="2">观看历史</el-dropdown-item>
              <el-dropdown-item command="3">我的收藏</el-dropdown-item>
              <el-dropdown-item command="4">设置</el-dropdown-item>
              <el-dropdown-item command="/">
                退出登录
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-col>
    </el-row>
  </el-header>
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
        <el-menu-item index="1" style="left: 100px; width: 200px" >
          <h1>首 页</h1>
        </el-menu-item>
        <el-menu-item index="/all" style="left: 100px; width: 200px">
          <h1>题 材</h1>
        </el-menu-item>
        <el-menu-item index="1" style="left: 100px; width: 200px">
          <h1>国家/地区</h1>
        </el-menu-item>
        <el-menu-item index="1" style="left: 100px; width: 200px">
          <h1>全部电影</h1>
        </el-menu-item>
        <el-menu-item index="1" style="left: 100px; width: 200px">
          <h1></h1>
        </el-menu-item>
      </el-menu>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import { getUser } from "@/utils/getData";
import {removeToken} from "@/utils/setToken";
import router from "@/router";

const logoURL = require('../assets/APPLOGO.jpg')
let user = getUser("userInformation")

const userFaceURL = require("../assets/face/" + user.user_name_id + ".jpg")

//个人中心下拉菜单响应
const usercommand = (command: string) => {
  if (command==='/') {
    sessionStorage.clear()
    removeToken("username")
  }
  router.push(command)
}

</script>



<style scoped>


</style>