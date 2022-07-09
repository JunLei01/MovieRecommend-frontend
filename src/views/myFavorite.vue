<template>
  <div v-for="(item, index) in favorite" :key="index" class="history-container">
    <el-row>
      <el-col :span="4" :push="5">
        <div class="movie-img-contianer">
          <el-image :src="require('../assets/poster/' + item['movie_id'] + '.jpg')" fit="cover" />
        </div>
      </el-col>
      <el-col :span="15" :push="3">
        <div class="movie-container">
          <el-row>
            <el-col :span="12" style="margin-top: 5px">
              <span style="font-size: 25px; color: #000;">{{ item['movie_name'] }}</span>
            </el-col>
            <el-col :span="4" style="margin-top: 10px">
              <span style="margin-top: 10px">{{ item['movie_evaluation'] }}</span>
            </el-col>
          </el-row>
          <el-row style="margin-top: 10px">
            <el-col :span="2">
              <span style="font-size: 18px; color: #000; height: 30px; font-weight: bold">导演：</span>
            </el-col>
            <el-col :span="22">
              <span style="height: 30px; margin-top: 3px; float: left">{{ item['movie_director'] }}</span>
            </el-col>
          </el-row>
          <el-row style="margin-top: 10px">
            <el-col :span="2">
              <span style="font-size: 18px; color: #000; height: 30px; font-weight: bold">演员：</span>
            </el-col>
            <el-col :span="22">
              <span style="height: 30px; margin-top: 3px; float: left">{{ item['movie_roles'] }}</span>
            </el-col>

          </el-row>
          <el-row style="margin-top: 10px">

          </el-row>
          <el-row style="margin-top: 10px">
            <span style="font-size: 15px; color: #000; height: 30px; margin-top: 8px">{{ item['date'] }}</span>
          </el-row>
        </div>
      </el-col>
    </el-row><el-divider />
  </div>
</template>

<script>
import {getType} from "../utils/getData";

export default {
  name: "myFavorite",
  setup(){
    const favorite = getType('favorite')
    console.log(favorite)


    return{
      favorite
    }
  }
}
</script>

<style scoped>
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
  margin-left: 250px;
  width: 70%;
  background: #EAEAEA;
}
</style>