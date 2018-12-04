// pages/about_info_bank/about_info_bank.js
var request = require("../../utils/request.js")
Page({
  data: {
    card_num: ''
  },
  //删除
  deletes: function(e) {
    var id = e.target.dataset.id
    wx.showModal({
      title: '提示',
      content: '是否确定要解除该银行卡的绑定',
      success: function(res) {
        if (res.confirm) {
          var params = new Object()
          var url = '/User/user_bank_delete/id/' + id
          var n = 3
          var cookies = wx.getStorageSync('Cookie');
          //发起请求  
          request.POST({
            params: params,
            url: url,
            n: n,
            cookies: cookies,
            success: function(res) {
              wx.navigateTo({
                url: 'about_info_bank',
              })
            }
          })
        } else if (res.cancel) {
          console.log('取消删除')
        }
      }
    })
  },
  // 返回
  back: function() {
    wx.navigateTo({
      url: '../about_info/about_info',
    })
  },
  //添加银行卡
  add: function() {
    wx.navigateTo({
      url: 'about_info_bank_add',
    })
  },
  onLoad: function(options) {
    var that = this
    var params = new Object()
    var url = '/User/users_bank_list'
    var n = 3
    var cookies = wx.getStorageSync('Cookie');
    //发起请求  
    request.POST({
      params: params,
      url: url,
      n: n,
      cookies: cookies,
      success: function(res) {
        console.log(res.data)

        if (res.data.code == 0) {
          if (res.data.content.length <1){
          }
          else{
            //一个没问题，但是2个可能有问题，还需要观察

            var str = ['1','2', '3', '4', '5', '5', '2', '6', '6', '5', '2'];
            for (var i = 0; i < res.data.content.length;i++){
            var str0 = res.data.content[i].card_num.substring(0, 4)
            var str1 = res.data.content[i].card_num.substring(15, 19)
            var str2 = str0 + '***********' + str1
            str[i]=str2;
            }
            that.setData({
              list: res.data.content,
              card_num: str
            })
          }
         } else {
          wx.navigateTo({
            url: '../login/login',
          })
        }
      }
    })
  },
 
})