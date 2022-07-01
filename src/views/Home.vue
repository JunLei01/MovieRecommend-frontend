<template>
  <div class="common-layout">
    <Header></Header>
    <el-main>
      <router-view />
      <el-carousel :interval="4000" height="600px" >
        <el-carousel-item v-for="item in topImgList" :key="item.url" class="carousel1">
          <el-image :src="item.url"></el-image>
        </el-carousel-item>
      </el-carousel>
      <el-row>
        <el-col :span="16" :push="3">
          <div class="hotContainer">
            <el-carousel :interval="4000" type="card" height="400px">
              <el-carousel-item v-for="item in hotImageList" :key="item" width="270px" >
                <el-image :src="item.url"></el-image>
              </el-carousel-item>
            </el-carousel>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4" :push="2">
            <h2 class="favoriateContainer"><el-divider direction="vertical" />
              猜你喜欢</h2>
        </el-col>

      </el-row>
      <el-row>
        <el-col :span="20" :push="2">
          <el-tabs
              v-model="activeName"
              type="card"
              class="demo-tabs"
              @tab-click="handleClick">
            <el-tab-pane label="你的口味" name="first">
              <el-row>
                <el-col
                    v-for="(item, index) in hotImageList"
                    :key="item.url"
                    :span="4"
                    :offset="index > 0 ? 1 : 0">
                  <el-card :body-style="{ padding: '0px' }">
                    <el-image :src="item.url" class="image"/>
                    <div style="padding: 14px">
                      <span>Yummy hamburger</span>
                      <div class="bottom">
                        <time class="time">{{ currentDate }}</time>
                        <el-button text class="button">Operating</el-button>
                      </div>
                    </div>
                  </el-card>
                </el-col>
              </el-row>
            </el-tab-pane>
            <el-tab-pane label="近期热映" name="second">
              <el-row>
                <el-col
                    v-for="(item, index) in hotImageList"
                    :key="item.url"
                    :span="4"
                    :offset="index > 0 ? 1 : 0">
                  <el-card :body-style="{ padding: '0px' }">
                    <el-image :src="item.url" class="image"/>
                    <div style="padding: 14px">
                      <span>Yummy hamburger</span>
                      <div class="bottom">
                        <time class="time">{{ currentDate }}</time>
                        <el-button text class="button">Operating</el-button>
                      </div>
                    </div>
                  </el-card>
                </el-col>
              </el-row>
            </el-tab-pane>
            <el-tab-pane label="高评分电影" name="third">Role</el-tab-pane>
            <el-tab-pane label="追影名单" name="fourth">Task</el-tab-pane>
          </el-tabs>
        </el-col>
      </el-row>
    </el-main>

    <el-footer height="300px" style="background: #241e22"></el-footer>
  </div>
</template>

<script lang="ts" setup>
import { reactive, toRefs, ref } from 'vue'
import type { TabsPaneContext } from 'element-plus'
import router from "@/router";
import { getUser, getType } from "../utils/getData"
import { removeToken } from "@/utils/setToken";
import { ElMessage } from "element-plus";
import Header from '../components/header.vue'


//获取数据

let type_recommend = getType("type_recommend")




const search = ref('')
const activeName = ref('first')
const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event)
}

const toppic = reactive({
  topImgList: [
    { url:require('../assets/topMovie/spy.webp') },
    { url:require('../assets/topMovie/111.webp') },
    { url:require('../assets/topMovie/onepiecs.webp') },
    { url:require('../assets/topMovie/1680.jpg')},
  ],
  hotImageList: [
    { url:require('../assets/favorite/red.jpg') },
    { url:require('../assets/favorite/5.jpg') },
    { url:require('../assets/favorite/7.jpg') },
    { url:require('../assets/favorite/10.jpg') },
    { url:require('../assets/favorite/11.jpg') },
    { url:require('../assets/favorite/13.jpg') },
    { url:require('../assets/favorite/16.jpg') },
    { url:require('../assets/favorite/17.jpg') },
    { url:require('../assets/favorite/21.jpg') },
  ],
})
const { topImgList, hotImageList } = toRefs(toppic)

const menuClick = (index: string) => {
  router.push(index)
}


</script>

<style scoped>
.common-layout {
  /*background-image: linear-gradient(#59cde9, #0a2a88);*/
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