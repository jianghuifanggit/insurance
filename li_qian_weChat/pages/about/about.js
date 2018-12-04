// pages/about/about.js
var request = require("../../utils/request.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userName:'',
    Password:''
  },

  onShow: function () {
    var that = this
    //options.id
    var params = new Object()
    var url = '/User/index'
    var n = 3
    var cookies = wx.getStorageSync('Cookie');
    console.log(cookies)
    //发起请求  
    request.POST(
      {
        params: params,
        url: url,
        n: n,
        cookies: cookies,
        success: function (res) {
          console.log(res.data)
          if(res.data.code>-1){
            var r=res.data.content
            that.setData({
              hb_0: r.hb_0,
              hb_2: r.hb_2,
              userName:r.info.user_login
              //已支付数据库中未记载
            })
          }
          else{
            if (cookies == '') {
              wx.redirectTo({
                url: '../login/login',
              })
            }
            else {
              wx.showToast({
                title: '数据未找到,请重新登录',
                icon: 'none',
                duration: 2000,
                mask: true
              })
            }
          }
        }
      })
  },
 //跳转关于我们的页面
  other: function () {
    wx.navigateTo({
      url: '../other/other',
    })
  },
  //跳转反馈页面
  feedback: function () {
    wx.navigateTo({
      url: '../feedback/feedback',
    })
  },
  //跳转收件地址
  address:function(){
    wx.navigateTo({
      url: '../address_list/address_list',
    })
  },
  //跳转车辆地址
  car: function () {
    wx.navigateTo({
      url: '../car_list/car_list',
    })
  },
  //核保中的保单
  orderList2: function () {
    wx.navigateTo({
      url: '../order_list/order_list?status=' + 2,
    })
  },
  //待支付的保单
  orderList0: function () {
    wx.navigateTo({
      url: '../order_list/order_list?status=' + 0,
    })
  },
  //已支付的保单
  orderList1: function () {
    wx.navigateTo({
      url: '../order_list/order_list?status=' + 1,
    })
  },
  //查询我的保单
  orderList:function(){
    wx.navigateTo({
      url: '../order_list/order_list?status='+'all',
    })
  },
 //查询保单记录
  recode: function () {
    wx.navigateTo({
      url: '../search_recode/search_recode',
    })
  },
  //用户信息
  info: function () {
    wx.navigateTo({
      url: '../about_info/about_info',
    })
  },

})