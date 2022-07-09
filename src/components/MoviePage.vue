<template>
  <Header></Header>
  <el-main>
    <el-row>
      <el-col :span="20" :push="2" class="movie-container">
        <div style="margin-top: 50px;">
          <span class="title-container">{{ movie['movie_name'] }}</span>
        </div>
        <div style="margin-top: 40px; float: left;">
          <img :src="posterURL" style="margin-left: 200px"/>
        </div>

        <div class="movie-info" >
          <el-descriptions
              :column="1"
              size="default"
              direction="horizontal">
            <el-descriptions-item ><a style="font-size: medium">导演：</a><a href="" style="color: #37a; font-size: medium">{{ movie['movie_director'] }}</a></el-descriptions-item>
            <el-descriptions-item ><a style="font-size: medium">编剧：</a><a href="" style="color: #37a; font-size: medium">{{ movie['movie_screenwriter'] }}</a> </el-descriptions-item>
            <el-descriptions-item :span="2"><a style="font-size: medium">主演：</a><a style="font-size: medium;">{{ movie['movie_roles'] }}</a></el-descriptions-item>
            <el-descriptions-item ><a style="font-size: medium">类型：</a><a href="" style="color: #37a; font-size: medium">{{ movie['movie_style'] }}</a></el-descriptions-item>
            <el-descriptions-item ><a style="font-size: medium">制片国家/地区：</a><a style="font-size: medium">{{ movie['movie_country'] }}</a></el-descriptions-item>
            <el-descriptions-item ><a style="font-size: medium">语言：</a><a style="font-size: medium">{{ movie['movie_language'] }}</a></el-descriptions-item>
            <el-descriptions-item ><a style="font-size: medium">上映日期：</a><a style="font-size: medium">{{ movie['movie_date'] }}</a></el-descriptions-item>
            <el-descriptions-item ><a style="font-size: medium">片长：</a><a style="font-size: medium">{{ movie['movie_long'] }}</a></el-descriptions-item>
            <el-descriptions-item ><a style="font-size: medium">IMDb：</a><a style="font-size: medium">{{ movie['movie_imdb'] }}</a></el-descriptions-item>
          </el-descriptions>
        </div>
        <div class="card-container">
          <el-card class="box-card">
            <el-row>
              <div style="float: left;">
                电影评分
              </div>
            </el-row>
            <el-row>
              <el-col :span="6">
                <h1 style="float: left; margin-left: 7px;">{{ movie['movie_evaluation'] }}</h1>
              </el-col>
              <el-col :span="15" :push="1" style="float: right;">
                <el-rate
                    v-model="value"
                    disabled
                    size="large"
                    style="margin-left: 10px; margin-top: 6px"/><i style="margin-left: 3px; ">{{ movie2['person'] }}</i>
              </el-col>

            </el-row>
            <div class="demo-progress">
              <el-row>
                <a>5星</a><el-progress :percentage="movie2['star5']" />
              </el-row>
              <el-row>
                <a>4星</a><el-progress :percentage="movie2['star4']" />
              </el-row>
              <el-row>
                <a>3星</a><el-progress :percentage="movie2['star3']" />
              </el-row>
              <el-row>
                <a>2星</a><el-progress :percentage="movie2['star2']" />
              </el-row>
              <el-row>
                <a>1星</a><el-progress :percentage="movie2['star1']" />
              </el-row>
            </div>
            <el-divider />
            <div style="margin-bottom: 30px;">
              <a style="font-style: italic; color: #37a">好于{{ movie2['good'] }}</a>
            </div>

          </el-card>
        </div>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="20" :push="2" >
        <div class="evaluation-container">
          <el-check-tag class="ml-1" size="large" :checked="checked" @change="onChange">想看</el-check-tag>
          <el-check-tag class="ml-2" size="large" :checked="checked1" @change="onChange1">看过</el-check-tag>
          <span class="ev-text">评价：</span>
          <el-rate
              class="evaluation-star"
              v-model="evaluationValue"
              :texts="['oops', 'disappointed', 'normal', 'good', 'great']"
              show-text/>
        </div>
        <div class="writer-comment-container">
          <el-button style="margin-right: 850px" text :icon="Edit">写影评</el-button>
        </div>

        <div class="introduction-container">
          <h3 style="float: left; margin-left: 200px; margin-top: 40px">{{ movie['movie_name'] }}的剧情简介······</h3>
        </div>
        <div class="introduction-container1">
          <div style="background: #42b983; width: 1500px">
          <span style="float: left; margin-left: 200px; margin-right: 200px">
            <a style="width: 1000px; font-size: large">{{ movie2['introduction'] }}</a></span>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8" :push="3">
        <h3 >{{ movie['movie_name'] }}的影评······</h3>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="18" :push="3">
        <div class="review-list">
          <el-timeline style="margin-top: 10px; margin-left: 50px">
            <el-timeline-item placement="bottom"
                              v-for="(item, index) in comments"
                              :key="index">
              <el-card class="comments-cards">
                <el-row>
                  <el-col :span="12">
                    <div class="comments-user" >
                      <a style="float: left; margin-left: 30px; font-size: large; font-weight: lighter">{{ item['user_name'] }}</a>
                      <el-rate
                          v-model="value"
                          disabled
                          score-template="{value} points"
                          style="float: left; margin-left: 5px; margin-bottom: 3px" />
                      <span style="float: left; margin-left: 100px; margin-top: 5px">{{ item['time'] }}</span>

                    </div>
                  </el-col>
                  <el-col :span="10" :push="2">
                    <el-button :icon="Edit" circle />
                    <el-button :icon="Message" circle />
                    <el-button :icon="Star" circle />
                  </el-col>

                </el-row>
                <el-row >
                  <div class="comments-content">
                    <el-row>
                      <a style="color: #37a; font-size: medium"> {{ item['title'] }}</a>
                    </el-row>
                    <el-row>
                      <div style="margin-top: 1px">
                        <span style="margin-top: 0px;"> {{ item['comment'] }}</span>
                      </div>
                    </el-row>

                  </div>
                </el-row>
                <el-row>
                  <div class="comments-info">
                    <el-button :icon="CaretTop">{{ item['up'] }}</el-button>
                    <el-button :icon="CaretBottom">{{ item['down'] }}</el-button>
                    <el-button>{{ item['response'] }}</el-button>
                  </div>
                </el-row>
              </el-card>
            </el-timeline-item>
          </el-timeline>

        </div>
      </el-col>
    </el-row>
  </el-main>



