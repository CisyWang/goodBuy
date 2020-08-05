import { chooseAddress, getSetting, openSetting, showModel, showToast } from '../../utils/asyncWx.js';
Page({
  data: {
    address: {},
    cart: [],
    allChecked: false,
    totalPrice: 0,
    totalNum: 0
  },

  onShow (){
    // 页面加载时获取 收货地址
    const address = wx.getStorageSync('address') || {};
    const cart = wx.getStorageSync('cart') || []
    // 全选
    // const allChecked = cart.length ? cart.every(v => v.checked) : false
    console.log(cart)
    this.setCart(cart)
    this.setData({address})
  },

  // 点击获取收货地址
  async handleAddress() {
    // 获取用户向小程序获取的权限
    // 用户点击 获取收货地址提示框 确定按钮  scope 值为 true
    // 用户点击 取消按钮 值为 false  引导用户 openSetting 打开授权设置
    // 用户从未 调用收获地址的 api，则值为 undefinded
    try{
      const res = await getSetting()
        // 获取用户获得的地址 判断用户是否确认或者拒绝 获取地址授权
        let scopeAddress = res.authSetting['scope.address']
        if (scopeAddress === false) {
          await openSetting()
        }
        const address = await chooseAddress()
        address.all = address.provinceName + address.cityName + address.countyName + address.detailInfo
        wx.setStorageSync('address', address);
    } catch(error) {
      console.log(error)
    }
  },

  // 点击复选框
  handleItemChange(e) {
    // 获取被修改的商品
    const goods_id = e.currentTarget.dataset.id
    const {cart} = this.data
    
    const index = cart.findIndex(v => v.goods_id === goods_id)
    cart[index].checked = !cart[index].checked
    this.setData({
      cart
    })
    wx.setStorageSync('cart', cart)
    
    this.setCart(cart)
  },

  // 订单状态变化，计算总数量和总价格
  setCart(cart){
    console.log('ddd')
    let allChecked = true
    let totalPrice = 0
    let totalNum = 0
    cart.forEach(v => {
      if (v.checked) {
        totalNum += v.num
        totalPrice += v.goods_price * v.num
      } else {
        allChecked = false
      }
    });
    allChecked = cart.length != 0 ? allChecked : false
    this.setData({
      cart,
      allChecked,
      totalNum,
      totalPrice
    })
  },

  // 商品全选功能
  handleItemAllChecked() {
    // 获取 data 中的数据
    let {cart, allChecked} = this.data
    
    allChecked = !allChecked
    cart.forEach(v => v.checked = allChecked)
    this.setData({
      cart,
      allChecked
    })
  },

  async handleItemNumEdit(e) {
    let {id, operation} = e.currentTarget.dataset
    let {cart} = this.data
    const index = cart.findIndex(v => v.goods_id === id)
    if (cart[index].num == 1 && operation == '-1') {
      const res = await showModel({content: "您是否要删除该商品？"})
      if (res.confirm) {
        cart.splice(index, 1)
        this.setCart(cart)
        wx.setStorageSync('cart',cart)
      }
    } else {
      cart[index].num += parseInt(operation)
      this.setCart(cart)
    }
  },

  // 点击 结算
  async handlePay() {
    // 1.判断是否选择了收货地址
    const {address, totalNum} = this.data
    if (!address.userName){
      await showToast({title:"您还没有选择收货地址"})
      return
    }
    // 2.判断是否选择了商品
    if (totalNum === 0) {
      await showToast({title:"您还没有选择商品"})
      return
    }
    // 3.跳转到支付页面
    wx.navigateTo({
      url: '/pages/pay/index',
    });
  }
})