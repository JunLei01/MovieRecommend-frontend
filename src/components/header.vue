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

      <el-col :span="1" :push="1"><div class="grid-content ep-bg-purple" />
        <el-avatar :size="50" :src="circleUrl" display="flex" />
      </el-col>

      <el-col :span="3"><div class="grid-content ep-bg-purple" />
        <el-dropdown>
          <span class="el-dropdown-link" >个人中心</span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item :icon="Plus"></el-dropdown-item>
              <el-dropdown-item :icon="CirclePlusFilled">
                Action 2
              </el-dropdown-item>
              <el-dropdown-item :icon="CirclePlus">Action 3</el-dropdown-item>
              <el-dropdown-item :icon="Check">Action 4</el-dropdown-item>
              <el-dropdown-item :icon="CircleCheck">Action 5</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-col>
    </el-row>
  </el-header>
</template>

<script lang="ts" setup>
const logoURL = require('../assets/APPLOGO.jpg')


</script>

<style scoped>


</style>