/*
 * @Author: Cube
 * @Last Modified time: 2021-01-08 20:33:20
 * https://github.com/paulirish/break-on-access/blob/master/break-on-access.js
 */

function BP() {
  let BP = {}
  BP._bpMap = {}
  BP._bpList = []

  BP.on = function(argument) {
    // body...
  }
  BP.off = function(argument) {
    // body...
  }
}

/**
 * [breakOn description]
 * @param  {Obj}      obj           宿主对象
 * @param  {String}   propertyName  宿主对象的属性名
 * @param  {String}   mode          默认write,可选read
 * @param  {Function} func        回调函数,默认返回false,不阻塞值写入
 * @return {Obj}                  返回控制器,包含disable/enable
 */
function breakOn(obj, propertyName, mode, func) {

  function getPropertyDescriptor(obj, name) {

    let property = Object.getOwnPropertyDescriptor(obj, name);
    let proto = Object.getPrototypeOf(obj);
    while (property === undefined && proto !== null) {
      property = Object.getOwnPropertyDescriptor(proto, name);
      proto = Object.getPrototypeOf(proto);
    }
    if (property !== undefined)
      return property;
    console.warn('The property is not exist,and insert it auto!')
    obj[propertyName] = null
    return getPropertyDescriptor(obj, propertyName)
  }

  function verifyNotWritable() {
    if (mode !== 'read')
      throw "This property is not writable, so only possible mode is 'read'.";
  }

  let enabled = true;
  let originalProperty = getPropertyDescriptor(obj, propertyName);
  let newProperty = { enumerable: originalProperty.enumerable };

  func = typeof func == 'function' ? func : function(){
    console.log('BreakOn ' + !mode? 'write' : mode)
  }

  // write
  if (originalProperty.set) { // accessor property
    newProperty.set = function(val) {
      if (enabled && func(val)){
        return
      }
      originalProperty.set.call(this, val);
    }
  } else if (originalProperty.writable) { // value property
    newProperty.set = function(val) {
      if (enabled && func(val)){
        return
      }

      originalProperty.value = val;
    }
  } else {
    verifyNotWritable();
  }

  // read
  newProperty.get = function(val) {
    if (enabled && mode === 'read' && func(val)){
        return;
    }

    return originalProperty.get ? originalProperty.get.call(this, val) : originalProperty.value;
  }

  Object.defineProperty(obj, propertyName, newProperty);

  return {
    disable: function() {
      enabled = false;
    },

    enable: function() {
      enabled = true;
    }
  };
};
export default breakOn