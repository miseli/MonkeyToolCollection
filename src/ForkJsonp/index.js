/*
 * @Author: Cube
 * @Date:   2021-05-09 22:48:46
 * @Last Modified by:   Cube
 * @Last Modified time: 2021-05-09 23:14:06
 */

/**
 * Module dependencies
 */

const debug = require('debug')('jsonp');

/**
 * Module exports.
 */

module.exports = function(global) {
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