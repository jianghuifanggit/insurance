// pages/forget/forget.js
Page({
  data: {
    isShow: false,         //默认按钮1显示，按钮2不显示
    sec: "60"　,
    userName: "",
    pwd: "",
    newpwd: "",
    cdoe: "",
    code: ""              //设定倒计时的秒数
  },
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
  newpwdInput: function (e) {
    this.setData({
      newpwd: e.detail.value
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
        params.action = 'forgetPwd'
        params.send_type=2
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
                  duration: 2000
                })
              }
              else {
                wx.showToast({
                  title: res.data.msg,
                  icon: 'none',
                  duration: 2000
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
  //修改密码
  alter:function(){
    var that = this;
    if (that.data.code == that.data.cdoe) {
      if (that.data.newpwd == "") {
        wx.showToast({
          title: '新密码不能为空',
          icon: 'none',
          duration: 3000
        })
      }
      else {
        if (/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,18}$/.test(that.data.newpwd)) {
            var request = require("../../utils/request.js")
            //写入参数  
            var params = new Object()
            params.phone = that.data.userName
            params.verify = that.data.code
            params.password = that.data.pwd
            params.rePassword = that.data.newpwd
            params.type = '2'

            var url = '/Member/reg_save'
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
                    wx.navigateTo({
                      url: '../login/login',
                    })
                  }
                }
              });
          
          
        }
        else {
          wx.showToast({
            title: '密码格式错误',
            icon: 'none',
            duration: 3000
          })
        }

      }
    }
    else {
      wx.showToast({
        title: '短信验证码错误',
        icon: 'none',
        duration: 3000
      })
    }
  },
  //返回
  back: function () {
    var pwdstatus = wx.getStorageSync('pwdstatus');
    if (pwdstatus=='info'){
      wx.navigateTo({
        url: '../about_info/about_info',
      })
    }
    else{
    wx.navigateTo({
      url: '../login/login',
    })
    }
  }
})