// pages/message/message.js
var page = 1;
var request = require("../../utils/request.js")
Page({

  data: {},
  // 消息点击事件
  msgDetail: function(e) {
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../message_detail/message_detail?id=' + id,
    })
  },

  // 页面加载
  onShow: function() {
    var that = this
    var params = new Object()
    var url = '/More/activity'
    // var url2 ='/More/activity_detail'
    var n = 4
    //发起请求  
    request.POST({
      params: params,
      url: url,
      n: n,
      success: function(res) {
        console.log(res.data)
        that.setData({
          list: res.data.list
        })
      }
    })

  },
  //上拉刷新
  onPullDownRefresh: function() {
    wx.showNavigationBarLoading();
    var that = this;
    var params = new Object()
    params.cid = 10
    params.page = 1
    params.psize = 2
    var url = '/More/activity'
    var n = 4
    //发起请求  
    request.POST({
      params: params,
      url: url,
      n: n,
      success: function(res) {
        console.log(res.data)
        that.setData({
          list: res.data.list
        })
        // 隐藏导航栏加载框  
        wx.hideNavigationBarLoading();
        // 停止下拉动作  
        wx.stopPullDownRefresh();
      }
    })
  },
  // 下拉加载 
  onReachBottom: function() {
    var that = this;
    // 显示加载图标  
    wx.showLoading({
      title: '玩命加载中',
    })
    // 页数+1  
    page = page + 1;
    var params = new Object()
    params.cid = 10
    params.page = page
    params.psize = 2
    var url = '/More/activity'
    var n = 4
    //发起请求  
    setTimeout(function() {
      request.POST({
        params: params,
        url: url,
        n: n,
        success: function(res) {
          var moment_list = that.data.list;

          for (var i = 0; i < res.data.list.length; i++) {
            moment_list.push(res.data.list[i]);
          }
          if (res.data.list == '') {
            wx.showToast({
              title: '没有更多数据了',
              icon: 'none',
              duration: 3000,
              mask: true
            })
          }
          // 设置数据  
          that.setData({
            list: that.data.list
          })
          wx.hideLoading();
        }
      })
    }, 1000)
  }
})