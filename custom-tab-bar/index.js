// custom-tab-bar/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    selected: 0,
    list: [{
      "pagePath": "/pages/index/index",
      "text": "首页",
      "iconPath": "/images/home-tabbar.png",
      "selectedIconPath": "/images/home-selected-tabbar.png"
    },
    {
      "pagePath": "/pages/logs/logs",
      "text": "Logs",
      "iconPath": "/images/log-tabbar.png",
      "selectedIconPath": "/images/log-selected-tabbar.png"
    }]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    tabChange(e){
      var {item} = e.detail;
      wx.switchTab({ url: item.pagePath })
      // mp-tabbar 的 current 更改不会影响 this.data.selected，但反之会影响。说明是单向数据流。
    }
  }
})
