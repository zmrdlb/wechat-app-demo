/**
 * 供开发者发起 api 请求的方法入口
 * @author Linda Zhang
 * @example
 */

const {config:Config, fetch:Fetch} = require('./fetch.js');

/**
 * 根据小程序环境，获取基本的 api url。
 * 目前没有一个api可以判断小程序所处的环境：开发版，体验版，正式版。
 * 参考网上的一个方法，通过判断 Referer 来识别环境。
 * 
 * Request header:
 * Referer:https://servicewechat.com/小程序的appid/运行环境/page-frame.html
 * 经验证，运行环境对应的值如下：开发者工具中，为devtools，开发版及体验版为0，正式版则为1，这样就能区分运行环境了。
 * 参考文章：https://www.cnblogs.com/xyyt/p/9996855.html
 */
const BaseUrl = (function(){
  var platform = wx.getSystemInfoSync().platform,
      baseurl;
  
  switch(platform){
    case 'devtools':
      baseurl = 'https://dev.arrow.api';
      break;
    default:
      baseurl = 'https://other.arrow.api';
      break;
  }

  return baseurl;
})()

/**
 * 针对 app 修改请求的默认配置
 */

Config.customConfig.error = function ({errorType, res}) {
  console.log(errorType,res);
}

module.exports = {
  /**
   * 同 fetch.js 的 fetch。此处增加对 BaseUrl 的添加
   */
  fetch(params, customConfig){
    if(!params.url){
      return;
    }
    params.url = BaseUrl + params.url;

    return Fetch(params,customConfig);
  },

  fetchPure: Fetch
}
