# 原生方式实现小程序商城

## api文档

请点击[showdoc](https://www.showdoc.cc/128719739414963?page_id=2513235043485226)查看

## 技能和注意点

- ### 原生vh或者百分比是可以参加计算

```css
.cate_view {
  /*less中并不支持百分比与固定的单位进行计算*/
  /*原生vh或者百分比是可以参加计算的*/
  height: calc(100vh - 90rpx);
  display: flex;
}
```

- ### less中让语句不被less编译

```less
.cate_view {
  /*less中让语句不被less编译*/
  height: ~'calc(100vh - 90rpx)';
}
```

- ### 小程序对ES6模块化支持并不全面（官方推荐CommonJS规范）

- ### 小程序中本地存储可以存储任意类型的数据

- ### 小程序的swiper组件有默认的高度，需要自己调整

```css
原图的宽度 / 原图的高度 = 变化后的图片宽度 / 要设置的高度
```

- ### 设置文本溢出到第几行出现省略号

```css
.line2 {
    display: -webkit-box;
    overflow: hidden;
    white-space: normal!important;
    text-overflow: ellipsis;
    word-wrap: break-word;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical
}
```

- ### Swiper-item组件的target和currentTarget有点问题，需要注意

- ### navigator组件跳转页面如果是tabbar上的页面需要设置opentype为switchtab

- ### 之前的版本的小程序使用async和await有问题，可以引入Facebook的库解决，现在使用正常

[[regenerator](https://github.com/facebook/regenerator)](https://github.com/facebook/regenerator/blob/5703a79746fffc152600fdcef46ba9230671025a/packages/regenerator-runtime/runtime.js)

```js
//每个页面都需要引入
import regeneratorRuntime from '../../lib/runtime/runtime';
```

- ### 直接通过微信接口获取用户地址可能会出问题，因为用户如果选择拒绝之后，再次点击不会弹出提示获取用户收货地址的确认弹窗

