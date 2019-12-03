//index.js
//获取应用实例
const app = getApp(),
      ApiFetch = require('../../app-utils/network/api-fetch.js'),
      UserinfoBehavior = require('../../behavior/userinfo.js');

Component({
  behaviors: [UserinfoBehavior],
  data: {
    motto: 'Hello World',
    bannerList: [{
        url: 'https://pro.m.jd.com/mall/active/3kj9XyNpKxHqmBnc42yFbHruqgdx/index.html',
        image: 'https://m.360buyimg.com/mobilecms/s700x280_jfs/t1/92647/1/3231/196967/5de0b129E4060b52c/cf82e9cb626437ad.jpg!cr_1125x445_0_171!q70.jpg.dpg'
    },{
        url: 'https://pro.m.jd.com/mall/active/2kQMcoUXZNXz1j9Ujy9sg6vgDvYZ/index.html',
        image: 'https://m.360buyimg.com/mobilecms/s700x280_jfs/t1/88370/4/4000/98947/5de4d8f7Ee997b444/fb566733b4d1b6ea.jpg!cr_1125x445_0_171!q70.jpg.dpg'
    },{
        url: 'https://h5.m.jd.com/babelDiy/Zeus/3a9Q8JhSik8yfwwjai9WWaessRZt/index.html',
        image: 'https://m.360buyimg.com/mobilecms/s700x280_jfs/t1/31162/17/1128/101786/5c46ead8E22ee9740/f66061da227c1965.jpg!cr_1125x445_0_171!q70.jpg.dpg'
    },{
        url: 'https://h5.m.jd.com/active/yard-channel/index.html?themeId=30487&babelChannel=12539622&innerLink=%5B%7B%22matId%22%3A%224155894%22%7D%5D&themeStyle=0',
        image: 'https://imgcps.jd.com/ling4/4155894/5pSS5py65LmQ6Laj/6Ieq5bex6YCJ77yM5q-P5Liq6YO95ruh5oSP/p-5c1361ed82acdd181dd72178/3396f2a5/cr_1125x445_0_171/s1125x690/q70.jpg'
    },{
        url: 'https://pro.m.jd.com/mall/active/25dXnw7QzsdA1TBYhmUJaaG3yHZa/index.html',
        image: 'https://m.360buyimg.com/mobilecms/s700x280_jfs/t1/98980/18/3981/122097/5de4d524E0b86cc9e/22faa58a00361545.jpg!cr_1125x445_0_171!q70.jpg.dpg'
    }]
  },
  lifetimes: {
      created(){
          this.bannerCurrent = 0;
      }
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
    },
    /**
     * banner 切换，记录当前 current
     * @param  {[type]} e [description]
     * @return {[type]}   [description]
     */
    onBannerSwitch(e){
        this.bannerCurrent = e.detail.current;
    },
    /**
     * 点击 banner 跳转页面
     * @param  {[type]} e [description]
     * @return {[type]}   [description]
     */
    onBannerTap(e){
        wx.navigateTo({
            url: '/pages/out/out?url=' + encodeURI(this.data.bannerList[this.bannerCurrent].url)
        })
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
