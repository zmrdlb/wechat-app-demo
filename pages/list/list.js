//logs.js
const util = require('../../utils/util.js'),
      ImgLoad = require('../../behavior/img-load.js');

Component({
    behaviors: [ImgLoad],
    data: {
        list: []
    },
    methods: {
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
            this.compLoadstate = this.selectComponent('#loadstate');
            this.fetchListData(true);
        },
        /**
         * 页面相关事件处理函数--监听用户下拉动作
         */
        onPullDownRefresh: function () {
          console.log('页面下拉刷新');
          this.compLoadstate.pulldownRefresh(()=>{
              this.fetchListData(true);
          })
        },

        /**
         * 页面上拉触底事件的处理函数
         * 触发时机与配置的 onReachBottomDistance 有关
         */
        onReachBottom: function () {
          console.log('页面上拉触底');
          this.fetchListData();

          // wx.createSelectorQuery().selectViewport().scrollOffset(function (res) {
          //   console.log(`scrollTop: ${res.scrollTop}; scrollHeight: ${res.scrollHeight}`)
          // }).exec()
        },

        /**
         * 请求接口加载数据
         * @param  {Boolean} refresh 是否重新刷新数据
         * @return {[type]}         [description]
         */
        fetchListData(refresh){

            // fetchCount 是为了用来模拟加载几屏数据
            if (refresh) {
                this.fetchCount = 0;
            }

            this.compLoadstate.fetchListData(refresh,(successHandle,failHandle,finallyHandle) => {
                // 开发者工具下自动回弹，真机需代码回弹。个人喜欢用代码控制回弹
                setTimeout(()=>{
                    // 模拟第二屏加载失败，再重新加载成功
                    if (this.fetchCount == 1 && !this.force) {
                        // 失败
                        this.force = true;
                        failHandle(); //此处可传递错误提示信息
                    }else{
                        // 成功

                        // 测试数据
                        var data = {list:[{ "id": "274592", "name": "900-83310-0001-000", "price": 2876.6703, "url": "https:\/\/www.arrow.cn\/900-83310-0001-000\/nvidia.html", "image": "https:\/\/download.siliconexpert.com\/pdfs\/2017\/11\/7\/1\/53\/40\/937\/nvda_\/manual\/900-83310-0001-000.jpg", "description": "Jetson TX2 \u6a21\u5757" }, { "id": "818183", "name": "MCIMX8M-EVK", "price": 3237.1553, "url": "https:\/\/www.arrow.cn\/mcimx8m-evk\/nxp-semiconductors.html", "image": "https:\/\/static6.arrow.com\/aropdfconversion\/arrowimages\/e894ff11b5efd858b7caf08b917830b8368e5c3d\/nxp.jpg", "description": "MIMX8MQ6DVAJZAA Application Processor and SOC Evaluation Kit 1500MHz CPU 3GB RAM 32MB\/16GB eMMC Flash\/NOR Flash Android\/FreeRTOS\/Linux" }, { "id": "1506053", "name": "BQ40Z80RSMR", "price": 20.9514, "url": "https:\/\/www.arrow.cn\/bq40z80rsmr\/texas-instruments.html", "image": "https:\/\/static6.arrow.com\/aropdfconversion\/arrowimages\/23c2407a42b37b235a9cadce6c68f5e2643eef4a\/rsm0032b.jpg", "description": "Li-Ion 32V 32-Pin VQFN EP T\/R" }, { "id": "1534760", "name": "F3L11MR12W2M1B65BOMA1", "price": 1350.0163, "url": "https:\/\/www.arrow.cn\/f3l11mr12w2m1b65boma1\/infineon-technologies-ag.html", "image": "https:\/\/static6.arrow.com\/aropdfconversion\/arrowimages\/212f7f4cfdc42576949f0051f2d5453d1e5a0213\/f3l11mr12w2m1_b65.jpg", "description": "Cool SiC Trench MOSFET with 3-Level IGBT 18-Pin" }]};

                        var {list} = this.data;
                        if(refresh){
                            list = [];
                        }

                        this.fetchCount++;
                        if(this.fetchCount == 4) { // 设置第4屏的数据为空
                            data.list = [];
                        }

                        // 重写list数据中的id
                        var beginIndex = list.length;
                        data.list.forEach((item,index) => {
                            item.id = item.id+'-'+(beginIndex+index);
                        })

                        // 随机给一个项设置无效图片
                        if(data.list.length){
                            var invalid_index = Math.floor(Math.random()*data.list.length),
                                original_image = data.list[invalid_index].image;

                            if(original_image){
                                data.list[invalid_index].image = original_image + '.jpg';
                            }
                        }

                        this.setData({
                            list: list.concat(data.list)
                        })
                        successHandle(data);
                    }

                    // finally
                    finallyHandle();

                  }, 2500);
            })

          },

          // 点击加载更多
          onFetchMore(){
              this.fetchListData()
          },

          // 刷新列表
          onRefreshList(){
              this.fetchListData(true)
          },

          // 跳转外部链接
          // 参考文章：http://www.ctoutiao.com/891889.html
          // https://blog.csdn.net/xinzi11243094/article/details/80943607
          onGoOut(e){
              wx.navigateTo({
                  url: '/pages/out/out?url=' + encodeURI(e.currentTarget.dataset.url)
              })
          }
    }
})
