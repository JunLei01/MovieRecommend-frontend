<template>
  <Header></Header>
  <el-row style="background: #EAEAEA">
    <el-col :span="4" :push="4" >
      <div class="demo-image__preview">
        <el-image
            style="width: 300px; height: 300px; border-radius: 50%"
            :src="url"
            :preview-src-list="srcList"
            :initial-index="4"
            fit="cover"/>
      </div>
    </el-col>

    <el-col :span="8" :push="6">
      <el-row>
        <h2>★个人资料</h2>
      </el-row>
      <el-row>
        <el-col :span="4">
          <h3>昵称：</h3>
        </el-col>
        <el-col :span="8">
          <h4 style="float: left">{{ user['user_name'] }}</h4>
        </el-col>
      </el-row>
      <el-row>
          <el-col :span="4">
            <h3>账号：</h3>
          </el-col>
          <el-col :span="8">
            <h4 style="float: left">{{ user['user_account'] }}</h4>
          </el-col>
      </el-row>
      <el-row>
        <el-col :span="4">
          <h3>电话：</h3>
        </el-col>
        <el-col :span="8">
          <h4 style="float: left">{{ user['user_phone'] }}</h4>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4">
          <h3>邮箱：</h3>
        </el-col>
        <el-col :span="8">
          <h4 style="float: left">{{ user['user_email'] }}</h4>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4">
          <h3>简介：</h3>
        </el-col>
        <el-col :span="8">
          <h4 style="float: left">该用户很懒什么也没写！</h4>
        </el-col>
      </el-row>
    </el-col>
  </el-row>

  <el-row height="200px" style="background: #cac6c6">
    <el-col :span="8" :push="8">
      <el-menu
          :default-active="activeIndex"
          class="el-menu-demo"
          mode="horizontal"
          style="background: #cac6c6"
          @select="handleSelect">
        <el-menu-item index="/history" style="margin-left: 60px"><h2>观看记录</h2></el-menu-item>
        <el-menu-item index="/favorite" style="margin-left: 60px"><h2>我的收藏</h2></el-menu-item>
        <el-menu-item index="/my_comment" style="margin-left: 60px"><h2>我的评论</h2></el-menu-item>
      </el-menu>
    </el-col>
  </el-row>
  <router-view></router-view>
</template>


<script lang="ts">
import Header from "@/components/header.vue";
import router from "@/router";
import { getUser } from '@/utils/getData'

export default {
  components: { Header },
  setup(){

    const srcList = require('../assets/face/zjl.jpg')
    const handleSelect = (index: string) => {
      router.push(index)
    }
    const user = getUser('userInformation')
    const url = require('../assets/face/xdx.jpg')
    return {
      url,
      srcList,
      handleSelect,
      user,
    }
  }
}

</script>

<style scoped>
/*头像部分*/
.demo-image__error .image-slot {
  font-size: 30px;
}
.demo-image__error .image-slot .el-icon {
  font-size: 30px;
}
.demo-image__error .el-image {
  width: 100%;
  height: 200px;
}
.demo-image__preview {
  margin-top: 50px;
  margin-bottom: 50px;
  background: #eaeaea;
}

.el-descriptions {
  margin-top: 20px;
}

.my-type-container {
  width: 300px;
  height: 300px;
  background: #59cde9;
}
.movie-img-contianer {
  margin-top: 30px;
  width: 135px;
  height: 200px;
}

.movie-container {
  margin-top: 10px;
  width: 80%;
  height: 80%;
  margin-left: 50px;
}
.history-container {
  margin-left: 200px;
  width: 70%;

}

</style>