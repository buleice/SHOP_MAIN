//webpack.config.server.js
const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')

module.exports = {
    mode: process.env.NODE_ENV,
    target: 'node',
    entry: path.join(__dirname, '../src/skeleton-entry.js'),
    output: {
        path: path.join(__dirname, '../server-dist'),
        filename: 'server.bundle.js',
        libraryTarget: 'commonjs2'
    },
    externals: Object.keys(require('./package.json').dependencies),
    plugins: [
        new VueLoaderPlugin(),
        new VueSSRServerPlugin({
            filename: 'skeleton.json'
        })
    ]
}
