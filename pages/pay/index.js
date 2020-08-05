Page({
  data: {
    address: {},
    cart: [],
    totalPrice: 0,
    totalNum: 0
  },

  onShow (){
    // 页面加载时获取 收货地址
    const address = wx.getStorageSync('address') || {};
    let cart = wx.getStorageSync('cart') || []
    console.log(cart)
    cart = cart.filter(v => v.checked)
    this.setCart(cart)
    this.setData({address})
  },

  // 订单状态变化，计算总数量和总价格
  setCart(cart){
    let totalPrice = 0
    let totalNum = 0
    cart.forEach(v => {
      if (v.checked) {
        totalNum += v.num
        totalPrice += v.goods_price * v.num
      }   
    });
    this.setData({
      cart,
      totalNum,
      totalPrice
    })
  },

  // 点击支付  小程序个人号无法实现 支付功能
  handleOrderPay() {
    // 1、判断是否含有 token
    const token = wx.getStorageSync("token", token);
    // 没有token就 跳转到授权页面
    if (!token) {
      wx.navigateTo({
        url: '/pages/auth/index'
      });
      return;
    }
    console.log("已经存在 token")
  }
})