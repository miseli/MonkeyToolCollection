/*
* @Author: Cube
* @Last Modified time: 2021-04-06 11:55:34
*/

const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');

const app = express();

const config = require('./webpack.dev.js')
const compiler = webpack(config);

// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.
app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
  writeToDisk: filePath=>{
    console.log('')
    console.log('****************************')
    console.log(filePath)
    console.log('****************************')
    return true
  },
  quiet: true  //向控制台显示任何内容
}));

app.use(express.static(config.output.path))

// Serve the files on port 3000.
app.listen(3000, function () {
  console.log(`http://127.0.0.1:3000 ${config.output.publicPath}`)
});