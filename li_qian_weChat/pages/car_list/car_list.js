// pages/car_list/car_list.js
var request = require("../../utils/request.js")
Page({
  data: {
  },
  onLoad: function (options) {
    var that = this;
    var params = new Object()
    var url = '/User/car_list'
    var n = 1
    var cookies = wx.getStorageSync('Cookie');
    request.POST({
      params: params,
      url: url,
      n: n,
      cookies: cookies,
      success: function (res) {
        console.log(res.data);
        console.log(cookies);
        if (res.data.code < 0) {
          if(cookies==''){
            wx.navigateTo({
              url: '../login/login',
            })
          }
          else{
              wx.showToast({
              title: '网络出错',
              icon: 'none',
              duration: 2000
            })
          }
        }
        //循环获取
        that.setData({
          list: res.data.content
        });
      }
    });
  },
  //删除
  car_delete: function (e) {
    var cookies = wx.getStorageSync('Cookie');
    var id=e.currentTarget.id;
    console.log(id);
    wx.showModal({
      title: '删除车辆',
      content: '一旦删除无法恢复，是否确定要删除该车信息',
      success: function (res) {
        if (res.confirm) {
          var params = new Object()
          params.id=id
          var url = '/User/car_delete'
          var n = 3
          request.POST({
            params: params,
            url: url,
            n: n,
            cookies: cookies,
            success: function (res) {
              console.log(res.data);
              if (res.data.code == 0) {
                wx.showToast({
                  title: '删除车辆成功',
                  icon: 'none',
                  duration: 2000
                })
                wx.navigateTo({
                  url: '../car_list/car_list',
                })
              }
              else {
                wx.showToast({
                  title: '删除车辆失败',
                  icon: 'none',
                  duration: 2000
                })
              }
            }
          });
        }
      }
    })
  },

  //添加
  add: function () {
    wx.navigateTo({
      url: '../car_add/car_add',
    })
    wx.setStorageSync("pre_del", '0');
  },

//详情
  car_detail: function (doc){
    var id = doc.currentTarget.id;
    console.log(id);
    wx.setStorageSync("car_id", id);
    var status = doc.currentTarget.dataset.status
    console.log(status)
    wx.navigateTo({
      url: '../car_detail/car_detail?status='+status,
    })
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

  //返回
  back: function () {
    wx.switchTab({
      url: '../about/about',
    })
  },
})