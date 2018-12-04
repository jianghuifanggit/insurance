// pages/car_company/car_company.js
var request = require("../../utils/request.js")
Page({
  data: {
  },
  //返回
  back: function () {
      wx.navigateTo({
        url: '../car_add/car_add',
      })
  },

  //个人中心
  about: function () {
    wx.switchTab({
      url: '../about/about',
    })
  },

  //点击事件
  checkboxChange: function (e) {
    wx.setStorageSync("company_id",e.detail.value);
    console.log(e.detail.value);
    wx.navigateTo({
      url: '../car_vin/car_vin',
    })
  },

  onLoad: function (options) {
    var car_id = options.car_id
    console.log(car_id);
    var that = this;
    var cookies = wx.getStorageSync('Cookie');
    var params = new Object()
    params.id = car_id
    var url = '/Car/insure_company'
    var n = 3
    request.POST({
      params: params,
      url: url,
      n: n,
      cookies: cookies,
      success: function (res) {
        console.log(res.data);
        //循环获取
        if (res.data.code < 0) {
          if (cookies == '') {
            wx.navigateTo({
              url: '../login/login',
            })
          }
          else {
            wx.showToast({
              title: '网络出错',
              icon: 'none',
              duration: 2000
            })
          }
        }
        that.setData({
          list: res.data.list,
        });
      }
    });
  }
})