/**
 * 提示列表加载的各种状态显示。交互请参见readme说明
 * @author Linda Zhang
 * @example
 */

Component({
    options: {
        addGlobalClass: true,
        pureDataPattern: /^pure/ // 指定所有 pure 开头的数据字段为纯数据字段
    },
    /**
     * 在page中指定的con-class下，直接定义css生效，但是选择后代选择器定义样式就不能生效。
     * 故设置了addGlobalClass。
     * @type {Array}
     */
    externalClasses: ['con-class'],
    /**
     * 组件的属性列表
     */
    properties: {
        list: {
            type: Array,
            value: []
        },
        // 当前列表不为空，此时pulldown下拉刷新，接口请求失败，给出toast弹层默认提示信息
        pureRefreshFailText: {
            type: String,
            value: '刷新失败'
        },
        /**
         * 默认情况下，如果页面开启了pulldown，则默认pulldown loading和全屏loading共存。
         * 如果想当pulldown loading显示时关闭全屏loading的显示，则设置为false。
         */
        pdFLoading: {
            type: Boolean,
            value: true
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        loading: false, // 是否正在请求数据
    	showError: false, // 是否显示错误信息
    	pulldown: false, // 是否处于pulldown下拉刷新状态
    	more: false, // 是否有更多数据
        isDelayElapsed: false // 从开始请求时，200ms 以后如果请求还未完成，才显示 loading 样式
    },

    /**
     * 组件的方法列表
     */
    methods: {

        /**
         * 根据当前请求返回的列表数据，判断是否还有下一屏。判断如下：
         *      如果有more字段，则根据以more字段为主。more && list.length > 0，则表示有下一屏
         *      如果没有more字段，则 list.length > 0，假定有下一屏。
         * @param  {[type]} data [description]
         * @return {[type]}      [description]
         */
        checkMore(data){
            if(data.more != undefined){
                return !!data.more && data.list.length > 0;
            }
            return data.list.length > 0;
        },

        /**
         * 接口请求成功
         * @param  {JSON} data 接口返回的数据
         * {
         *      more: true|false // 可选，表示是否还有下一屏
         * }
         * @return {[type]}         [description]
         */
        successHandle(data){
            this.setData({
                more: this.checkMore(data)
            })
        },

        /**
         * 接口请求失败
         * @param  {String} [errmsg] 错误信息提示
         * @return {[type]}        [description]
         */
        failHandle(errmsg){
            if (this.data.pulldown && this.data.list.length > 0){
                wx.showToast({
                    title: errmsg || this.data.pureRefreshFailText
                })
            }else{
                this.setData({
                    showError: true
                })
            }
        },

        /**
         * 接口请求完毕
         * @return {[type]} [description]
         */
        finallyHandle(){
            this.stopPulldown();
            this.setData({
                loading: false
            })
        },

        /**
         * 供外部组件或页面调用的接口请求api
         * @param  {Boolean} refresh   是否刷新列表。如果为true，请求成功则先清空列表数据后渲染新数据。
         * @param  {Function} customFetch 提供真正的接口请求
         * @return {[type]}             [description]
         */
        fetchListData(refresh,customFetch){
            var {loading,more} = this.data;
            if (loading || (!refresh && !more)){
                this.stopPulldown();
                return;
            }

            console.log('fetch data');
            this.setData({
                loading: true,
                showError: false,
                isDelayElapsed: false
            })

            customFetch(this.successHandle.bind(this),this.failHandle.bind(this),this.finallyHandle.bind(this));

            setTimeout(() => {
                this.setData({
                    isDelayElapsed: true
                })
            },200);
        },

        // 点击加载更多
        onFetchMore(){
            this.triggerEvent('fetchmore');
        },

        // 刷新列表
        onRefreshList(){
            this.triggerEvent('refresh')
        },

        /**
         * 关闭下拉刷新
         * @return {[type]} [description]
         */
        stopPulldown(){
            if (this.data.pulldown) {
                this.setData({
                    pulldown: false
                })
                wx.stopPullDownRefresh();
            }
        },

        /**
         * 页面下拉刷新
         * @param  {Function} fetchCall 接口请求回调
         * @return {[type]}            [description]
         */
        pulldownRefresh(fetchCall){
            if(!this.data.pulldown){
                this.setData({
                    pulldown: true
                })
                fetchCall();
            }
        }
    }
})