</template>

<script lang="ts" setup>
import Header from '@/components/header.vue'
import { ref } from 'vue';
import { CaretTop, CaretBottom, Edit, Star, Message } from '@element-plus/icons-vue'
import { getType } from "../utils/getData"


const movie = getType('movie_info')
const comments = getType('movie_comment')
const movie2 = getType('movie_info2')

const posterURL = require("@/assets/poster/" + movie['movie_id'] + ".jpg")
const value = ref(3.7)
const evaluationValue = ref()



const checked = ref(false)
const checked1 = ref(false)
const onChange = (status: boolean) => {
  checked.value = status
}
const onChange1 = (status: boolean) => {
  checked1.value = status
}


</script>



<style scoped>
.movie-container {
}
.title-container {
  /*margin-right: 480px;*/
  font-size: 35px;
  font-weight: 700;
}

/*电影详细信息模块style*/
.movie-info {
  width: 500px;
  float: left;
  margin-left: 10px;
  margin-top: 40px;
}
a:link{
  color: #37a;
  text-decoration: none;
}


/*电影评分卡片*/
.text {
  font-size: 14px;
}
.demo-progress {
  margin-top: 10px;
}

.demo-progress .el-progress--line {
  float: right;
  margin-bottom: 15px;
  width: 150px;
}

.item {
  padding: 18px 0;
}

.box-card {
  width: 250px;
  height: 360px;
}
.card-container {
  float: left;
  margin-left: 30px;
  margin-top: 50px;
}

/*evaluation模块*/
.evaluation-container {
  height: 50px;
  margin-top: 10px;
}
.ml-1 {
  width: 100px;
  float: left;
  margin-top: 20px;
  margin-left: 300px;
}
.ml-2 {
  width: 100px;
  float: left;
  margin-top: 20px;
  margin-left: 40px;
}
.evaluation-star {
  float: left;
  margin-top: 20px;
}
.ev-text {
  float: left;
  margin-top: 25px;
  margin-left: 40px;
}
.writer-comment-container {
  margin-top: 4px;
}

/*剧情简介style*/
.introduction-container{
  height: 100px;
}
.introduction-container1{
  height: 200px;
}

/*影评列表*/
.review-list {
  margin-top: 10px;
}

.comments-cards {
  width: 1150px;
  height: 210px;
  max-height: 800px;
}
.comments-user {
  margin-top: 10px;
}


.comments-content {
  margin-left: 80px;
  margin-right: 100px;
  max-height: 500px;
}

.comments-info {
  margin-top: 7px;
  height: 80px;
  margin-left: 80px;
}


/*11111111111111*/

</style>