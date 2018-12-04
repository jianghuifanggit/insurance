// pages/other/other.js
Page({
  data: {
  },
  clear:function(){
    wx.showModal({
      title: '提示',
      content: '是否确定要清除本地所有存储数据',
      success: function (res) {
        if (res.confirm) {
          wx.clearStorage();//清除所有数据
          wx.switchTab({
            url: '../index/index',
          });
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  back: function () {
    wx.switchTab({
      url: '../about/about',
    })
  },
  // 显示二维码
  downapp: function (e) {
    wx.navigateTo({
      url: 'downapp',
    })
  },
  //公司介绍
  introduce: function () {
    wx.navigateTo({
      url: 'introduce',
    })
  },
  //车辆注册协议
  protocol: function () {
    wx.navigateTo({
      url: 'protocol',
    })
  }
})