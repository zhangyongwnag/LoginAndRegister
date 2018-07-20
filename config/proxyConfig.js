module.exports = {
  proxyList:{
    '/api':{
      target:'http://hb5.api.okayapi.com',
      changeOrigin:true,
      pathRewrite:{
        '^/api':''
      }
    },
  }
}
