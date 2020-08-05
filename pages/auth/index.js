import { request } from '../../request/index.js'
import { wxlogin } from '../../utils/asyncWx.js'
Page({
  data: {

  },
  async handleGetUserInfo(e) {
    const {encryptedData, iv, rawData, signature} = e.detail
    const {code} = await wxlogin()
    const data = {encryptedData, iv, rawData, signature, code}
    const res = await request({url:"/users/wxlogin",data:data,method:"post"})
    console.log(res)
  }
})