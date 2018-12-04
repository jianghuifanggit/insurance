// pages/message/message_detail.js
var request = require("../../utils/request.js");
var WxParse = require('../../wxParse/wxParse.js');
Page({
  data: {
  },
  
  onLoad: function (options) {
    var id=options.id
    var that = this
    that.setData({
      id: id
    })
    var params = new Object()
    params.id=id
    var url = '/More/activity_detail'
    var n = 4
    //发起请求  
    request.POST({
      params: params,
      url: url,
      n: n,
      success: function (res) {
        console.log(res.data)
        that.setData({
          info: res.data.info
        })
        var post_content= res.data.info.post_content
        console.log(post_content)
        WxParse.wxParse('post_content', 'html',post_content, that)
      }
    })
  },
  //返回
  back: function () {
    console.log(1)
    wx.switchTab({
      url: '../message/message',
    })
  },
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})