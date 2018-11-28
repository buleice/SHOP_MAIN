// 当前页面使用的所有 chunks
let usedChunks = htmlPluginData.plugin.options.chunks;
let entryKey;
// chunks 和所有入口文件的交集就是当前待处理的入口文件
if (Array.isArray(usedChunks)) {
    entryKey = Object.keys(skeletonEntries);
    entryKey = entryKey.filter(v => usedChunks.indexOf(v) > -1)[0];
}
// 设置当前的 webpack 配置对象的入口文件和结果输出文件
webpackConfig.entry = skeletonEntries[entryKey];
webpackConfig.output.filename = `skeleton-${entryKey}.js`;
// 使用配置对象进行服务端渲染
ssr(webpackConfig).then(({skeletonHtml, skeletonCss}) => {
    // 注入骨架屏 HTML 和 CSS 到页面 HTML 中
});
