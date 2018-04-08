## webpack2.0

###### demo1: webpack2简单配置

###### #webpack.config.js配置

```javascript
module.exports={
  entry:__dirname+'/src',
  output:{
    filename:'bundle.js',
    path:__dirname+'/dist'
  }
}
```

Demo2: webpack2配置多文件打包到一起

```javascript
module.exports = {
	context: __dirname + '/src',
	entry: {
		app: ['./app.js', './a.js']  //按照顺序依次打包到app.bundle.js里面
	},
	output: {
		path: __dirname + '/dist',
		filename: '[name].bundle.js'
	}
}
```

Demo3:  webpack2多个文件多个输出

```javascript
module.exports = {
	context: __dirname + '/src',
	entry: {
	 app: './app.js',
      a:'./a.js' 
	},
	output: {
		path: __dirname + '/dist',
		filename: '[name].bundle.js' //最后生成两个打包文件 app.bundle.js和 a.bundle.js
	}
}
```

demo4: webpack2提取多个文件的公共部分

```javascript
const webpack = require('webpack');
module.exports = {
	context: __dirname + '/src',
	entry: {
		app: './app.js',
		a: './a.js',
		b: './b.js'
	},
	output: {
		path: __dirname + '/dist',
		filename: '[name].bundle.js'
	},
	plugins: [
		new webpack.optimize.CommonsChunkPlugin({
			name: "commons",
			filename: "commons.js",
			minChunks: 2, //有任意模块加载了两次或更多,这里2就是设置超过2次以上使用
		}),
	],
}
```

Demo5: webpack2的webpack-dev-server

```javascript
const webpack = require('webpack');
module.exports = {
	entry: {
		app: './index.js'
	},
	output: {
		path: __dirname + '/dist',
		filename: '[name].bundle.js',
		publicPath: '/assets'
	},
	devServer: {
		contentBase: __dirname + '/src',
		hot: true,
		inline: true,
		open: true
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin()
	]
};

//index.html 里面 script的src为: /assets/app.bundle.js
//index.html需要放到 src目录下
//script 标签中的 /assets 对应的是 output.publicPath 的值

//需要在本地安装 webpack webpack-dev-server
//根目录运行 webpack-dev-server即可实时刷新
```

Demo6: webpack2+babel

```javascript
module.exports = {
	context: __dirname + '/src',
	entry: {
		app: './app.js'
	},
	output: {
		filename: '[name].bundle.js',
		path: __dirname + '/dist'
	},
	module: {
		rules: [{
			test: /\.js$/,
			use: [{
				loader: 'babel-loader',
				options: {
					presets: ['es2015']
				}
			}]
		}]
	}
};
//yarn add babel-loader babel-core babel-preset-es2015
```

Demo7: webpack2+css-loader

```javascript
module.exports = {
	context: __dirname + '/src',
	entry: {
		app: './app.js'
	},
	output: {
		filename: '[name].bundle.js',
		path: __dirname + '/dist'
	},
	module: {
		rules: [{
			test: /\.js$/,
			use: [{
				loader: 'babel-loader',
				options: {
					presets: ['es2015']
				}
			}]
		}, {
			test: /\.css$/,
			use: ['style-loader', 'css-loader']
		}]
	}
};
//yarn add css-loader style-loader
//这种方式就是引入普通的css文件，和webpack1写法差不多
```

Demo8: webpack2+sass

```javascript
const path = require('path');
module.exports = {
	context: __dirname + '/src',
	entry: {
		app: './app.js'
	},
	output: {
		filename: '[name].bundle.js',
		path: __dirname + '/dist'
	},
	module: {
		rules: [{
			test: /\.js$/,
			use: [{
				loader: 'babel-loader',
				options: {
					presets: ['es2015']
				}
			}]
		}, {
			test: /\.css$/,
			use: [
				'style-loader', {
					loader: 'css-loader', //这样的配置，让其支持css模块化(css modules)
					options: {
						modules: true
					}
				}
			]
		}, {
			test: /\.(sass|scss)$/,
			use: [
				'style-loader',
				'css-loader',
				'sass-loader'
			]
		}]
	},
	resolve: {
		modules: [path.resolve(__dirname, 'src'), 'node_modules'] //css模块，先从src目录里面找，在从node_module里面找
	}
};
//yarn add sass-loader node-sass
```

Demo9: 分开打包css

```javascript
const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
	context: __dirname + '/src',
	entry: {
		app: './app.js'
	},
	output: {
		filename: '[name].bundle.js',
		path: __dirname + '/dist'
	},
	module: {
		rules: [{
			test: /\.js$/,
			use: [{
				loader: 'babel-loader',
				options: {
					presets: ['es2015']
				}
			}]
		}, {
			test: /\.css$/,
			loader: ExtractTextPlugin.extract({
				loader: 'css-loader?importLoaders=1',
			})
		}]
	},
	plugins: [
		new ExtractTextPlugin({
			filename: "[name].bundle.css",
			allChunks: true,
		}),
	]
};
//yarn add sass-loader node-sass
```

Demo10: 自动生成html页面

```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
	entry: {
		app: './index.js'
	},
	output: {
		path: __dirname + '/dist',
		filename: '[name].bundle.js'
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: 'My-App',
			filename: './index.html'
		})
	]
};
```

demo11: copy-webpack-plugin

```javascript
const CopyWebpackPlugin = require('copy-webpack-plugin');
module.exports = {
	entry: {
		app: './index.js'
	},
	output: {
		path: __dirname + '/dist',
		filename: '[name].bundle.js'
	},
	plugins: [
		new CopyWebpackPlugin([{
			from: './*.html',
			to: ''
		}])
	]
};
```

Demo12:图片 url-loader

```javascript
const webpack = require('webpack');
module.exports = {
	entry: {
		app: './index.js'
	},
	output: {
		path: __dirname + '/dist',
		filename: '[name].bundle.js',
		publicPath: ''
	},
	module: {
		rules: [{
			test: /\.css$/,
			use: ['style-loader', {
				loader: 'css-loader',
				options: {
					modules: true
				}
			}]
		}, {
			test: /\.(sass|scss)$/,
			use: [
				'style-loader',
				'css-loader',
				'sass-loader'
			]
		}, {
			test: /\.(png|jpg)$/,
			use: [{
				loader: 'url-loader',
				options: {
					limit: 50000
				}
			}]
		}]
	},
	devServer: {
		contentBase: __dirname + '/src',
		hot: true,
		inline: true,
		open: true
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin()
	]
};
```

end！

