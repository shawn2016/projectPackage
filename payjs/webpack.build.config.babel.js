import webpack from 'webpack';
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import devApiConfig from './config/dev.env'
import testApiConfig from './config/test.env'
import prodApiConfig from './config/prod.env'
import open from 'open'
const context = path.resolve(__dirname, './src')
const entry = {
    'init': './js/init.js'
}
const output = {
    path: path.resolve(__dirname, 'dist'), //输出目录的配置，模板、样式、脚本、图片等资源的路径配置都相对于它
    filename: 'rswallet.jssdk.js', //每个页面对应的主js的生成配置
}
const plugins = [
    new CopyWebpackPlugin([{ //目录拷贝
        from: path.resolve(__dirname, 'README.md')
    }]),
    // new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({ //根据模板插入css/js等生成最终HTML
        cache: false,
        // favicon: './src/img/favicon.ico', //favicon路径，通过webpack引入同时可以生成hash值
        filename: './index.html', //生成的html存放路径，相对于path
        template: './index.html', //html模板路径
        inject: 'head', //js插入的位置，true/'head'/'body'/false
        hash: true, //为静态资源生成hash值
        chunks: ['init'], //需要引入的chunk，不配置就会引入所有页面的资源
        // minify: {
        //     removeComments: true, //移除HTML中的注释
        //     collapseWhitespace: true
        // }
    }),
    // 压缩JS代码,CSS 没有被压缩到
    new webpack.optimize.UglifyJsPlugin({
        output: {
            comments: false,
        },
        compress: {
            warnings: false,
            drop_debugger: true,
            drop_console: true
        },
    }),
    new webpack.DefinePlugin({
        __ENV__: process.env.NODE_ENV == 'prod' ? prodApiConfig : process.env.NODE_ENV == 'test' ? testApiConfig : devApiConfig
    })
]
const resolve = {
    extensions: ['.js', '.md', '.txt'],
    alias: {
        modules: path.resolve(__dirname, '/src/js/modules'),
        utils: path.resolve(__dirname, '/src/js/utils')
    }
}
const devServer = {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 4000,
    open: true,
    inline: true
}
const rules = [
    {
        test: /\.js$/,
        use: ['babel-loader'],
        exclude: /node_modules/
    }
]
const config = {
    entry,
    context,
    output,
    resolve,
    devServer,
    plugins,
    devtool: 'eval-source-map',
    module: {
        rules
    }
}
module.exports = config;