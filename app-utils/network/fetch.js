/**
 * 为了便于业务开发对 wx.request 进行封装，有以下几点好处：
 * 
 * 1. 对所有接口增加统一的“阀门”，统一预处理 request 和 response，开发者只需关心具体业务，无需关心其他细节处理。这点在后期项目迭代中可渐渐发挥优势。
 *    如：开发一段时间后，后端要求所有接口都增加 ajax=1 的参数，之前遇到过的情况。如果按照普通方式，开发者需要全局搜索使用了 wx.request 的地方，然后给每个接口的 data 新增 ajax=1。这一操作修改多处地方。如果开发者使用了 fetch.js 提供的方法，则无需烦恼，因为只需在 fetch.js 的 “阀门” 里，对待发送的 data 新增 ajax=1。这一操作只需修改一处地方。
 * 2. 一般一个项目里，前后端会约定接口返回的格式，如：
 *  {
 *    status: true|false, // 所处理业务的状态，成功或失败
 *    data: any, // 当 status 为 true 时，返回的数据
 *    errMsg: '错误信息' // 当 status 为 false 时，返回的提示信息
 *  }
 *  fetch.js 借用 “response 阀门”，根据约定统一判断；此外 fetch.js 提供的发送接口请求的方法均返回 promise。结合这两点，开发者无需自行判断返回的数据，只需在成功和失败的回调里处理各自的逻辑。
 * 3. 提供 wx.request 默认参数、“request 和 response 阀门”、自定义参数，方便开发者使用及维护。
 * 
 * @author Linda Zhang
 * @example
 * */

 const CheckDataType = require('../../utils/check-data-type.js');

 // 默认配置
 var Config = {
   // wx.request 默认参数
   params: {
     header: {
       'content-type': 'application/json'
     },
     method: 'GET',
     dataType: 'json'
   },

   /**
    * 自定义参数，便于开发者覆盖 fetch.js 提供的默认行为。
    * 如果给以下配置设置为 null，则表示禁用相关处理。
    *   requestTap
    *   reponseTap
    */
   customConfig: {
     /**
     * request 阀门
     * @return {JSON} 返回发送给 wx.request 的参数
     */
     requestTap(params) {
       // 暂时没有特殊处理需求
       return params;
     },

     /**
      * response 阀门
      * @return {Boolean} 结合 statusCode 和 返回的 data，判断当前接口成功或失败。
      *                   true: 成功；false: 失败；
      */
     responseTap(res) {
       var { statusCode, data } = res;
       if (statusCode >= 200 && statusCode < 300) {
         if (data && !data.status) {
           return false;
         }
         return true;
       }
       return false;
     },
     getRequestTask: function(requestTask){},
     /**
      * 对 fetch 请求发生的各种错误进行的统一处理。
      */
     error: function({errorType,res}){}
   }
 }

 module.exports = {
   /**
    * 开发者可以修改默认的配置
    */
   config: Config,

   /**
    * 发送接口请求。此方法执行了以下步骤：
    * 1. 合并 params 和 Config.params，得到 paramsC;
    * 2. 合并 customConfig 和 Config.customConfig，得到 customConfigC；
    * 3. 读取 customConfigC 里的 request 阀门 requestTap，如果存在，则进一步处理 paramsC；
    * 4. 重写 wx.request 的参数，success 和 fail，注入 response 阀门。如果用户在 params 中传入了 success 或 fail，也会如常调用（就像不用此 fetch 方法，直接调用 wx.request）。一般来说不用再传入了，因为可以通过返回的 promise 来访问。
    * 5. 将重写后的 success 和 fail 赋值给 paramsC。此时 paramsC 即是传给 wx.request 的最终参数。
    * 6. 发送请求，返回 promise。根据服务器返回及 customConfigC 里的 response 阀门 responseTap，判断成功还是失败来对数据 resolve 或 reject。
    * 7. reject 参数说明，{errorType,res}，根据 errorType 来分类说明：
            errorType 是 'tap': 说明通过 response 阀门判断发送了错误
            errorType 是 'fail': 说明是 wx.request 请求调用了 fail
    */
   fetch(params,customConfig){

     var paramsC = Object.assign({}, Config.params, params),
       customConfigC = Object.assign({}, Config.customConfig, customConfig);

     return new Promise((resolve,reject) => {

       // request 阀门预处理 params
       if (CheckDataType.isFunction(customConfigC.requestTap)) {
         paramsC = customConfigC.requestTap(paramsC);
       }

       // 接入 response 阀门
       var oldSuccess = paramsC.success,
           oldFail = paramsC.fail,
           success = function (res) {
            var isSuccess = true;
            if (CheckDataType.isFunction(customConfigC.responseTap)) {
              isSuccess = customConfigC.responseTap(res);
            }

            if (isSuccess) {
              resolve(res.data, res.statusCode, res.header)
            } else {
              reject({
                errorType: 'tap',
                res: res
              });
            }

            if (CheckDataType.isFunction(oldSuccess)) {
              oldSuccess(res);
            }
           },
           /**
            * res 的格式是 {errMsg: '...'}
            */
           fail = function (res) {
            reject({
              errorType: 'fail',
              res: res
            });

            if (CheckDataType.isFunction(oldFail)) {
              oldFail(res);
            }
           };
       
       paramsC.success = success;
       paramsC.fail = fail;

       var requestTask = wx.request(paramsC);
       
       if (CheckDataType.isFunction(customConfigC.getRequestTask)){
         customConfigC.getRequestTask(requestTask);
       }
     }).catch(errorInfor => {
       if (CheckDataType.isFunction(customConfigC.error)) {
         customConfigC.error(errorInfor);
       }
     })
   }
 }