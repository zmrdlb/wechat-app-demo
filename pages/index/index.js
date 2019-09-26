//index.js
//获取应用实例
const app = getApp(),
      ApiFetch = require('../../app-utils/network/api-fetch.js');

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }

    //使用带 shareTicket 的转发
    wx.showShareMenu({
      withShareTicket: true
    })
  },
  onShow(){
    //使用custom-tab-bar的示例
    // if (typeof this.getTabBar === 'function' &&
    //   this.getTabBar()) {
    //   this.getTabBar().setData({
    //     selected: 0
    //   })
    // }

    //使用系统tab-bar的示例
    //只是显示红点
    //wx.showTabBarRedDot({index: 0});
    //显示红点并在里面添加文字
    wx.setTabBarBadge({
      index: 0,
      text: '11'
    })
  },
  onHide(){
    //使用系统tab-bar的示例
    wx.hideTabBarRedDot({ index: 0 });
  },
  onReady(){
    //测试封装的fetch
    // ApiFetch.fetch({
    //   url: '/usr/api'
    // });

    /**
     * 打印当前平台信息 platform
     * 微信开发者工具：devtools
     * 苹果手机：ios
     */
    // wx.showModal({
    //   title: '客户端平台',
    //   content: wx.getSystemInfoSync().platform
    // })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (obj) {
    return {
      title: 'arrow 首页',
      path: '/pages/index/index',
      imageUrl: 'http://static6.arrow.com/aropdfconversion/arrowimages/251dd22533b9d635cab380d2dc4f83c680afd230/RASPBERRYPI4-4GBMainimage.jpg'
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})

/**
 * 换起转发，选择群或个人后，转发界面关闭。还是会触发一次 onAppShow 事件。
 * 关于 shareTicket，只有转发到群聊并且从群聊中打开才会有值。如从群聊1中打开：
 *    1. 触发 onAppShow，shareTicket 有值。
 *    2. 接着继续转发。
 *    3. 转发操作窗口关闭后，再次触发 onAppShow，此时 shareTicket 无值。
 *    
 */
wx.onAppShow(options => {
  if (options.shareTicket){
    wx.getShareInfo({
      shareTicket: options.shareTicket,
      success(res){
        console.log(res);
      }
    })
  }
})