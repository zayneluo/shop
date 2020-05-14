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