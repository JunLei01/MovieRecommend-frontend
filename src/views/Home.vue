<template>
  <div class="common-layout">
    <Header></Header>
    <el-main >
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
            <el-tab-pane label="推荐" name="first">
              <el-row>
                <el-col
                    v-for="(item, index) in 9"
                    :key="item"
                    :span="4"
                    :offset="index > 0 ? 1 : 0">
                  <el-card :body-style="{ padding: '0px' }" @click.native="movieInfo(recommend_movie['id'][item])">
                    <el-image :src="recommend_movie['poster'][item]" class="image"/>
                    <div style="padding: 14px;">
                      <el-row>
                        <span style="font-size: large; font-weight: bold">{{recommend_movie['name'][item]}}</span>
                      </el-row>
                      <el-row>
                        <div class="bottom">
                          <el-col :span="4">
                            <a style="font-size: 25px">{{recommend_movie['year'][item]}}</a>
                          </el-col>
                          <el-col :span="16">
                            <el-rate
                                style="margin-left: 10px"
                                v-model="value"
                                disabled/>
                          </el-col>
                          <el-col :span="1">
                            <a>{{recommend_movie['evaluation'][item]}}</a>
                          </el-col>
                        </div>
                      </el-row>
                    </div>
                  </el-card>
                </el-col>
              </el-row>
            </el-tab-pane>
            <el-tab-pane label="你可能喜欢" name="second">
              <el-row>
                <el-col
                    v-for="(item, index) in 9"
                    :key="item"
                    :span="4"
                    :offset="index > 0 ? 1 : 0">
                  <el-card :body-style="{ padding: '0px' }"  @click.native="movieInfo(type_movie['id'][item])">
                    <el-image :src="type_movie['poster'][item]" class="image"/>
                    <div style="padding: 14px;">
                      <el-row>
                        <span style="font-size: large; font-weight: bold">{{type_movie['name'][item]}}</span>
                      </el-row>
                      <el-row>
                        <div class="bottom">
                          <el-col :span="4">
                            <a style="font-size: 25px">{{type_movie['year'][item]}}</a>
                          </el-col>
                          <el-col :span="16">
                            <el-rate
                                style="margin-left: 10px"
                                v-model="value"
                                disabled/>
                          </el-col>
                          <el-col :span="1">
                            <a>{{type_movie['evaluation'][item]}}</a>
                          </el-col>
                        </div>
                      </el-row>
                    </div>
                  </el-card>
                </el-col>
              </el-row>
            </el-tab-pane>
            <el-tab-pane label="高评分电影" name="third">
              <el-row>
                <el-col
                    v-for="(item, index) in hotImageList"
                    :key="item.url"
                    :span="4"
                    :offset="index > 0 ? 1 : 0">
                  <el-card :body-style="{ padding: '0px' }">
                    <el-image :src="item.url" class="image"/>
                    <div style="padding: 14px;">
                      <el-row>
                        <span style="float: left; font-size: large; font-weight: bold">海贼王剧场版-red</span>
                      </el-row>
                      <el-row>
                        <div class="bottom">
                          <el-col :span="4">
                            <a style="font-size: 25px">2022</a>
                          </el-col>
                          <el-col :span="16">
                            <el-rate
                                style="margin-left: 10px"
                                v-model="value"
                                disabled/>
                          </el-col>
                          <el-col :span="1">
                            <a>9.7</a>
                          </el-col>
                        </div>
                      </el-row>
                    </div>
                  </el-card>
                </el-col>
              </el-row>
            </el-tab-pane>
            <el-tab-pane label="追影名单" name="fourth">
              <el-row>
                <el-col
                    v-for="(item, index) in hotImageList"
                    :key="item.url"
                    :span="4"
                    :offset="index > 0 ? 1 : 0">
                  <el-card :body-style="{ padding: '0px' }">
                    <el-image :src="item.url" class="image"/>
                    <div style="padding: 14px;">
                      <el-row>
                        <span style="float: left; font-size: large; font-weight: bold">海贼王剧场版-red</span>
                      </el-row>
                      <el-row>
                        <div class="bottom">
                          <el-col :span="4">
                            <a style="font-size: 25px">2022</a>
                          </el-col>
                          <el-col :span="16">
                            <el-rate
                                style="margin-left: 10px"
                                v-model="value"
                                disabled/>
                          </el-col>
                          <el-col :span="1">
                            <a>9.7</a>
                          </el-col>
                        </div>
                      </el-row>
                    </div>
                  </el-card>
                </el-col>
              </el-row>
            </el-tab-pane>
          </el-tabs>
        </el-col>
      </el-row>
    </el-main>

    <el-footer height="300px">
      <Footer></Footer>
    </el-footer>
  </div>
</template>

<script lang="ts" setup>
import { reactive, toRefs, ref } from 'vue'
import type { TabsPaneContext } from 'element-plus'
import router from "@/router";
import { get_brief_movie_info, get_brief_movie_info1 } from "../utils/getData"
import { ElMessage } from "element-plus";
import Header from '../components/header.vue'
import Footer from '../components/footer.vue'
import axios from "axios";
import { defineComponent, readonly } from "vue";

const footerList = readonly([
  "关于 | 帮助 | 条款 | 反馈",
  "Copyright  2019 Zhou-Junlei",
])


//获取数据
const type_movie = get_brief_movie_info('type_recommend')
const recommend_movie = get_brief_movie_info1('recommend')



const search = ref('')
const activeName = ref('first')
const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event)
}

const movieInfo = (movie_id: string) => {
  // sessionStorage.removeItem("movie_info")
  let data = new FormData()
  data.append('id', movie_id)
  axios.post('/api/movie_info', data).then(res => {
    console.log(res)
    if(res.data.code===200){
      console.log(res.data.movie, res.data.comment)
      sessionStorage.setItem("movie_info", JSON.stringify(res.data.movie))
      sessionStorage.setItem("movie_comment", JSON.stringify(res.data.comment))
      router.push('/movie_page')
    } else {
      console.log('error')
    }
  })
}

const toppic = reactive({
  topImgList: [
    { url:require('../assets/topMovie/spy.webp') },
    { url:require('../assets/topMovie/111.webp') },
    { url:require('../assets/topMovie/onepiecs.webp') },
    { url:require('../assets/topMovie/1680.jpg') },
    { url: require('../assets/topMovie/10.jpg') }
  ],
  hotImageList: [
    { url:require('../assets/poster/7.jpg') },    //肖申克
    { url:require('../assets/poster/25.jpg') },   // 霸王别姬
    { url:require('../assets/poster/15.jpg') },   //阿甘
    { url:require('../assets/poster/13.jpg') },   //泰坦
    { url:require('../assets/poster/14.jpg') },   //杀手
    { url:require('../assets/poster/69.jpg') },   //美丽人生
    { url:require('../assets/poster/10.jpg') },   //千与千寻
    { url:require('../assets/poster/78.jpg') },   //辛德勒的名单
    { url:require('../assets/poster/31.jpg') },   //盗梦空间
  ],
})
const { topImgList, hotImageList } = toRefs(toppic)



const value = ref(3.7)

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
  width: 270px;
  height: 400px;
  display: block;
}

</style>