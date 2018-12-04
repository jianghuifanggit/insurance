// pages/address_add/address_add.js
var request = require("../../utils/request.js")

// var address_id = wx.getStorageSync('address_id');
Page({
  data: {
    city: ['请选择', ' ', ' ']
  },

  //返回
  back: function () {
    wx.navigateTo({
      url: '../address_list/address_list',
    })
  },

  onLoad: function (options) {
    var cookies = wx.getStorageSync('Cookie');
    var address_id=options.id
    var that = this;
    var params = new Object()
    var url = '/User/users_address_edit/address_id/' + address_id
    var n = 3
    request.POST({
      params: params,
      url: url,
      n: n,
      cookies: cookies,
      success: function (res) {
        console.log(res.data)
        if (cookies =='') {
          
          wx.navigateTo({
            url: '../login/login',
          })
        }
        // 获取数据
        var data_for = res.data.content;
        var status = "";
        //地址处理
        // var c = data_for.city;
        // var city = c.split(' ');
        that.setData({
          receivename: data_for.receivename,
          phone: data_for.phone,
          zip: data_for.zip,
          city: data_for.city,
          address: data_for.address,
          status: data_for.status,
          id: address_id
        });
      }
    })
  },

  // 获取地区
  bindRegionChange: function (e) {
    var a = e.detail.value;
    var b = a[0] + " " + a[1] + " " + a[2];
    console.log('picker发送选择改变，携带值为', b)
    this.setData({
      city: b
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
      })
    }
  },

  //确认修改事件
  formSubmit: function (e) {
    var cookies = wx.getStorageSync('Cookie');
    var val = e.detail.value;
    var that = this;
    console.log(val);
    if (/^.+$/.test(val.receivename)) {
      if (/^.+$/.test(val.phone)) {
        if (/^1[34578][0-9]{9}$/.test(val.phone)) {
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
              if (res.data.code == 0) {
                wx.showToast({
                  title: '修改地址成功',
                  icon: 'none',
                  duration: 2000
                });
                wx.navigateTo({
                  url: '../address_list/address_list',
                })
              }
              else {
                wx.showToast({
                  title: '修改地址失败',
                  icon: 'none',
                  duration: 2000
                })
              }
            }
          })
        }
        else {
          wx.showToast({
            title: '手机号码格式错误',
            icon: 'none',
            duration: 2000,
            mask: true
          })
        }
      }
      else {
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

  //删除事件
  godelete: function (e) {
    // console.log(e)
    var cookies = wx.getStorageSync('Cookie');
    var address_id=e.currentTarget.dataset.id
    wx.showModal({
      title: '删除地址',
      content: '是否确定要删除该地址',
      success: function (res) {
        if (res.confirm) {
          var params = new Object()
          //还需要修改
          params.addressId = address_id
          var url = 'User/users_address_delete'
          var n = 3
          request.POST({
            params: params,
            url: url,
            n: n,
            cookies: cookies,
            success: function (res) {
              console.log(res.data)
              if (res.data.code == 0) {
                wx.navigateTo({
                  url: '../address_list/address_list',
                })
              }
              else {
                wx.showToast({
                  title: '删除地址失败',
                  icon: 'none',
                  duration: 2000
                })
              }
            }
          })
        }
      }
    })
  },

})