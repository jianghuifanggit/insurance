// pages/message/message.js
Page({
  data: {
    isloading: false,
    userName: "",
    pwd: "",
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
  
  //事件处理函数

  userNameInput: function (e) {
    this.setData({
      userName: e.detail.value
    })
  },
  pwdInput: function (e) {
    this.setData({
      pwd: e.detail.value 
    })
  },
  //进入
  goto: function () {
    var that = this;
    //手机号
    if (/^.+$/.test(that.data.userName)) {
      if (/^1[34578][0-9]{9}$/.test(that.data.userName)) {
        //密码
        if (/^.+$/.test(that.data.pwd)) {
          if (/^.{6,16}$/.test(that.data.pwd)) {
            // 本地存储数据
            var request = require("../../utils/request.js")
            //写入参数  
            var params = new Object()
            params.phone=that.data.userName
            params.password=that.data.pwd
            var url = '/Member/login_check'
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
                      title: '用户名和密码错误',
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
              title: '密码格式错误',
              icon: 'none',
              duration: 3000,
              mask: true
            })
          }
        } else {
          wx.showToast({
            title: '密码不能为空',
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
  },
  back: function () {
    wx.switchTab({
      url: '../index/index',
    })
  },
  register: function () {
    wx.navigateTo({
      url: '../register/register',
    })
  },
  //忘记密码
  forget: function () {
    wx.navigateTo({
      url: '../forget/forget',
    })
  },
//验证码登录
  codelogin:function(){
    wx.navigateTo({
      url: 'codelogin',
    })
  }
})