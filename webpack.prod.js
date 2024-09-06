/*
 * @Author: Cube
 * @Last Modified time: 2021-01-08 12:29:00
 */
const {merge} = require('webpack-merge') //因为高版本的merge返回的是一个对象,其中包含了merge函数,所以需要解构处理
const baseWebpackConfig = require('./webpack.base.config.js')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin') //压缩js webpack3.0使用,不支持ES6的const关键字
const TerserPlugin = require('terser-webpack-plugin') //压缩js webpack4.0使用
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

// https://blog.csdn.net/Jenn168/article/details/108417051

const webpackConfig = merge(baseWebpackConfig, {
  mode: 'production',
  devtool: 'source-map',

  optimization: {
    minimizer: [
      new TerserPlugin({
        //Boolean|Number 多线程构建,速度快,默认true即os.cpus().length - 1
        parallel: true,
        terserOptions: {
          ecma: 6,
          mangle: {

          },
          output: {
            // 最紧凑的输出
            beautify: false
          },
          compress: {
            // 删除所有 `debugger` 语句
            drop_debugger: false,
            // 删除所有的 `console` 语句，可以兼容ie浏览器
            drop_console: false,
            // 默认5, 大于等于2015时,则将ES5代码转换成较小的ES6+等效形式。
            ecma: 5,
          },
          warnings: false,
        },
        // minify: (file, sourceMap, minimizerOptions)=>{

        // },
      }),
      // new UglifyJsPlugin({
      //   test: /\.js(\?.*)?$/i,
      //   parallel: true,
      //   uglifyOptions: {
      //     mangle: {

      //     },
      //     output: {
      //       // 最紧凑的输出
      //       beautify: false
      //     },
      //     compress: {
      //       // 在UglifyJs删除没有用到的代码时不输出警告
      //       drop_debugger: true,
      //       // 删除所有的 `console` 语句，可以兼容ie浏览器
      //       drop_console: true,
      //     },
      //     warnings: false,
      //   }
      // })
    ]
  },
  plugins: [
    // new BundleAnalyzerPlugin({
    //   analyzerMode: 'server',
    //   analyzerHost: '127.0.0.1',
    //   analyzerPort: 8889,
    //   reportFilename: 'report.html',
    //   defaultSizes: 'parsed',
    //   openAnalyzer: true,
    //   generateStatsFile: false,
    //   statsFilename: 'stats.json',
    //   statsOptions: null,
    //   logLevel: 'info'
    // }),
  ]
})

module.exports = webpackConfig