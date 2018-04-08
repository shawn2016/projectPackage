import path from 'path'
import webpack from './node_modules/webpack'
import devConfig from './src/config'
const argvs = process.argv
const serverUrlKey = argvs[argvs.length - 1] || 'dev'
const serverUrl = devConfig[serverUrlKey] || devConfig.dev
import devApiConfig from './config/dev.env'
import testApiConfig from './config/test.env'
import prodApiConfig from './config/prod.env'
/**
 * 相对于此目录解析
 */
const context = path.resolve(__dirname, './src')

/**
 * 入口
 */
const entry = [
  'babel-polyfill',
  'react-hot-loader/patch',
  'webpack-dev-server/client',
  'webpack/hot/only-dev-server',
  path.resolve(__dirname, './src/app.js')
]
console.log('服务端地址为: ', serverUrl)
/**
 * 服务配置
 */
const devServer = {
  hot: true,
  host: '0.0.0.0',
  port: 8080,
  publicPath: '/',
  contentBase: path.resolve(__dirname, 'src'),
  historyApiFallback: true,
  disableHostCheck: true,
  // proxy: {
  //   '/wwa': {
  //     target: serverUrl,
  //     secure: false,
  //     pathRewrite: { '^/wwa': '' }
  //   }
  // }
}


/**
 * 中间件配置
 */
const rules = [
  {
    enforce: 'pre',
    test: /\.js$/,
    exclude: /node_modules/,
    options: {
      configFile: path.resolve(__dirname, '.eslintrc'),
    },
    loader: 'eslint-loader'
  },
  {
    test: /\.jsx?$/,
    use: ['babel-loader'],
    exclude: /node_modules/
  }, {
    test: /\.css$/,
    use: ['style-loader', 'css-loader'],
  },
  {
    test: /\.(png|svg|jpg|gif)$/,
    loader: 'url-loader?limit=80000&name=imgs/[hash].[ext]'
  },
  {
    test: /\.(woff|woff2|eot|ttf)$/i,
    loader: 'url-loader?limit=80000&name=fonts/[hash].[ext]'
  }
]


/**
 * 插件配置
 */
const plugins = [ // 插件
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NamedModulesPlugin(),
  new webpack.DefinePlugin({
    __ENV__: process.env.NODE_ENV == 'prod' ? prodApiConfig : process.env.NODE_ENV == 'test' ? testApiConfig : devApiConfig
  })
  // new webpack.optimize.UglifyJsPlugin({
  //   compress: {
  //     warnings: false,
  //     drop_debugger: true,
  //     drop_console: true
  //   }
  // })
]


/**
 * 整体配置
 */
const config = {
  context,
  entry,
  devServer,
  plugins,
  module: { rules },
  output: {
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.md', '.txt'],
    alias: {
      'react-robotUI': path.resolve(__dirname, './react-robotUI'),
      reduxes: path.resolve(__dirname, './src/reduxes'),
      modules: path.resolve(__dirname, './src/modules'),
      routers: path.resolve(__dirname, './src/routers'),
      utils: path.resolve(__dirname, './src/utils'),
      assets: path.resolve(__dirname, './src/assets'),
      components: path.resolve(__dirname, './src/components')
    },
  },
  devtool: 'source-map'
}


config.externals = {
  cheerio: 'window',
  'react/addons': 'react',
  'react/lib/ExecutionEnvironment': 'react',
  'react/lib/ReactContext': 'react',
}

export default config
