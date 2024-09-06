/*
 * @Author: Cube
 * @Last Modified time: 2021-04-06 11:53:33
 */
const { merge } = require('webpack-merge')
const path = require('path')
const baseWebpackConfig = require('./webpack.base.config.js')

const webpackConfig = merge(baseWebpackConfig, {
  mode: 'development',
  devtool: 'inline-source-map',
})

// console.log(webpackConfig.module.rules)
// console.log(process.env.NODE_ENV)
module.exports = webpackConfig



// webpackConfig = {
//     devServer:{
//         // https://webpack.js.org/configuration/dev-server/#root
//     }
// }