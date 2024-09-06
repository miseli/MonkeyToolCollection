/*
 * @Author: Cube
 * @Last Modified time: 2021-04-06 00:37:40
 */
const Tool = function(win) {
  let Tool = {}
  Tool.isMobilePhone = function(obj) {
    // var partten = /^((\(\d{3}\))|(\d{3}\-))?13[0-9]\d{8}|14[0-9]\d{8}|15[0-9]\d{8}|17[0-9]\d{8}|18\d{9}$/;
    var partten = /^[1][3,4,5,7,8,9][0-9]{9}$/;
    if (partten.test(obj))
      return true;
    return false;
  }
  Tool.isFunction = function(obj) {

    // Support: Chrome <=57, Firefox <=52
    // In some browsers, typeof returns "function" for HTML <object> elements
    // (i.e., `typeof document.createElement( "object" ) === "function"`).
    // We don't want to classify *any* DOM node as a function.
    return typeof obj === "function" && typeof obj.nodeType !== "number";
  };
  Tool.isWindow = function(obj) {
    return obj != null && obj === obj.window;
  };
  Tool.isMail = function(obj) {
    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (filter.test(obj))
      return true;
    return false;
  }
  Tool.GetQueryString = function(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null)
      return unescape(r[2]);
    return null;
  }

  Tool.isArray = function(o) {
    return Object.prototype.toString.call(o) == '[object Array]';
  }

  /**
   * 操作数据到sessionstorage
   * */
  Tool.dataToSessionStorageOperate = {
    /**存储*/
    save: function(data_name, data_value) {
      if (typeof data_name != 'undefined' && typeof data_value != 'undefined') {
        // let tmp = Tool.cryptojs.enc.Base64.stringify(Tool.cryptojs.enc.Utf8.parse(JSON.stringify(data_value)))
        let tmp = JSON.stringify(data_value)
        sessionStorage.setItem(data_name, tmp);
      }
    },
    /**取出*/
    achieve: function(data_name) {
      var data_value = sessionStorage.getItem(data_name);
      // data_value && (data_value = JSON.parse(Tool.cryptojs.enc.Base64.parse(data_value).toString(Tool.cryptojs.enc.Utf8)));
      data_value && (data_value = JSON.parse(data_value));
      return data_value;
    },
    /**删除*/
    remove: function(data_name) {
      if (data_name)
        sessionStorage.removeItem(data_name);
    },
    /**清空*/
    clear: function() {
      sessionStorage.clear();
    }
  };
  /**
   * 操作数据到localstorage
   * */
  Tool.dataToLocalStorageOperate = {
    /**存储*/
    save: function(data_name, data_value) {
      if (typeof data_name != 'undefined' && typeof data_value != 'undefined') {
        // let tmp = Tool.cryptojs.enc.Base64.stringify(Tool.cryptojs.enc.Utf8.parse(JSON.stringify(data_value)))
        let tmp = JSON.stringify(data_value)
        localStorage.setItem(data_name, tmp);
      }
    },
    /**取出*/
    achieve: function(data_name) {
      var data_value = localStorage.getItem(data_name);
      // data_value && (data_value = JSON.parse(Tool.cryptojs.enc.Base64.parse(data_value).toString(Tool.cryptojs.enc.Utf8)));
      data_value && (data_value = JSON.parse(data_value));
      return data_value;
    },
    /**删除*/
    remove: function(data_name) {
      if (data_name)
        localStorage.removeItem(data_name);
    },
    /**清空*/
    clear: function() {
      localStorage.clear();
    }
  };

  /**
   * 原型链上添加日期格式化自定义
   * 格式化日期类型 自定义函数来格式化时间
   * yyyy-MM-dd
   */
  Tool.DateFormat = function(datetime, format) {
    var o = {
      "M+": datetime.getMonth() + 1,
      "d+": datetime.getDate(),
      "h+": datetime.getHours(),
      "m+": datetime.getMinutes(),
      "s+": datetime.getSeconds(),
      "q+": Math.floor((datetime.getMonth() + 3) / 3),
      "S+": datetime.getMilliseconds()
    };
    if (/(y+)/i.test(format)) {
      format = format.replace(RegExp.$1, (datetime.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
      if (new RegExp("(" + k + ")").test(format)) {
        format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
      }
    }
    return format;
  }

  /**
   * 设置字符串format函数
   * 例子: '{0}-{2}'.format(5,6,7)
   * 返回字符串"5-7"
   */
  String.prototype.format = function(){
    const e = Array.from(arguments)

    return !!this && this.replace(/\{(\d+)\}/g, function(text, match, index, str){
      return e[match]|| text
    })
  }

  /* 得到日期年月日等加数字后的日期 */
  Date.prototype.DateAdd = function(interval, number) {
    let date = this;
    switch (interval.toLowerCase()) {
      case "y":
        return new Date(date.setFullYear(date.getFullYear() + number));
      case "m":
        return new Date(date.setMonth(date.getMonth() + number));
      case "d":
        return new Date(date.setDate(date.getDate() + number));
      case "w":
        return new Date(date.setDate(date.getDate() + 7 * number));
      case "h":
        return new Date(date.setHours(date.getHours() + number));
      case "n":
        return new Date(date.setMinutes(date.getMinutes() + number));
      case "s":
        return new Date(date.setSeconds(date.getSeconds() + number));
      case "l":
        return new Date(date.setMilliseconds(date.getMilliseconds() + number));
    }
  }

  /* 计算两日期相差的日期年月日等 */
  Date.prototype.DateDiff = function(interval, date) {
    //date2 - date1
    let date1 = this
    let date2 = new Date(date)
    let long = date2.getTime() - date1.getTime(); //相差毫秒
    let result = 0

    switch (interval.toLowerCase()) {
      case "y":
        return parseInt(date2.getFullYear() - date1.getFullYear());
      case "m":
        return parseInt((date2.getFullYear() - date1.getFullYear()) * 12 + (date2.getMonth() - date1.getMonth()));
      case "d":
        date2 = new Date(`${date2.getFullYear()}/${date2.getMonth()+1}/${date2.getDate()}`)
        date1 = new Date(`${date1.getFullYear()}/${date1.getMonth()+1}/${date1.getDate()}`)
        long = date2.getTime() - date1.getTime(); //相差毫秒
        result = parseInt(long / 86400000)
        // result = (date2.getDate() - date1.getDate()) == 0 ? 0 : parseInt(long / 86400000)
        break
      case "w":
        result = long / 1000 / 60 / 60 / 24 / 7
        break
      case "h":
        result = long / 1000 / 60 / 60
        break
      case "n":
        result = long / 1000 / 60
        break
      case "s":
        result = long / 1000
        break
      case "l":
        result = long
    }
    return long > 0 ? Math.ceil(result) : Math.floor(result)
  }

  /**
   * 日期转时间戳Timestamp
   */
  Tool.date2tamp = function(t) {
    return Math.round(new Date(t).getTime() / 1000)
  };
  Date.prototype.Timestamp = function() {
    return Math.round(this.getTime() / 1000)
  }

  /**
   * 时间戳转日期
   */
  Tool.tamp2date = function(tamp) {
    return new Date(tamp)
  };
  Number.prototype.Date = function() {
    return new Date(this)
  }


  /**
   * [isNotANumber 判断是否是数字类型]
   * @param  {[type]}  inputData [description]
   * @return {Boolean}           [返回]
   */
  Tool.isNumber = function(inputData) { //isNaN(inputData)不能判断空串或一个空格
    //如果是一个空串或是一个空格，而isNaN是做为数字0进行处理的，而parseInt与parseFloat是返回一个错误消息，这个isNaN检查不严密而导致的。

    if (parseFloat(inputData).toString() == "NaN") { //alert("请输入数字……");注掉，放到调用时，由调用者弹出提示。

      return false;
    } else {
      return true;
    }
  };

  /**
   * str2hex 字符串转16进制
   * @param  {[string]} str description]
   * @return {[string]}     [description]
   */
  Tool.str2hex = function(str) {
    if (str === "") {
      return "";
    }
    var arr = [];
    arr.push("0x");
    for (var i = 0; i < str.length; i++) {
      arr.push(str.charCodeAt(i).toString(16));
    }
    return arr.join('');
  }

  /**
   * hex2str 16进制转字符串
   * @param  {[string]} hex [description]
   * @return {[string]}     [description]
   */
  Tool.hex2str = function(hex) {
    var trimedStr = hex.trim();
    var rawStr = trimedStr.substr(0, 2).toLowerCase() === "0x" ? trimedStr.substr(2) : trimedStr;
    var len = rawStr.length;
    if (len % 2 !== 0) {
      alert("Illegal Format ASCII Code!");
      return "";
    }
    var curCharCode;
    var resultStr = [];
    for (var i = 0; i < len; i = i + 2) {
      curCharCode = parseInt(rawStr.substr(i, 2), 16);
      resultStr.push(String.fromCharCode(curCharCode));
    }
    return resultStr.join("");
  }

  Tool.num2hex = function(num) {
    return num.toString(16)
  }

  Tool.hex2num = function(hex) {
    return parseInt(hex, 16)
  }

  Tool.Utf8ToUnicode = function(strUtf8) {
    var bstr = "";
    var nTotalChars = strUtf8.length; // total chars to be processed.
    var nOffset = 0; // processing point on strUtf8
    var nRemainingBytes = nTotalChars; // how many bytes left to be converted
    var nOutputPosition = 0;
    var iCode, iCode1, iCode2; // the value of the unicode.

    while (nOffset < nTotalChars) {
      iCode = strUtf8.charCodeAt(nOffset);
      if ((iCode & 0x80) == 0) // 1 byte.
      {
        if (nRemainingBytes < 1) // not enough data
          break;

        bstr += String.fromCharCode(iCode & 0x7F);
        nOffset++;
        nRemainingBytes -= 1;
      } else if ((iCode & 0xE0) == 0xC0) // 2 bytes
      {
        iCode1 = strUtf8.charCodeAt(nOffset + 1);
        if (nRemainingBytes < 2 || // not enough data
          (iCode1 & 0xC0) != 0x80) // invalid pattern
        {
          break;
        }

        bstr += String.fromCharCode(((iCode & 0x3F) << 6) | (iCode1 & 0x3F));
        nOffset += 2;
        nRemainingBytes -= 2;
      } else if ((iCode & 0xF0) == 0xE0) // 3 bytes
      {
        iCode1 = strUtf8.charCodeAt(nOffset + 1);
        iCode2 = strUtf8.charCodeAt(nOffset + 2);
        if (nRemainingBytes < 3 || // not enough data
          (iCode1 & 0xC0) != 0x80 || // invalid pattern
          (iCode2 & 0xC0) != 0x80) {
          break;
        }

        bstr += String.fromCharCode(((iCode & 0x0F) << 12) |
          ((iCode1 & 0x3F) << 6) |
          (iCode2 & 0x3F));
        nOffset += 3;
        nRemainingBytes -= 3;
      } else // 4 or more bytes -- unsupported
        break;
    }

    if (nRemainingBytes != 0) {
      // bad UTF8 string.
      return "";
    }

    return bstr;
  }

  //URL编码
  Tool.urlencode = function(val) {
    return encodeURIComponent(val).
    replace(/%40/gi, '@').
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
  }

  //转码工具
  Tool.striconv = function() {
    this.Dig2Dec = function(s) {
      let retV = 0;
      if (s.length == 4) {
        for (let i = 0; i < 4; i++) {
          retV += eval(s.charAt(i)) * Math.pow(2, 3 - i);
        }
        return retV;
      }
      return -1;
    }
    this.Hex2Utf8 = function(s) {
      let retS = "";
      let tempS = "";
      let ss = "";
      if (s.length == 16) {
        tempS = "1110" + s.substring(0, 4);
        tempS += "10" + s.substring(4, 10);
        tempS += "10" + s.substring(10, 16);
        let sss = "0123456789ABCDEF";
        for (let i = 0; i < 3; i++) {
          retS += "%";
          ss = tempS.substring(i * 8, (eval(i) + 1) * 8);
          retS += sss.charAt(this.Dig2Dec(ss.substring(0, 4)));
          retS += sss.charAt(this.Dig2Dec(ss.substring(4, 8)));
        }
        return retS;
      }
      return "";
    }
    this.Dec2Dig = function(n1) {
      let s = "";
      let n2 = 0;
      for (let i = 0; i < 4; i++) {
        n2 = Math.pow(2, 3 - i);
        if (n1 >= n2) {
          s += '1';
          n1 = n1 - n2;
        } else
          s += '0';
      }
      return s;
    }

    this.Str2Hex = function(s) {
      let c = "";
      let n;
      let ss = "0123456789ABCDEF";
      let digS = "";
      for (let i = 0; i < s.length; i++) {
        c = s.charAt(i);
        n = ss.indexOf(c);
        digS += this.Dec2Dig(eval(n));
      }
      return digS;
    }
    this.Gb2312ToUtf8 = function(s1) {
      let s = escape(s1);
      let sa = s.split("%");
      let retV = "";
      if (sa[0] != "") {
        retV = sa[0];
      }
      for (let i = 1; i < sa.length; i++) {
        if (sa[i].substring(0, 1) == "u") {
          retV += this.Hex2Utf8(this.Str2Hex(sa[i].substring(1, 5)));
          if (sa[i].length) {
            retV += sa[i].substring(5);
          }
        } else {
          retV += unescape("%" + sa[i]);
          if (sa[i].length) {
            retV += sa[i].substring(5);
          }
        }
      }
      return retV;
    }
    this.Utf8ToGb2312 = function(str1) {
      let substr = "";
      let a = "";
      let b = "";
      let c = "";
      let i = -1;
      i = str1.indexOf("%");
      if (i == -1) {
        return str1;
      }
      while (i != -1) {
        if (i < 3) {
          substr = substr + str1.substr(0, i - 1);
          str1 = str1.substr(i + 1, str1.length - i);
          a = str1.substr(0, 2);
          str1 = str1.substr(2, str1.length - 2);
          if (parseInt("0x" + a) & 0x80 == 0) {
            substr = substr + String.fromCharCode(parseInt("0x" + a));
          } else if (parseInt("0x" + a) & 0xE0 == 0xC0) { //two byte
            b = str1.substr(1, 2);
            str1 = str1.substr(3, str1.length - 3);
            let widechar = (parseInt("0x" + a) & 0x1F) << 6;
            widechar = widechar | (parseInt("0x" + b) & 0x3F);
            substr = substr + String.fromCharCode(widechar);
          } else {
            b = str1.substr(1, 2);
            str1 = str1.substr(3, str1.length - 3);
            c = str1.substr(1, 2);
            str1 = str1.substr(3, str1.length - 3);
            let widechar = (parseInt("0x" + a) & 0x0F) << 12;
            widechar = widechar | ((parseInt("0x" + b) & 0x3F) << 6);
            widechar = widechar | (parseInt("0x" + c) & 0x3F);
            substr = substr + String.fromCharCode(widechar);
          }
        } else {
          substr = substr + str1.substring(0, i);
          str1 = str1.substring(i);
        }
        i = str1.indexOf("%");
      }

      return substr + str1;
    }
  }
  return Tool;
}(window);
export default Tool;