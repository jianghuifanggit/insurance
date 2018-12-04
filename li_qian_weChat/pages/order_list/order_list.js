// pages/order_list/order_list.js
var request = require("../../utils/request.js")
Page({
  data: {
  },
  back: function () {
    wx.switchTab({
      url: '../about/about',
    })
  },
  
  // 详情和前往支付跳转页面
  bdDetail:function(e){
    var that=this;
    var id = e.target.dataset.id;
    wx.navigateTo({
      url: '../order_detail/order_detail?id='+id,
    })
    console.log(wx.getStorageSync('Cookie')+' '+id);
  },
 // 刷新核保状态
  bdRefresh:function(e){
    var id = e.target.dataset.id;
    var name = e.target.dataset.name;
    var params = new Object()
    params.id = id
    params.class_name=name
    var url = '/Car/search_order'
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
          else{
            wx.showToast({
              title: '核保成功',
              icon: 'none',
              duration: 2000,
              mask: true
            })
          }
        }
      })

  },

  onLoad: function (options) {
    var that = this;
    console.log(options.status);
    //options.id
    var params = new Object()
    params.status = options.status;
    var url = '/User/order_list'
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
            if (cookies==''){
            wx.navigateTo({
              url: '../login/login',
            })
            }
            else{
              wx.showToast({
                title: '消息未找到',
                icon: 'none',
                duration: 2000,
                mask: true
              })
            }
          }
          that.setData({
            list: res.data.list
          })
        }
      })
  }
})