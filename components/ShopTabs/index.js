// components/ShopTabs/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    currentIndex: {
      type: Number,
      default: 0
    },
    titleList: {
      type: Array,
      default: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleTap(e){
      console.log(e)
      let { index } = e.target.dataset
      this.triggerEvent('changeIndex',{index})
    }
  }
})
