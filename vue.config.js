module.exports = {
  lintOnSave: false,
  outputDir:'wxyx-entry',
  filenameHashing:false,
  productionSourceMap:false,
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        return [...args,{hash:true}]
      })
  },
  devServer: {
   proxy: 'http://ben.wxyx.youban.com'
 }
}
