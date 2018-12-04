// pages/address_add/address_add.js
var request = require("../../utils/request.js")
Page({
  data: {
    region: ['请选择', ' ', ' ']
  },

  back: function () {
    wx.navigateTo({
      url: '../address_list/address_list',
    })
  },
// 获取地区
  bindRegionChange: function (e) {
    var a = e.detail.value;
    var b=a[0]+" "+a[1]+" "+a[2];
    this.setData({
      region: e.detail.value,
      city:b
    })
  },
  switch1Change: function (e) {
    if (e.detail.value == true) {
      this.setData({
        status: "1"
      })
    }
    else {
      this.setData({
        status: "0"
      }) }
  },
  // 提交
  formSubmit: function (e) {
    var val = e.detail.value;
    console.log(e);
    if (/^.+$/.test(val.receivename)){
      if (/^.+$/.test(val.phone)){
        if (/^1[34578][0-9]{9}$/.test(val.phone)) {
          var cookies = wx.getStorageSync('Cookie');
          var params = new Object()
          params = e.detail.value
          var url = '/User/users_address_save'
          var n = 3
          request.POST({
            params: params,
            url: url,
            n: n,
            cookies: cookies,
            success: function (res) {
              console.log(res.data);
              if (res.data.code == 0)
              {
                wx.showToast({
                  title: '添加地址成功',
                  icon: 'none',
                  duration: 2000,
                  mask: true
                });
                wx.navigateTo({
                  url: '../address_list/address_list',
                })
              }
              else{
                wx.showToast({
                  title: '添加地址失败',
                  icon: 'none',
                  duration: 2000,
                  mask: true
                })
              }
            }
          })
        }
        else{
          wx.showToast({
            title: '手机号码格式错误',
            icon: 'none',
            duration: 2000,
            mask: true
          })
        }
      }
      else{
        wx.showToast({
          title: '手机号码不能为空',
          icon: 'none',
          duration: 2000,
          mask: true
        })
      }
    }
    else {
      wx.showToast({
        title: '收件人不能为空',
        icon: 'none',
        duration: 2000,
        mask: true
      })
    }
  },
  
  
})