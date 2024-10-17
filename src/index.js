/**
 * @Author: Cube
 * @Date: 2021-05-02 15:04:25
 * @Last Modified time: 2024-11-04 09:51:06
 */
import _ from 'lodash'
// import ah from '@common/js/ajaxhook.min.js'
import asyncLoadScript from './loadScript'
import axios from 'axios'
import EventEmitter3 from 'EventEmitter3'
import Events from 'events'
import MyEvents from './MyEvent'
import Cookies from 'js-cookie'
import qs from 'qs'
// import jsonp from 'jsonp'
import jsonp from './ForkJsonp'
// import downloadResource from './downloadResource'
import Lru from 'lru-cache'
import Url from 'url'
import Json3 from 'json3'
import $ from '$jquery'
import CopyToClipboard from './clipboard.js'
import Cryptojs from 'crypto-js'
import BreakOn from './Breakpoint'
import Tool from '$common/js/Tool.js'
import saveAs from '$common/js/FileSaver.min.js'
import Swal from 'sweetalert2'
import {throttle,debounce}from './throttle_debounce'
import JSZip from 'jszip'
import ToTop from './ToTop/index.js'
import helpdoc from './helpdoc.js'
// import {pinyin} from 'pinyin-pro'

// import jsrsasign from 'jsrsasign'
// import InsertCode from './baidu/baidu.zhidao.js'
// import 'jquery-confirm/js/jquery-confirm.js'
// import CreateButton from './addButton'
// import Marked from './MarkDown'

// window.$j = $.noConflict();
_.home = "https://www.lodashjs.com/docs/lodash.setWith"
Swal.home = "https://sweetalert2.github.io/#usage"
JSZip.home = "https://github.com/Stuk/jszip"
saveAs.home = "https://github.com/eligrey/FileSaver.js"
// ah.home = "https://download.csdn.net/download/weixin_42140846/14964911?spm=1001.2101.3001.6650.1&utm_medium=distribute.pc_relevant.none-task-download-2%7Edefault%7EBlogCommendFromBaidu%7ERate-1-14964911-blog-126666936.235%5Ev43%5Epc_blog_bottom_relevance_base8&depth_1-utm_source=distribute.pc_relevant.none-task-download-2%7Edefault%7EBlogCommendFromBaidu%7ERate-1-14964911-blog-126666936.235%5Ev43%5Epc_blog_bottom_relevance_base8&utm_relevant_index=2"

let lodash = _.noConflict()

helpdoc({Cookies, axios, Events, $, jsonp, JSZip})

var out = {
  $,
  '_': lodash,
  // 'ajax-hook': ah,
  // ah,
  asyncLoadScript,
  'ajax': axios,
  axios,
  BreakOn,
  Cookies,
  copytext: CopyToClipboard,
  Cryptojs,
  EventEmitter3,
  Events,
  Json3,
  jsonp,
  JSZip,
  lodash,
  Lru,
  MyEvents,
  qs,
  saveAs,
  Swal,
  throttle,debounce,
  Tool,
  ToTop,
  Url,
  Ver: '1.0.0',
  // InsertCode,
  // jsrsasign,
  // MarkDown: Marked,
  // CreateButton,
}

console.log('hehehe')
GM_info = { ...GM_info, Cube: out}

// 跨域协议数据
// {
//   method: 'get',
//   data: {},
//   callback: 'callback'
// }