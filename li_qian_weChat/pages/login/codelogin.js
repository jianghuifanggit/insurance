// pages/login/codelogin.js
Page({
  data: {
    isShow: false,         //默认按钮1显示，按钮2不显示
    sec: "60"　,
    userName: "",
    pwd: "",
    repwd: "",
    cdoe: "",
    code: ""
    //设定倒计时的秒数
  },
  userNameInput: function (e) {
    this.setData({
      userName: e.detail.value
    })
  },
  codeInput: function (e) {
    this.setData({
      code: parseInt(e.detail.value)
    })
  },

  //验证码事件
  getCode: function (e) {
    //调用倒计时函数
    var _this = this;
    if (/^.+$/.test(_this.data.userName)) {
      if (/^1[34578][0-9]{9}$/.test(_this.data.userName)) {
        //防止this对象的混杂，用一个变量来保存
        var code = require('../../utils/code.js');
        var time = _this.data.sec　　//获取最初的秒数
        code.getCode(_this, time);
        var request = require("../../utils/request.js")
        //写入参数  
        var params = new Object()
        params.phone = _this.data.userName
        params.type = 1
        var url = '/Member/send_code'
        var n = 4
        //发起请求  
        request.POST(
          {
            params: params,
            url: url,
            n: n,
            success: function (res) {
              console.log(res.data)
              if (res.data.state == "fail") {
                wx.showToast({
                  title: res.data.msg,
                  icon: 'none',
                  duration: 3000
                })
              }
              else {
                wx.showToast({
                  title: res.data.msg,
                  icon: 'none',
                  duration: 3000
                })
                _this.setData({
                  cdoe: res.data.cdoe
                })
              }
            }
          });
      }
      else {
        wx.showToast({
          title: '手机格式错误',
          icon: 'none',
          duration: 3000
        })
      }
    }
    else {
      wx.showToast({
        title: '手机格式不能为空',
        icon: 'none',
        duration: 3000
      })
    }
    console.log(_this.data);

  },

  //返回
  back: function () {
    wx.navigateTo({
      url: 'login',
    })
  },

  //登录
  goto: function () {
    var that = this;
    //手机号
    if (/^.+$/.test(that.data.userName)) {
      if (/^1[34578][0-9]{9}$/.test(that.data.userName)) {
        //密码
        if (/^.+$/.test(that.data.code)) {
            var request = require("../../utils/request.js")
            //写入参数  
            var params = new Object()
            params.phone = that.data.userName
            params.smsCode = that.data.code
            var url = '/Member/sms_login_check'
            var n = 2

            //发起请求  
            request.GET(
              {
                params: params,
                url: url,
                n: n,
                success: function (res) {
                  console.log(res.data);
                  if (res.data.code == 0) {
                    wx.setStorageSync('userName', that.data.userName),
                      console.log(res.header['Set-Cookie']);//获取phpsessid的值
                    var Cookie = res.header['Set-Cookie'].split(';');
                    if (Cookie.length < 3) {
                      var cookies = Cookie[0];
                      console.log(cookies);
                      wx.setStorageSync("Cookie", cookies);
                    }
                    else {
                      var c = Cookie[3].split(',');
                      var cookies = c[1];
                      console.log(cookies);
                      wx.setStorageSync("Cookie", cookies);
                    }
                    // wx.setStorageSync("Cookie", res.header['Set-Cookie'])
                    wx.setStorageSync('Password', that.data.pwd)
                    wx.switchTab({
                      url: '../about/about',
                    })
                  }
                  else {
                    wx.showToast({
                      title: '用户名和短信验证码错误',
                      icon: 'none',
                      duration: 3000,
                      mask: true
                    })
                  }// success  
                  //拿到解密后的数据，进行代码逻辑  

                },
                fail: function () {
                  //失败后的逻辑  
                  wx.showToast({
                    title: '网络出错',
                    icon: 'none',
                    duration: 3000,
                    mask: true
                  })// 
                },
              })
          
        } else {
          wx.showToast({
            title: '验证码不能为空',
            icon: 'none',
            duration: 3000,
            mask: true
          })
        }
      } else {
        wx.showToast({
          title: '手机格式错误',
          icon: 'none',
          duration: 3000,
          mask: true
        })
      }
    } else {
      wx.showToast({
        title: '手机格式不能为空',
        icon: 'none',
        duration: 3000,
        mask: true
      })
    }
  }
})