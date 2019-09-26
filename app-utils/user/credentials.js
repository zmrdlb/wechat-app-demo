/**
 * 处理小程序登录，获取自定义登录态信息
 * @author Linda Zhang
 * @example
 * */

module.exports = {
  /**
   * 获取自定义登录态，将结果异步返回。
   * 
   * 说明：
   *  规定自定义登录态存储在 key 为 login-status 的 storage 里。
   */
  getLoginStatus(){
    return new Promise((resolve,reject) => {
      // 自定义登录态
      var loginStatus = wx.getStorageSync('login-status');
      if (!loginStatus) {
        wx.login({
          success(res) {
            console.log(res.code); //后期根据返回的res.code，请求开发者服务器获取自定义登录态
            setTimeout(() => {
              loginStatus = 'ZMRDLB';
              wx.setStorage({
                key: 'login-status',
                data: loginStatus
              })
              resolve(loginStatus);
            },300)
          },
          fail(error){
            reject(error)
          }
        })
      }else{
        resolve(loginStatus);
      }
    })
  }
}