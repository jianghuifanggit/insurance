// pages/search_recode/search_recode.js
Page({
  data: {
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
  detail:function(e){
    console.log(e.currentTarget.dataset.id)
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../search_recode_info/search_recode_info?id='+id,
    })
  },
  onLoad: function (options) {
    var that=this
    var request = require("../../utils/request.js")
    var params = new Object()
    var url = '/User/search_recode'
    var n = 3
    var cookies = wx.getStorageSync('Cookie');
    request.POST(
      {
        params: params,
        url: url,
        n: n,
        cookies:cookies,
        success: function (res) {
          if(res.data.code==-999){
          //重新获取cookies
            var params0 = new Object()
            params0.phone = wx.getStorageSync('userName')
            params0.password = wx.getStorageSync('Password')
            console.log(params0);
            request.GET(
              {
                params: params0,
                url: '/Member/login_check',
                n: 2,
                success: function (res) {
                  console.log(res.data)
                  if (res.data.code == 0) {
                    var Cookie = res.header['Set-Cookie'].split(';');
                    if (Cookie.length < 3) {
                      var cookies = Cookie[0];
                      wx.setStorageSync("Cookie", cookies);
                    }
                    else {
                      var c = Cookie[3].split(',');
                      var cookies = c[1];
                      wx.setStorageSync("Cookie", cookies);
                    }
                  }
                }
              });

            var cookies = wx.getStorageSync('Cookie');
            console.log(cookies);
            request.POST(
              {
                params: params.id,
                url: '/User/search_recode',
                n: 3,
                cookies: cookies,
                success: function (res) {
                  console.log(res.data)
                  that.setData({
                    list: res.data.content
                  })
                }
              });
          }
         console.log(res.data)
         that.setData({
           list: res.data.content
         })
        }
      });
  }
})