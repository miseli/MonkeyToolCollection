/*
 * @Author: Cube
 * @Date:   2021-04-06 00:21:06
 * @Last Modified by:   Cube
 * @Last Modified time: 2024-10-17 14:37:13
 */
import {codeFrameColumns} from '@babel/code-frame'
function log(){
  const res = codeFrameColumns(code,{},{
    highlightCode: true,
    message: '这里错了'
  })
  console.log(res)
}

export default function (o) {
  let {Cookies, axios, Events, $, jsonp, JSZip} = o

JSZip.help = function(){
  console.log(`
const zip = new JSZip();

zip.file("Hello.txt", "Hello World\n");

const img = zip.folder("images");
img.file("smile.gif", imgData, {base64: true});

zip.generateAsync({type:"blob"}).then(function(content) {
    // see FileSaver.js
    saveAs(content, "example.zip");
});

/*
Results in a zip containing
Hello.txt
images/
    smile.gif
*/
`)
  }

  Cookies.help = function () {
    console.log(`
Usage:
Cookies.set(name, value[,options])
Cookies.set('tmp','123',{ expires: 7, path: ''})
Cookies.get([name][,options])
Cookies.getJson([name])
Cookies.remove([name][,options])
var C = Cookies.noConflict()
document.cookie = "cube=%u5317"
document.cookie = "default=%E5%8C%97"
var cookies = Cookies.withConverter({
    read: function(value, name){
        if(name === 'cube'){
            return unescape(value)
        }
        return Cookies.converter.read(value, name)
    }
})
cookies.get('cube')
cookies.get('default')
cookies.get()
`)
  }
  axios.help = function () {
    console.log(`
Usage:  https://github.com/axios/axios
// 基本用法 config:参见备注或网址
axios.request(config)
axios.get(url[, config])
axios.delete(url[, config])
axios.head(url[, config])
axios.options(url[, config])
axios.post(url[, data[, config]])
axios.put(url[, data[, config]])
axios.patch(url[, data[, config]])
// 以上config不需使用url,data,method

// 创建通用实例
let instance = axios.create([config])
instance方法同基本方法

// 同时请求
axios.all(iterable)
  .then(axios.spread(function(acct, perms){
    /* 所有请求全部complete */
  }))

// 例子:
// Request Payload   =>   Content-Type: application/json
let data = {a:123}

// Form Data   =>   Content-Type: multipart/form-data
let data = new FormData()
data.append('a','123')

//  Form Data   =>   Content-Type: application/x-www-form-urlencoded
let data = {a:123}
data = qs.stringify(data)

axios.post(url,data).then(res=>{console.log(res)})
axios.get(url,{'params':data})

// 开启cookie保持
$axios.defaults.withCredentials = true

// 默认cookie
$axios.defaults.headers.common['cookie']

// 请求中间件
axios.defaults.transformRequest = [function(data, headers) {
    // 默认formData,无法实现Payload
    return qs.stringify(data)
}]

// 响应中间件
axios.defaults.transformResponse = [function(data) {
  return data
}]

// 请求中间件
myInterceptor = axios.interceptors.request.use(config => {
    config.headers.Authorization = 'cube_token';
    return config;
}, function(err) {
    return Promise.reject(err);
})

// 响应中间件
myInterceptor = axios.interceptors.response.use(res => {
    console.log(res)
    return res
}, (err) => {
    return Promise.reject(err)
})

// 移除中间件
axios.interceptors.request.eject(myInterceptor)

// 例子1 合适拦截
function onGetCall(config) {
  return config.method === 'get';
}
axios.interceptors.request.use(function (config) {
  config.headers.test = 'special get headers';
  return config;
}, null, { runWhen: onGetCall });

// 例子2 同步执行
axios.interceptors.request.use(function (config) {
  config.headers.test = 'I am only a header!';
  return config;
}, null, { synchronous: true });

// 请求类型 可选项 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'
axios.get(url, { responseType: 'blob', headers: {} }).then.......
/***********************************/
`)
  }

  Events.help = () => {
    console.log(`
var EventEmitter = require('events')

var ee = new EventEmitter()
ee.on('message', function (text) {
  console.log(text)
})
ee.emit('message', 'hello world')

let em = new EventEmitter();
em.on('cube1', data=>{
    console.log(data)
}).on('cube2', data=>{
    console.log(data)
})
setTimeout(function(){ em.emit('cube',{data:123}).emit('cube1', 456), 3000 })
`
      // EventEmitter.prototype.help = `Usage: https://www.npmjs.com/package/EventEmitter
      // let em = new EventEmitter();
      // em.on('cube1', data=>{
      //     console.log(data)
      // }).on('cube2', data=>{
      //     console.log(data)
      // })
      // setTimeout(function(){ em.emit('cube',{data:123}).emit('cube1', 456), 3000 }
      // `
    )
  }

  $.help = () => {
    console.log(`
//https://api.jquery.com/jQuery.get/
jQuery(form).serializeArray()
jQuery(form).serialize()
解析表单
jQuery.getScript()
使用 GET HTTP 请求从服务器加载 JavaScript 文件，然后执行它。
jQuery.getJSON()
使用 GET HTTP 请求从服务器加载 JSON 编码的数据。
jQuery.ajaxSetup() / jq.ajaxSettings
为未来的 Ajax 请求设置默认值。不推荐使用它。
jQuery.param()
创建适用于 URL 查询字符串或 Ajax 请求的数组、普通对象或 jQuery 对象的序列化表示。如果传递了 jQuery 对象，它应该包含具有名称/值属性的输入元素。

jQuery.ajax( url [, settings ] )
jQuery.post( url [, data ] [, success ] [, dataType ] )
jQuery.get( url [, data ] [, success ] [, dataType ] )
jQuery.ajax( [settings ] )
jQuery.post( [settings ] )
jQuery.get( [settings ] )
dataType: xml, json, script, text, html, 默认为智能识别

event.stopPropagation() //阻止事件冒泡
event.preventDefault() //阻止默认事件,但没阻止冒泡

jquery更换标识符:  $j = $.noConflict()

jq 1.x 元素的jqueryxxxxxxx属性对应着$.cache[属性值]
jq 2.x cache被闭包处理,无法直接得到,所以可以用$._data(元素)
jq 3.x 同2.x, 也可以直接通过元素.jqueryxxxxxxxx得到

jq 获取事件函数的方法 来自:https://blog.csdn.net/zlllxl2002/article/details/46804117
`)
  }



}