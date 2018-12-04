// pages/address_list/address_list.js
var request = require("../../utils/request.js")

Page({
  data: {
  },
  // 加载获取
  onLoad: function (options) {
    var that = this;
    var cookies = wx.getStorageSync('Cookie');
    var params = new Object()
    var url = '/User/users_address_list'
    var n = 1
    request.POST({
      params: params,
      url: url,
      n: n,
      cookies: cookies,
      success: function (res) {
        console.log(res.data)
        if (res.data.code == -999) {
          if(cookies==''){
          wx.navigateTo({
            url: '../login/login',
          })
          }
          else{
            wx.showToast({
              title: '网络出错',
              icon:none,
              duration:2000
            })
          }
        }
        // 获取数据
        var data_for = res.data.content;
        //循环获取
        that.setData({
          list: data_for.list
        });
      }
    })
  },
  //返回
  back: function () {
    wx.switchTab({
      url: '../about/about',
    })
  },
  //拖动
  setTouchMove: function (e) {
    //此处clientY与clientX为拖动悬浮窗超过设定的大小会返回默认显示位置
    if (e.touches[0].clientX < 350 && e.touches[0].clientY < 550 && e.touches[0].clientX > 0 && e.touches[0].clientY > 0) {
      this.setData({
        left: e.touches[0].clientX,
        top: e.touches[0].clientY
      })
    } else {
      this.setData({
        left: 20, //默认显示位置 left距离
        top: 250  //默认显示位置 top距离
      })
    }
  },
  //添加
  add: function () {
    wx.navigateTo({
      url: '../address_add/address_add',
    })
  },
  //修改
  edit: function (e) {
    var id = e.currentTarget.id;
    // wx.setStorageSync("address_id", id);
    wx.navigateTo({
      url: '../address_edit/address_edit?id='+id,
    })
  }
})