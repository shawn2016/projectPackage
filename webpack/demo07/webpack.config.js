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