/*
 * @Author: Cube
 * @Last Modified time: 2021-04-06 11:49:49
 */
const path = require('path')
// 输出html
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 注意引入方式不同,清理输出目录 https://www.cnblogs.com/zcy9838/p/11675461.html
const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin');

// gzip支持
// const CompressionPlugin = require('compression-webpack-plugin');



const webpackConfig = {
  entry: './src/index.js',
  // devServer: {
  //    contentBase: path.join(__dirname, 'dist'),
  //    compress: true,
  //    port: 9000
  // },
  plugins: [
    // new CompressionPlugin({
    //   // filename: '[path].gz[query]',
    //   algorithm: 'gzip',
    //   test: /\.js$|\.html$|\.json$|\.css/,
    //   threshold: 0, // 只有大小大于该值的资源会被处理
    //   minRatio:0.8, // 只有压缩率小于这个值的资源才会被处理
    //   deleteOriginalAssets: true // 删除原文件
    // })
    // new CleanWebpackPlugin({
    //    cleanStaleWebpackAssets: false
    // }),
    // new HtmlWebpackPlugin({
    //    title: 'Output',
    // }),
  ],
  resolve: {
    // extensions: ['*'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '$jquery': path.resolve(__dirname, 'common/js/jquery-3.6.0.min.js'),
      '$common': path.resolve(__dirname, 'common')
    }
  },
  output: {
    // filename: '[name].[hash].js',
    filename: 'main.js',
    publicPath: '/',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      /* 加载ES6以上版本的js */
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            babelrc: false,
            presets: ['@babel/preset-env'],
            plugins: [
              // "@babel/plugin-syntax-dynamic-import",
              // "dynamic-import-webpack",
              // https://www.jianshu.com/p/f61fb14e0bf3
              // https://www.cnblogs.com/chaoyueqi/p/9996369.html
            ]
          }
        }
      },
      /* scss */
      {
        test: /\.s[ac]ss$/,
        // 加载顺序是从右到左
        use: [/*'style-loader',*/ {loader:'css-loader',options:{sourceMap:true}}, 'sass-loader']
      },
      /* css */
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          },
          'postcss-loader'
        ]
      },
      /* 字体 */
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ['file-loader']
      },
      /* base64 */
      {
        test: /\.(png|jpg|svg|gif)$/i,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 20000 // 当图片小于20kb则转为base64
          }
        }]
      },
      /* 图片 */
      // {
      //    test: /\.(png|svg|jpg|gif)$/,
      //    use: ['file-loader']
      // },
      /* 加载数据 */
      {
        test: /\.(csv|tsv)$/,
        use: ['csv-loader']
      },
      /* 加载数据 */
      {
        test: /\.xml$/,
        use: ['xml-loader']
      },
      /* html文件*/
      {
        test: /\.html$/,
        use: {
          loader: 'html-loader',
          // options: {
          //    attrs: [':data-src']
          // }
        }
      }
    ]
  }
}
module.exports = webpackConfig