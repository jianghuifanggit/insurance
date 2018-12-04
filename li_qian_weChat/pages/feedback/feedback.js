// pages/feedback/feedback.js
Page({
  data: {
    items: [{
        name: '吐槽',
        detail: '哪里用的不爽',
        value: '1',
        checked: 'true'
      },
      {
        name: '意见',
        detail: '我有一些好主意',
        value: '0',
      }
    ],
    radio: 1,
    note: ''
  },
  radioChange: function(e) {
    this.setData({
      radio: e.detail.value
    })
  },
  noteInput: function(e) {
    this.setData({
      note: e.detail.value
    })
  },

  //点击反馈
  goto: function() {
    var that = this
    if (/^.+$/.test(that.data.note)) {
      var request = require("../../utils/request.js")
      var cookies = wx.getStorageSync('Cookie');
      var params = new Object()
      params.radio = that.data.radio
      params.note = that.data.note
      var url = '/User/feedback_save'
      var n = 3
      request.POST({
        params: params,
        url: url,
        n: n,
        cookies: cookies,
        success: function(res) {
          if (res.data.code==0){
            wx.showToast({
              title: '提交成功，对于您的意见会及时处理',
              icon: 'none',
              duration: 3000,
              mask: true
            }) 
            wx.switchTab({
              url: '../about/about',
            })
          }
          else{
            wx.navigateTo({
              url: '../login/login',
            })
          }
          console.log(res.data)
        }
      });
    } else {
      wx.showToast({
        title: '反馈内容不能为空',
        icon:'none',
        duration: 3000,
        mask: true
      })
    }
  },

  //返回
  back: function() {
    wx.switchTab({
      url: '../about/about',
    })
  },
  onLoad: function(options) {}
})