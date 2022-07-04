<template>
  <Header></Header>
  <el-row style="background: #42b983">
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
          <h4>fasdfagaerga</h4>
        </el-col>
      </el-row>
      <el-row>
          <el-col :span="4">
            <h3>账号：</h3>
          </el-col>
          <el-col :span="8">
            <h4>fasdfagaerga</h4>
          </el-col>
      </el-row>
      <el-row>
        <el-col :span="4">
          <h3>电话：</h3>
        </el-col>
        <el-col :span="8">
          <h4>fasdfagaerga</h4>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4">
          <h3>邮箱：</h3>
        </el-col>
        <el-col :span="8">
          <h4>fasdfagaerga</h4>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4">
          <h3>简介：</h3>
        </el-col>
        <el-col :span="8">
          <h4>fasdfagaerga</h4>
        </el-col>
      </el-row>
    </el-col>
  </el-row>

  <el-row height="200px">
    <el-col :span="10" :push="7" style="background: #59cde9">
      <el-menu
          :default-active="activeIndex"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect">
        <el-menu-item index="1"><h2>我的元素</h2></el-menu-item>
        <el-menu-item index="2"><h2>观看记录</h2></el-menu-item>
        <el-menu-item index="3"><h2>我的收藏</h2></el-menu-item>
        <el-menu-item index="4"><h2>我的评论</h2></el-menu-item>
      </el-menu>
    </el-col>
  </el-row>

<!--  <el-row>-->
<!--    <el-col :span="12" :push="6" style="background: #59cde9">-->
<!--      <div class="my-type-container">-->
<!--      </div>-->
<!--    </el-col>-->
<!--  </el-row>-->
  <div v-for="(item, index) in 20" class="history-container">
    <el-row>
      <el-col :span="4" :push="5">
        <div class="movie-img-contianer">
          <el-image :src="require('../assets/poster/3.jpg')" fit="cover" />
        </div><el-divider />
      </el-col>
      <el-col :span="15" :push="3">
        <div class="movie-container">
          <el-row>
            <el-col :span="12">
              <span style="font-size: 25px; color: #000">我和我的父辈</span>
            </el-col>
            <el-col :span="4">
              <span>9.2分</span>
            </el-col>
          </el-row>
          <el-row style="margin-top: 10px">
            <span style="font-size: 18px; color: #000; height: 30px; font-weight: bold">导演：</span>
            <span style="height: 30px">刘江江</span>
          </el-row>
          <el-row style="margin-top: 10px">
            <span style="font-size: 18px; color: #000; height: 30px; font-weight: bold">演员：</span>
            <span style="height: 30px; margin-top: 3px">'朱一龙','杨恩又','王戈','刘陆','罗京民','吴倩','郑卫莉','陈创','李春嫒','钟宇升','刘亚津','小爱','韩延'</span>
          </el-row>
          <el-row style="margin-top: 10px">
            <span style="font-size: 18px; color: #000; height: 30px; font-weight: bold">简介</span>
          </el-row>
          <el-row style="margin-top: 10px">
            <span style="font-size: 15px; color: #000; height: 30px">2022-7-4 18:30:34</span>
          </el-row>
        </div><el-divider />
      </el-col>
    </el-row>
  </div>

</template>


<script lang="ts">
import Header from "../components/header.vue";
import Movie from "@/views/movieList.vue";

export default {
  components: {Movie, Header},
  setup(){
    const url = require('../assets/face/xks.jpeg')
    const srcList = require('../assets/face/zjl.jpg')
    return {
      url,
      srcList,
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
  width: 135px;
  height: 200px;
}

.movie-container {
  margin-top: 10px;
  width: 80%;
  height: 80%;
  margin-left: 50px;
  background: #42b983;
}
.history-container {
  width: 80%;

}

</style>