// 加入 ExtractTextPlugin 插件到 webpack 配置对象插件列表中
serverWebpackConfig.plugins.push(new ExtractTextPlugin({
    filename: outputCssBasename // 样式文件名
}));
