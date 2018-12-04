// pages/search_recode_info/search_recode_info.js
Page({
  data: {},
  //返回
  back: function (e) {
    wx.navigateTo({
      url: '../search_recode/search_recode',
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
  //个人中心
  about: function () {
    wx.switchTab({
      url: '../about/about',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  var that=this;
  console.log(options.id);
  var request = require("../../utils/request.js")
  var params = new Object()
  params.id = options.id
  var url = '/User/search_recode_info'
  var n = 3
    var cookies = wx.getStorageSync('Cookie');
    console.log(cookies+''+options.id)
  //发起请求  
  request.POST(
    {
      params: params,
      url: url,
      n: n,
      cookies:cookies,
      success: function (res) {
        console.log(res.data.info.address_city)
        if(res.data.code<-10){
          wx.navigateTo({
            url: '../login/login',
          })
        }
        that.setData({
          info: res.data.info,
          list: res.data.price,
          city: res.data.info.address_city
        })
      }
    })
  }
})