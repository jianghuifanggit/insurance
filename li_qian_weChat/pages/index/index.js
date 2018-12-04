//index.js
//获取应用实例
const app = getApp();
var request = require("../../utils/request.js")
var util = require("../../utils/date.js")
var uuid = require("../../utils/uuid.js")
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    region: ['', ''],
    addressCity: ['', ''],
    lcode: '浙C',
    name: '',
    plateNo: ''
  },
// 其他公司跳转
  linkHtml:function(e){
    var company=e.currentTarget.dataset.name
    wx.navigateTo({
      url: '../agreement/agreement?company=' +company,
    });
   console.log(company)
  }, 
  //分享窗口编辑
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '力乾车险',
      path: '/pages/index/index',
      imageUrl:'/images/logo.png'
    }
  },

  // 联系客服
  calling: function () {
    wx.makePhoneCall({
      phoneNumber: '12345678900', //此号码并非真实电话号码，仅用于测试
      success: function () {
        console.log("拨打电话成功！")
      },
      fail: function () {
        console.log("拨打电话失败！")
      }
    })
  },
  // 车牌获取
  plateInput: function(e) {
    this.setData({
      plateNo: e.detail.value
    })
  },
  // 省市获取
  bindRegionChange: function(e) {
    var region = e.detail.value
    var that = this
    console.log(region[1]);
    var params = new Object()
    var url = '/Car/creat'
    var n = 4
    request.POST({
      params: params,
      url: url,
      n: n,
      success: function(res) {
        console.log(res.data)
        if (region[0] == '北京市' && region[1] == '北京市') {
          that.setData({
            name: '市辖区',
            code: '3110100',
            lcode: '京'
          })
        } else if (region[0] == '北京市' && region[1] == '县') {
          that.setData({
            name: '县',
            code: '3110200',
            lcode: '京'
          })
        } else if (region[0] == '天津市' && region[1] == '天津市') {
          that.setData({
            name: '市辖区',
            code: '3120100',
            lcode: '津'
          })
        } else if (region[0] == '天津市' && region[1] == '县') {
          that.setData({
            name: '县',
            code: '3120200',
            lcode: '津'
          })
        } else {
          var city = region[1]
          that.setData({
            region: e.detail.value,
            name: city,
          })
        }
        var code = res.data.city
        console.log(code)
        for (var p in code) { //遍历json对象的每个key/value对,p为key
          var name = code[p].name
          if (name == city) {
            that.setData({
              name: name,
              lcode: code[p].lcode,
              code: code[p].code
            })
          }

        }
      }
    });
  },

// 上牌是否
  switch1Change:function(){
  },

  //立即查价
  goto: function() {
    var that = this;
    if (that.data.name == '') {
      wx.showToast({
        title: '请选择承保城市',
        icon: 'none',
        duration: 2000,
        mask: true
      })
    } else {
      if (that.data.plateNo == '') {
        wx.showToast({
          title: '请输入车牌号码',
          icon: 'none',
          duration: 2000,
          mask: true
        })
      } else if (!/^[0-9a-zA-Z]{5}$/.test(that.data.plateNo)) {
        wx.showToast({
          title: '车牌号码格式错误',
          icon: 'none',
          duration: 2000,
          mask: true
        })
      } else {
        wx.setStorageSync('pre_del',3)
        var params = new Object()
        params.platePrefix = that.data.lcode
        params.plateNo = that.data.plateNo
        params.citycode = that.data.code
        var cookies = wx.getStorageSync('Cookie');
        var url = '/Car/get_creat'
        var n = 3
        request.POST({
          params: params,
          url: url,
          n: n,
          cookies: cookies,
          success: function(res) {
            console.log(res.data)
            if(res.data.code==0)
            {
            //有该车存在
              wx.navigateTo({
                url: '../car_add/car_add?xc=yes&platePrefix=' +that.data.lcode +'&plateNo=' +that.data.plateNo + '&citycode=' +that.data.code,
              });
            }
            else{
              var param = new Object()
              param.phone = wx.getStorageSync('userName');
              param.password = wx.getStorageSync('Password');
              var url = '/Member/login_check'
              var n = 2

              //发起请求  
              request.GET(
                {
                  params: param,
                  url: url,
                  n: n,
                  success: function (res) {
                    if (res.data.code == 0)
                    {
                      //无此车存在
                      wx.showModal({
                        title: '无车辆信息',
                        content: '是否确定添加该车辆',
                        success: function (res) {
                          if (res.confirm) {
                            wx.navigateTo({
                              url: '../car_add/car_add?xc=no&city=' + that.data.name + '&lcode=' + that.data.lcode + '&plateNo=' + that.data.plateNo,
                            });
                          } else if (res.cancel) {
                            console.log('用户点击取消')
                          }
                        }
                      })
                    }
                    else{
                      wx.navigateTo({
                        url: '../login/login',
                      })
                    }
                  }
                  });
            }
          }
        });
      }
    }
  },

  onLoad: function() {
    var that = this;
    // if (app.globalData.userInfo) {
    //   this.setData({
    //     userInfo: app.globalData.userInfo,
    //     hasUserInfo: true
    //   })
    // } else if (this.data.canIUse) {
    //   // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //   // 所以此处加入 callback 以防止这种情况
    //   app.userInfoReadyCallback = res => {
    //     this.setData({
    //       userInfo: res.userInfo,
    //       hasUserInfo: true
    //     })
    //   }
    // } else {
    //   // 在没有 open-type=getUserInfo 版本的兼容处理
    //   wx.getUserInfo({
    //     success: res => {
    //       app.globalData.userInfo = res.userInfo
    //       this.setData({
    //         userInfo: res.userInfo,
    //         hasUserInfo: true
    //       })
    //     }
    //   })
    // }

    // 右上角点击...分享
    wx.showShareMenu({
      withShareTicket: true
    });
  },
  onPullDownRefresh() { 
  },
  //获取验证码
  getcode:function(){
    var time = util.formatTime(new Date());
    var str = uuid.uuid(2, 16) + time.substring(2, 4) + time.substring(5, 7) + time.substring(8, 10) + uuid.uuid(1, 16)
    wx.showModal({
      title: '提示',
      content: '验车码：'+str+'\r\n日期：'+time,
      success: function (res) {
        if (res.confirm) {
         //确认事件
        } else if (res.cancel) {
          //取消事件
        }
      }
    })
  }
})