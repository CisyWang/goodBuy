import { request } from '../../request/index';
Page({
  data: {
    goodsObj: {},
    isCollect: false,
  },

  GoodsInfo: {},
  

  onShow() {
    let pages =  getCurrentPages();
    let currentPage = pages[pages.length - 1]
    let options = currentPage.options
    let goods_id = options["goods_id "] || options["goods_id"]
    this.getGoodsDetail(goods_id)

    // 商品收藏  从缓存中获取收藏的商品
    let collect = wx.getStorageSync('collect') || [];
    // 判断当前商品是否被收藏，根据 isCollect 改变图标的变化
    let isCollect = collect.some(v => {
      v.goods_id === this.GoodsInfo.goods_id
    })
    this.setData({isCollect})
  },

  async getGoodsDetail(goods_id) {
    const res = await request({url:"/goods/detail",data:{goods_id}})
    console.log(res)
    let goodsObj = res.data.message || {}
    this.GoodsInfo = goodsObj
    this.setData({
      goodsObj: {
        goods_name: goodsObj.goods_name,
        goods_price: goodsObj.goods_price,
        pics: goodsObj.pics,
        // 部分 iphone 不支持 .webp 格式的图片
        goods_introduce: goodsObj.goods_introduce.replace('/\.webp/g','.jpg')
      }
    })
  },

  // 点击轮播图，放大图片
  handlePreviewImage(e) {
    // 构造要预览的图片数组
    console.log(e)
    const urls = this.GoodsList.pics.map(v => v.pics_mid)
    const currentUrl = e.currentTarget.dataset.url
    wx.previewImage({
      current: currentUrl,
      urls: urls
    });
  },

  // 点击添加购物车
  handleCartAdd() {
    // 1.获取缓存中的购物车数据
    let cart = wx.getStorageSync('cart') || [];
    // 2.判断商品是否存在于购物车数组当中
    let index = cart.findIndex(v => v.goods_id === this.GoodsInfo.goods_id)
    if (index === -1) {
      // 不存在数据，第一次添加
      this.GoodsInfo.num = 1
      this.GoodsInfo.checked = true
      cart.push(this.GoodsInfo)
    } else {
      // 存在商品数据，则商品数量 num++
      cart[index].num++
    }
    // 3. 将购物车数据再存入缓存中
    wx.setStorageSync('cart', cart);
    wx.showToast({
      title: '添加购物车成功！',
      mask: true
    });
  },

  // 点击收藏
  handleCollect() {
    let isCollect = false
    // 获取缓存中的收藏商品数组
    let collect = wx.getStorageSync('collect') || [];
    let index = collect.findIndex(v => v.goods_id === this.GoodsInfo.goods_id)
    // 如果 index 不为 -1， 则该商品被收藏
    if (index !== -1) {
      collect.splice(index, 1)
      isCollect = false
      wx.showToast({
        title: '取消收藏',
        icon: 'success',
        mask: true
      });
    } else {
      collect.push(this.GoodsInfo)
      isCollect = true
      wx.showToast({
        title: '收藏成功',
        icon: 'success',
        mask: true
      });
    }

    wx.setStorageSync('collect', collect)
    this.setData({isCollect})
  }

})