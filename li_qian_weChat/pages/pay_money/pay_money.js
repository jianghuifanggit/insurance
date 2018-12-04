// pages/pay_money/pay_money.js
var request = require("../../utils/request.js");
var cookies = wx.getStorageSync('Cookie');
Page({
  data: {
    array: [''],
    index: 0,
    ansheng_OrderId:''
  },

  //返回
  back: function (e) {
    wx.navigateTo({
      url: '../order_detail/order_detail',
    })
  },

  //选择银行卡
  bankChange: function (e) {
    this.setData({
      index: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    var orderId=options.orderId
    console.log(orderId);
    var url = '/User/users_bank_list'
    var n = 3
    var params = new Object()
    //发起请求  
    request.POST(
      {
        params: params,
        url: url,
        n: n,
        cookies: cookies,
        success: function (res) {
          console.log(res);
          if(res.data.code==0){
            var list=res.data.content;
            var bank=that.data.array;
            for(var i=0;i<list.length;i++){
              bank[i] = list[i].account + " ( ****" + list[i].card_num.substr(-4)+')';
            }
            that.setData({
              array: bank
            })
          }
        }
      })
    var url2 ='/Payreturn/pay_cash'
    params.orderId='246'  //orderId
    request.POST(
      {
        params: params,
        url: url2,
        n: n,
        cookies: cookies,
        success: function (res) {
          console.log(res);
         
          if (res.content!=undefined){
            var ansheng_OrderId = res.content.ansheng_OrderId
            that.setData({
              orderId: orderId,
              ansheng_OrderId: ansheng_OrderId
            })
          }
        },
        error:function(e){
          wx.showToast({
            title: '获取验证码失败，网络出错',
            icon: 'none',
            duration: 2000,
            mask: true
          });
        }
      })

  },

//支付提交
  formSubmit:function(e){
  var val = e.detail.value
  console.log(val);
    var url = '/Payreturn/pay_cash'
    var n = 3
    var params = new Object()
    params.orderId = val.orderId
    params.mobile_code=val.mobile_code
    params.ansheng_OrderId=val.ansheng_OrderId
    //发起请求  
    request.POST(
      {
        params: params,
        url: url,
        n: n,
        cookies: cookies,
        success: function (res) {
          console.log(res);
          if(res.code==0){
            wx.showToast({
              title: '支付成功',
              icon: 'none',
              duration: 2000,
              mask: true
            });
            wx.navigateTo({
              url: '../order_list/order_list?status=' + 1,
            })
          }
        },
        error:function(e){
          wx.showToast({
            title: '支付失败，网络出错',
            icon: 'none',
            duration: 2000,
            mask: true
          });
        }
      })

},
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

})