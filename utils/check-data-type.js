/**
 * 数据类型判断
 * @author Linda Zhang
 * @example
 * */

var toString = Object.prototype.toString;

module.exports = {
  /**
   * data是否是无效字段。即是null|undefined|''
       * @param {Object} data
   */
  isInvalid: function(data) {
    if (data == null || data === '') {
      return true;
    }
    return false;
  },
  /**
   * 是否是Object对象的实例，通常用来检测data是否是一个纯的JSON字段或new Object()
       * @param {Object} data
   */
  isObject: function(data) {
    return toString.call(data) == '[object Object]' && data.constructor == Object;
  },
  /**
   * 数据类型是否是object。不仅仅限于是纯的Object实例化的对象：
   * function test(){}
   * var t = new test()
   * Object.prototype.toString.call(t)
   * output: "[object Object]"
   */
  isObjectType: function(data) {
    return toString.call(data) == '[object Object]';
  },
  /**
   * 是否是function
       * @param {Object} data
   */
  isFunction: function(data) {
    return typeof data == 'function';
  },
  /**
   * 是否是Array
       * @param {Object} data
   */
  isArray: function(data) {
    return toString.call(data) == '[object Array]';
  },
  /**
   * 是否是boolean
       * @param {Object} data
   */
  isBoolean: function(data) {
    return typeof data == 'boolean';
  },
  /**
   * 是否是String
       * @param {Object} data
   */
  isString: function(data) {
    return typeof data == 'string';
  },
  /**
   * 是否是Number
       * @param {Object} data
   */
  isNumber: function(data) {
    return typeof data == 'number';
  }
}