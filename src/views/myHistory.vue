<template>
  <div v-for="(item, index) in 20">
    <el-row>
      <el-col :span="4">
        <img :src="require('../assets/poster/3.jpg')" />
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "myHistory"
}
</script>

<style scoped>

</style>