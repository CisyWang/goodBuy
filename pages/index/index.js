import { request } from "../../request/index";
Page({
  data: {
    swiperList: [],
    cateList: [],
    floorList:[]
    
  },
  //options(Object)
  onLoad: function(options){
    this.getSwiperList()
    this.getCateList()
    this.getFloorList()
    
  },
  getSwiperList() {
    request(
      {url:"/home/swiperdata"}
    ).then(result => {
      this.setData({
        swiperList:result.data.message
      })
    }).catch(err => {
      console.log(err)
    })
  },
  getCateList() {
    request(
      {url:"/home/catitems"}
    ).then(result => {
      console.log(result)
      this.setData({
        cateList:result.data.message
      })
    }).catch(err => {
      console.log(err)
    })
  },

  getFloorList() {
    request(
      {url:"/home/floordata"}
    ).then(result => {
      console.log(result)
      this.setData({
        floorList:result.data.message
      })
    }).catch(err => {
      console.log(err)
    })
  }
});
