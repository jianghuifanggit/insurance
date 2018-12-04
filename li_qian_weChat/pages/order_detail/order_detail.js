// pages/order_detail/order_detail.js
Page({
  data: {
  },

  //返回
  back: function (e) {
    wx.navigateTo({
      url: '../order_list/order_list',
    })
  },

  //个人中心
  about: function () {
    wx.switchTab({
      url: '../about/about',
    })
  },

//支付
pay:function(e){
  var orderId = e.target.dataset.id;
  wx.navigateTo({
    url: '../pay_money/pay_money?orderId='+orderId,
  })
},

  onLoad: function (options) {
    var that = this;
    console.log(options.id);
    that.setData({
      orderId:options.id
    })
    var request = require("../../utils/request.js")
    //options.id
    var params = new Object()
    params.id = options.id
    var url = '/User/order_detail'
    var n = 3
    var cookies = wx.getStorageSync('Cookie');
    //发起请求  
    request.POST(
      {
        params: params,
        url: url,
        n: n,
        cookies: cookies,
        success: function (res) {
          console.log(res.data)
          if (res.data.code < -10) {
            wx.navigateTo({
              url: '../login/login',
            })
          }
          that.setData({
            info: res.data.info
          })
        }
      })

  }
})