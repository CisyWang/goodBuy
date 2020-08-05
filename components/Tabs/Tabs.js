// components/Tabs/Tabs.js
Component({
  properties: {
    tabs:{
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    // currentIndex: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleItemTap(e) {
      console.log(e)
      const {index} = e.currentTarget.dataset
      // this.setData({
      //   currentIndex: index
      // })
      this.triggerEvent("tabsItemChange", {index})
    }
  }
})
