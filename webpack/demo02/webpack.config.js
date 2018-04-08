module.exports = {
  context: __dirname + '/src', // string（绝对路径！）
  entry: {
    app: ['./app.js', './a.js']
  },
  output:{
    path:__dirname+'/dist',
    filename:'[name].bundle.js'

  }
}
