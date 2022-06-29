const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})

let proxyObj={}

proxyObj['/api']={
  //websocket
  ws:false,
  //目标地址
  target:'http://localhost:8000',
  //发送请求头host会设置target
  changeOrigin: true,
  //不重写请求地址
  pathReWrite: {
    '/api': ''
  }
}

module.exports={
  devServer:{
    host:'localhost',
    port:8080,
    proxy: proxyObj
  }
}