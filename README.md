# wechat-app-demo

# components

## list-loadstate

一般app中的列表加载，都是采用瀑布流的方式。那么数据加载期间，需要提供 loading,error,empty 这些友好的状态提示。此组件意在整理接口请求与状态提示的交互逻辑。现整理的逻辑如下（较复杂）

| 场景       | loading         | error       | 接口返回的数据为空 | 接口返回的数据不为空 |
|:----------|:----------|:----------|:----------|:----------|
| 首屏 | 全屏loading  | 全屏error提示，可点击刷新 | 全屏empty提示 | 渲染数据 |
| 下拉刷新 pulldown | 系统默认pulldown loading及自定义的全屏loading| 1. 当前页面有数据，不清空页面，弹层提示错误信息；2. 当前页面数据为空，同”首屏error” | 清空当前页面，同“首屏empty” | 清空当前页面，渲染数据 |
| 1. 滑动页面触底瀑布流加载下一屏；2. 点击列表末尾的“加载更多” | appending loading | appending error，可点击重新加载 | 没有更多数据提示 | 不清空当前页面，append 数据并渲染。如果接口告知还有更多数据，则显示点击加载更多| 

### example

请参见页面 pages/list/list

### properties

| 属性名 | 类型 | 默认值 | 描述 |
|:-----|:-----|:-----|:-----|
| list | Array | [] | 列表数据。只用作判断当前列表是否有数据 |
| pureRefreshFailText | String | '刷新失败' | 下拉刷新pulldown时，接口请求失败。如果列表不为空，弹层提示的默认错误信息。具体错误信息也可通过failHandle传入修改 |
| pdFLoading | Boolean | true | 默认情况下，如果页面开启了pulldown，则默认pulldown loading和全屏loading共存。如果想当pulldown loading显示时关闭全屏loading的显示，则设置为false。 |
