//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    logs: []
  },
  onShow(){
    //使用custom-tab-bar的示例
    // if (typeof this.getTabBar === 'function' &&
    //   this.getTabBar()) {
    //   this.getTabBar().setData({
    //     selected: 1
    //   })
    // }
  },
  onLoad: function () {
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return util.formatTime(new Date(log))
      })
    })
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    console.log('页面下拉刷新');
    // 开发者工具下自动回弹，真机需代码回弹。个人喜欢用代码控制回弹
    setTimeout(wx.stopPullDownRefresh,1000);
  },

  /**
   * 页面上拉触底事件的处理函数
   * 触发时机与配置的 onReachBottomDistance 有关
   */
  onReachBottom: function () {
    console.log('页面上拉触底');
    wx.createSelectorQuery().selectViewport().scrollOffset(function (res) {
      console.log(`scrollTop: ${res.scrollTop}; scrollHeight: ${res.scrollHeight}`)
    }).exec()
  }
})
