const path = require('path');

module.exports = {
  entry:path.join(__dirname,'src/app.js'),
  output:{
    path:path.join(__dirname,'dist/js'),
    filename:'bandle.js'
  },
  module:{
    loaders:[
      {
        test:/\.js$/,
        exclude:/node_modules/,
        loader:'babel-loader',
        query:{
          presets:['@babel/preset-react','@babel/preset-env']
        }
      }
    ]
  },
  resolve:{
    modules:[path.join(__dirname,'src'),'node_modules'],
    extensions:['.js','.jsx']
  }
};