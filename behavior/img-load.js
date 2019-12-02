/**
 * 图片加载。当图片加载失败替换成默认图片。
 * @author Linda Zhang
 * @example
 * */

module.exports = Behavior({
    data: {
        // 默认图片
        defaultImg: 'https://www.arrow.cn/pub/static/frontend/Arrow/commerce/zh_Hans_CN/Magento_Catalog/images/product/placeholder/image.jpg'
    },
    methods: {
        // 图片加载失败，替换为默认图片
        onImgLoadError(e){
            this.setData({
                [`list[${e.currentTarget.dataset.index}].image`]: this.data.defaultImg
            })
        }
    }
})
