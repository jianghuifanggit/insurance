// pages/agreement/agreement.js
Page({
  data: {
    indexIcon:'../../images/shouye_sel.png',
    messageIcon: '../../images/dd.png',
    aboutIcon: '../../images/wd.png',
    disabled:true
  },
// 跳转事件 
 backtap:function(){
   wx.switchTab({
     url: '../index/index',
   })
 },
 index: function () {
   wx.switchTab({
     url: '../index/index',
   })
 },
 message: function () {
   wx.switchTab({
     url: '../message/message',
   })
 }, 
 about: function () {
   wx.switchTab({
     url: '../about/about',
   })
 },

// 选择事件
 checkboxChange: function (e) {
   this.setData({
     disabled: !this.data.disabled
   })

 },
// 同意
  nextHtml:function(){
    wx.navigateTo({
      url: '../car_list/car_list'
    })
  },
  onLoad: function (options) {
  this.setData({
    company:options.company
  })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

})