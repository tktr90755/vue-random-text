module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/vue-random-text/' : '/',
  configureWebpack: {
    resolve: {
      alias: {
        'vue$': 'vue/dist/vue.esm.js'
      }
    }
  }
}