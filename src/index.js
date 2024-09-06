/**
 * @Author: Cube
 * @Date: 2021-05-02 15:04:25
 * @Last Modified time: 2021-10-19 10:10:34
 */
import _ from 'lodash'
import axios from 'axios'
import EventEmitter3 from 'EventEmitter3'
import Events from 'events'
import MyEvents from './MyEvent'
import Cookies from 'js-cookie'
import qs from 'qs'
// import jsonp from 'jsonp'
import jsonp from './ForkJsonp'
import downloadResource from './downloadResource'
import Lru from 'lru-cache'
import Url from 'url'
import Json3 from 'json3'
import $ from '$jquery'
import CopyToClipboard from './clipboard.js'
import Cryptojs from 'crypto-js'
import BreakOn from './Breakpoint'
import Tool from '$common/js/Tool.js'
import ToTop from './ToTop/index.js'
import helpdoc from './helpdoc.js'
// import jsrsasign from 'jsrsasign'
// import InsertCode from './baidu/baidu.zhidao.js'
// import 'jquery-confirm/js/jquery-confirm.js'
// import CreateButton from './addButton'
// import Marked from './MarkDown'

// window.$j = $.noConflict();
_.help = "https://www.lodashjs.com/docs/lodash.setWith"
let lodash = _.noConflict()
helpdoc(Cookies, axios, Events, $, jsonp, BreakOn, downloadResource)

var out = {
  lodash,
  '_': lodash,
  axios,
  'ajax': axios,
  qs,
  $,
  Cookies,
  Cryptojs,
  'copytext': CopyToClipboard,
  jsonp,
  downloadResource,
  Tool,
  AddScript(src) {
    var s = $('<script>').attr("src", src)
    $("head").append(s[0])
  },
  AddCss(src) {
    var s = $('<link>').attr({ href: src, rel: "stylesheet" })
    $("head").append(s[0])
  },
  BreakOn,
  // InsertCode,
  // jsrsasign,
  ToTop,
  EventEmitter3,
  Events,
  MyEvents,
  Url,
  Lru,
  Json3,
  Ver: '1.0.0',
  test: {}
  // MarkDown: Marked,
  // CreateButton,
}

GM_info = { ...GM_info, Cube: out}

// 跨域协议数据
// {
//   method: 'get',
//   data: {},
//   callback: 'callback'
// }