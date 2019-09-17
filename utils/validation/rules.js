/**
 * 各种数据验证规则。每种验证单独设计，如果要结合 validation 等form表单插件，添加验证规则，建议结合 isOptional 一起使用。
 * @author Linda Zhang
 * @example
 * */

var toString = Object.prototype.toString;

module.exports = {
  /**
   * 判断一个数据是否是可选的。
   * @return {Boolean}
   *    true: 如果val是以下几种情况: null,undefined,'',[],{}
   *    false: val 是不为“空”的数据
   */
  isOptional(val) {
    var isEmpty = val == undefined;

    if (!isEmpty) {
      if (val === '') {
        isEmpty = true;
      } else if (toString.call(val) === '[object Array]') {
        isEmpty = val.length == 0;
      } else if (toString.call(val) === '[object Object]' && val.constructor == Object) {
        isEmpty = Object.keys(val).length == 0;
      }
    }

    return isEmpty;
  },
  // 0-9 的数字
  digit(val){
    return /^\d+$/.test(val);
  },
  // qq 号
  qq(val){
    return /^\d{9}$/.test(val);
  }
}