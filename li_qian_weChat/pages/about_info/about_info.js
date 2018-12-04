// pages/other_info/other_info.js
Page({

  data: {
  
  },
//  返回
  back: function () {
    wx.switchTab({
      url: '../about/about',
    })
  },
  // 修改登录密码
  alter: function () {
    wx.setStorageSync("pwdstatus", 'info');
    wx.navigateTo({
      url: '../forget/forget',
    })
  },
  //退出登录
  exit: function () {
    wx.showModal({
      title: '提示',
      content: '是否确定要退出登录',
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
  //银行卡管理
  bank: function () {
    wx.setStorageSync("pwdstatus", 'info');
    wx.navigateTo({
      url: '../about_info_bank/about_info_bank',
    })
  },
//实名认证
  rzheng:function(){
if(this.data.status=='已认证'){
  wx.navigateTo({
    url: '../about_info_realname/about_info_realname',
  })
}
else{
  wx.navigateTo({
    url: '../about_info_realname_success/about_info_realname_success',
  })
}
  },
  onLoad: function (options) {
    var that=this
    var request = require("../../utils/request.js")
    var params = new Object()
    var url = '/User/user_info'
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
          if (res.data.content.checkrealname.status=='1'){
           var status='已认证'
          }
          else{
            var status = '未认证'
          }
          if (res.data.content.flag == 1) {
            var flag = '已绑卡'
          }
          else {
            var flag = '未绑卡'
          }
          that.setData({
            phone: res.data.content.checkrealname.user_login,
            status:status,
            flag:flag
          })
        }
      })


  },

})