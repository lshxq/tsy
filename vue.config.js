module.exports = {
  publicPath: "/tsyvue",
  devServer: {
    proxy: {
      '/api': {
        target: `http://localhost:8081/test/api`,
        changeOrigin: true,
        pathRewrite: {
          '^/api' : ''
        }
      }
    }
  },
  pages: {
    index: {
      entry: 'examples/main.js',
      template: 'public/index.html',
      filename: 'index.html'
    }
  },
  chainWebpack: config => {
    config.module.rule('js').include.add('/packages').end().use('babel').loader('babel-loader')
  }
}