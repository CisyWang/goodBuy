
Page({
  data: {
    tabs: [
      {
        id: 0,
        name: '体验问题',
        isActive: true
      },
      {
        id: 1,
        name: '商品、商家投诉',
        isActive: false
      }
    ],
    chooseImgs: [],
    textVal: ""
  },
  uploadImgs: [],

  handleTabsItemChange(e) {
    const {index} = e.detail
    const {tabs} = this.data
    tabs.forEach((v,i) => {
      i === index ? v.isActive = true :v.isActive = false
    });
    this.setData({
      tabs
    })
  },

  handleChooseImg() {
    // 调用小程序内置的选择图片 api
    wx.chooseImage({
      // 同时选中的张数
      count: 9,
      // 原图或者压缩
      sizeType: ['original','compressed'],
      // 图片来源 相册 照相机
      sourceType: ['album','camera'],
      success: (result)=>{
       this.setData({
         // 图片数组进行拼接
        chooseImgs: [...this.data.chooseImgs, ...result.tempFilePaths]
       })
      }
    });
  },

  handleRemoveImg(e) {
    const {index} = e.currentTarget.dataset
    let {chooseImgs} = this.data
    chooseImgs.splice(index, 1)
    this.setData({chooseImgs})
  },

  handleTextInput(e) {
    this.setData({
      textVal: e.detail.value
    })
  },

  handleFormSubmit() {
    const {textVal, chooseImgs} = this.data
    if (!textVal.trim()) {
      wx.showToast({
        title: '输入的内容不合法，请重新输入！'
      });
      return
    } 

    wx.showLoading({
      title: '提交中...',
    });
    // 准备上传图片到 专门的图片服务器
    // api 不支持多个文件同时上传，遍历数组挨个上传
    if (chooseImgs.length !== 0) {
      chooseImgs.forEach((v,i) => {
        wx.uploadFile({
          // 图片要上传到哪里
          url: 'https://images.ac.cn/Home/Index/UploadAction/',
          // 要上传的图片路径
          filePath: v,
          // 上传的文件名称
          name: 'file',
          // 文本信息
          formData: {},
          success: (result)=>{
            console.log(result)
            let url = JSON.parse(result.data)
            this.uploadImgs.push(url)
            if (i === chooseImgs.length - 1) {
              wx.hideLoading();
              this.setData({
                textVal: '',
                chooseImgs:[]
              })
              wx.navigateBack({
                delta: 1
              });
            }          
          }
        });
      })
    } else {
      console.log('只提交文本')
      wx.hideLoading();
      wx.navigateBack({
        delta: 1
      });
    } 
  }
})