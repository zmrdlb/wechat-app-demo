//index.js
//获取应用实例
const app = getApp(),
      ApiFetch = require('../../app-utils/network/api-fetch.js'),
      UserinfoBehavior = require('../../behavior/userinfo.js');

Component({
  behaviors: [UserinfoBehavior],
  data: {
    motto: 'Hello World'
  },
  methods: {
    onLoad: function () {
      console.log('onLoad index');

      //使用带 shareTicket 的转发
      wx.showShareMenu({
        withShareTicket: true
      })
    },
    onShow() {
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
    onHide() {
      //使用系统tab-bar的示例
      wx.hideTabBarRedDot({ index: 0 });
    },
    onReady() {
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
    }
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