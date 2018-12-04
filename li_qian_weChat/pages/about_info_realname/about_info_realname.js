// pages/about_info_realname/about_info_realname.js
Page({
  data: {
  },
  // 返回
  back: function () {
    wx.navigateTo({
      url: '../about_info/about_info',
    })
  },

  onLoad: function (options) {
    var that = this
    var request = require("../../utils/request.js")
    var params = new Object()
    var url = '/User/users_safe_realname'
    var n = 3
    var cookies = wx.getStorageSync('Cookie');
    //发起请求  
    request.POST({
      params: params,
      url: url,
      n: n,
      cookies: cookies,
      success: function (res) {
        console.log(res.data)
        if(res.data.code==0)
        {
          that.setData({
            data: res.data.content
          })
        }
        else {
          wx.navigateTo({
            url: '../login/login',
          })
          }
      }
    })
  
  },

})