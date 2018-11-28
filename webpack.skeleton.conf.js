{
    target: 'node', // 区别默认的 'web'
        entry: [resolve('./src/entry-skeleton.js')], // 多页传入对象
    output: {
    libraryTarget: 'commonjs2'
},
    externals: nodeExternals({
        whitelist: /\.css$/
    }),
        plugins: []
}
