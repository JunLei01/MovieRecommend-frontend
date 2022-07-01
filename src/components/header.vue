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
.common-layout {
  /*background-image: linear-gradient(#59cde9, #0a2a88);*/
}

.el-dropdown-link img{
  width: 48px;
  height: 48px;
  border-radius: 24px;
  margin-left: 8px;
}

.hotContainer {
  width: 1400px;
  top: 10px;
  border: 1px solid #eaeaea;
}

.favoriateContainer {
  line-height: 100px;
  font-size: 50px;
  background: #cac6c6;
}

.tabsContainer {
  height: 700px;
  width: 1500px;
  background: #6b778c;
}

.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

/*.el-carousel__item:nth-child {*/
/*  background-color: #99a9bf;*/
/*}*/

/*.el-carousel__item:nth-child(2n + 1) {*/
/*  background-color: #d3dce6;*/
/*}*/


.el-dropdown-link {
  top: 5px;
  font-size: 20px;
  line-height: 1.7;

}

.el-row {
  margin-bottom: 20px;
  top: 10px;
}
.el-row:last-child {
  margin-bottom: 0;
}
.el-col {
  border-radius: 4px;
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

.time {
  font-size: 12px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.button {
  padding: 0;
  min-height: auto;
}

.image {
  width: 100%;
  height: 100%;
  display: block;
}

</style>