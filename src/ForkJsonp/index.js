/*
 * @Author: Cube
 * @Date:   2021-05-09 22:48:46
 * @Last Modified by:   Cube
 * @Last Modified time: 2024-10-17 14:28:45
 */

/**
 * Module dependencies
 */

const debug = require('debug')('jsonp');

/**
 * Module exports.
 */

const j = function(global) {
  /**
   * Callback index.
   */

  let count = 0;

  /**
   * Noop function.
   */

  function noop() {}

  /**
   * JSONP handler
   *
   * Options:
   *  - param {String} qs parameter (`callback`)
   *  - prefix {String} qs parameter (`__jp`)
   *  - name {String} qs parameter (`prefix` + incr)
   *  - timeout {Number} how long after a timeout error is emitted (`60000`)
   *
   * @param {String} url
   * @param {Object|Function} optional options / callback
   * @param {Function} optional callback
   */

  function jsonp(url, opts, fn) {
    if ('function' == typeof opts) {
      fn = opts;
      opts = {};
    }
    if (!opts) opts = {};

    let prefix = opts.prefix || '__jp';

    // use the callback name that was passed if one was provided.
    // otherwise generate a unique name by incrementing our counter.
    let id = opts.name || (prefix + (count++));

    let param = opts.param || 'callback';
    let timeout = null != opts.timeout ? opts.timeout : 60000;
    let enc = encodeURIComponent;
    let target = document.getElementsByTagName('script')[0] || document.head;
    let script;
    let timer;


    if (timeout) {
      timer = setTimeout(function() {
        cleanup();
        if (fn) fn(new Error('Timeout'));
      }, timeout);
    }

    function cleanup() {
      if (script.parentNode) script.parentNode.removeChild(script);
      global[id] = noop;
      if (timer) clearTimeout(timer);
    }

    function cancel() {
      if (global[id]) {
        cleanup();
      }
    }

    global[id] = function(data) {
      debug('jsonp got', data);
      cleanup();
      if (fn) fn(data);
    };

    // add qs component
    url += (~url.indexOf('?') ? '&' : '?') + param + '=' + enc(id);
    url = url.replace('?&', '?');

    debug('jsonp req "%s"', url);

    // create script
    script = document.createElement('script');
    script.src = url;
    target.parentNode.insertBefore(script, target);

    return cancel;
  }
  return jsonp;
};

j.help = `
jsonp(url, opts, fn)
url(String) 目标url
opts(Object) 可选的
  param(String)   用来指定回调的查询字符串参数的名称(默认为callback)
  timeout(Number) 超时错误发出后多长时间。0禁用(默认为60000)
  prefix (String) 处理jsonp响应的全局回调函数的前缀(默认为__jp)
  name (String)   处理jsonp响应的全局回调函数的名称(默认为前缀+递增计数器)
fn 回调函数
注意,由于此jsonp被二次封装,所以fn失效,具体参考window与unsafeWindow
所以此封装返回一个函数,通过$jsonp(window)来返回真正的jsonp函数
改自: https://github.com/LearnBoost/jsonp.git
`

module.exports = {jsonp: j}