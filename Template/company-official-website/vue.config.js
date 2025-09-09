module.exports = {
  publicPath: './',
  devServer: {
    disableHostCheck: true,
    port: 9000,
    proxy: {
      '/api/': {
        // target: 'http://127.0.0.1:8088',   // 测试环境
        target: 'http://81.71.17.188:8088', // 产线地址
        changeOrigin: true,  // 是否跨域
        pathRewrite: {
          '^/api/': ''
        }
      },
    },
  },
  chainWebpack: config => {
    config.plugin('html')
      .tap(args => {
        args[0].title = '智慧其心';
        return args;
      })
  }
}