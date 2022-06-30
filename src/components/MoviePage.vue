<template>
  <v-header></v-header>
  <el-row>
    <el-col :span="20" :push="2" class="movie-container">
      <div style="margin-top: 50px; background: #cac6c6;">
        <span class="title-container">肖申克的救赎 The Shawshank Redemption</span>
      </div>
      <div style="margin-right: 900px; margin-top: 40px">
        <el-image :src="posterURL"></el-image>
      </div>


      <div class="movie-info" >
        <el-descriptions
            :column="4"
            :size="size"
            direction="vertical"
            :style="blockMargin">
          <el-descriptions-item label="Username">kooriookami</el-descriptions-item>
          <el-descriptions-item label="Telephone">18100000000</el-descriptions-item>
          <el-descriptions-item label="Place" :span="2">Suzhou</el-descriptions-item>
          <el-descriptions-item label="Remarks">
            <el-tag size="small">School</el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="Address"
          >No.1188, Wuzhong Avenue, Wuzhong District, Suzhou, Jiangsu Province
          </el-descriptions-item>
        </el-descriptions>
      </div>

    </el-col>
  </el-row>

</template>

<script lang="ts" setup>
import Header from '@/components/header.vue'

const  components = { 'v-header': Header }


const posterURL = require('@/assets/poster/7.jpg')

</script>



<style scoped>
.movie-container {
  background: #42b983;
}
.title-container {
  margin-right: 480px;
  font-size: 35px;
  font-weight: 700;
}

/*电影详细信息模块style*/
.movie-info {
  margin-right: 500px;
  margin-top: 40px;
  background: #cac6c6;
}
.el-descriptions {
  margin-top: 20px;
}
/*image模块*/



</style>