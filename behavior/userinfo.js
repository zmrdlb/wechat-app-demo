/**
 * 用户信息授权的处理
 * @author Linda Zhang
 * @example
 * */

const app = getApp();

module.exports = Behavior({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  attached: function () {
    console.log('attached');
    this.loadUserInfo();
  },
  methods: {
    // 页面初始化，加载 userInfo 信息
    loadUserInfo(){
      if (app.globalData.userInfo) {
        console.log('app.globalData.userInfo 存在');
        this.setUserInfo(app.globalData.userInfo);
      } else if (this.data.canIUse) {
        // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
        // 所以此处加入 callback 以防止这种情况
        app.userInfoReadyCallback = res => {
          console.log('触发 app.userInfoReadyCallback');
          this.setUserInfo(res.userInfo);
        }
      } else {
        // 在没有 open-type=getUserInfo 版本的兼容处理
        console.log('没有 open-type=getUserInfo 版本的兼容处理');
        wx.getUserInfo({
          success: res => {
            this.setUserInfo(app.globalData.userInfo = res.userInfo);
          }
        })
      }
    },
    // open-type="getUserInfo" 的 button 的点击事件
    getUserInfo(e) {
      this.setUserInfo(app.globalData.userInfo = e.detail.userInfo);
    },
    // 更新 userInfo 数据
    setUserInfo(userInfo){
      if(userInfo){
        this.setData({
          userInfo: userInfo,
          hasUserInfo: true
        })
      }
    }
  }
})