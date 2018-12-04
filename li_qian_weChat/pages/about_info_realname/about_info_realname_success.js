// pages/about_info_realname/about_info_realname_success.js
var feedbackApi = require("../../utils/showtoast.js");
Page({
  data: {
    realname: '',
    card_id: ''
  },
  nameInput: function(e) {
    this.setData({
      realname: e.detail.value
    })
  },
  caridInput: function(e) {
    this.setData({
      card_id: e.detail.value
    })
  },
  // 返回
  back: function() {
    wx.navigateTo({
      url: '../about_info/about_info',
    })
  },
  // 上传照片
  gotoShow: function() {
    var _this = this
    wx.chooseImage({
      count: 1, // 最多可以选择的图片张数，默认9
      sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
      sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
      success: function(res) {
        // success
        console.log(res)
        _this.setData({
          src: res.tempFilePaths
        })
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  },
  //点击提交
  gotoSumbit: function() {
    console.log(this.data)
    if (this.data.realname == "") {
      feedbackApi.showToast({
        title: '姓名不能为空'
      })
    } else {
      if (/^[a-zA-Z\u4E00-\u9FA5]{1,20}$/.test(this.data.realname)) {
        if (this.data.card_id == "") {
          feedbackApi.showToast({
            title: '身份证号不能为空'
          })
        } else {
          if (/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(this.data.card_id)) {
            var request = require("../../utils/request.js")
            var params = new Object()
            params.realname=this.data.realname
            params.card_id = this.data.card_id
            var url = '/User/users_safe_realname_save'
            var n = 3
            var cookies = wx.getStorageSync('Cookie');
            //发起请求  
            request.POST({
              params: params,
              url: url,
              n: n,
              cookies: cookies,
              success: function (res) {
                console.log(res.data)
                if (res.data.status == 1) {
                  wx.navigateTo({
                    url: 'about_info_realname',
                  })
                }
                else {
                  wx.navigateTo({
                    url: '../login/login',
                  })
                }
              }
            })
          } else {
            feedbackApi.showToast({
              title: '身份证号格式错误'
            })
          }
        }
      } else {
        feedbackApi.showToast({
          title: '姓名格式错误'
        })
      }
    }
  },
  onLoad: function(options) {

  },


})