// pages/about_info_bank/about_info_bank_add.js
var feedbackApi = require("../../utils/showtoast.js");
Page({
  data: {
    array: ['农业银行', '工商银行', '中国银行', '建设银行', '交通银行', '招商银行', '兴业银行', '浙商银行'],
    index: 0,
    account: '农业银行',
    card_num: '',
    ownername: '',
    phone: '',
    card_id: ''
  },

  bindPickerChange: function(e) {
    this.setData({
      index: e.detail.value,
      account: e.target.dataset.value
    })
  },
  banknumInput: function(e) {
    this.setData({
      card_num: e.detail.value
    })
  },
  userNameInput: function(e) {
    this.setData({
      ownername: e.detail.value
    })
  },
  idInput: function(e) {
    this.setData({
      card_id: e.detail.value
    })
  },
  phoneInput: function(e) {
    this.setData({
      phone: e.detail.value
    })
  },
  //确认添加
  goto: function() {
    console.log(this.data)
    if (this.data.card_num == "") {
      feedbackApi.showToast({title: '银行卡号不能为空'})
    } 
    else {
      if (/^(\d{16}|\d{19})$/.test(this.data.card_num)) {
        if (this.data.ownername == "") {
          feedbackApi.showToast({title: '姓名不能为空'})
        } 
        else {
          if (this.data.card_id == "") {
            feedbackApi.showToast({title: '身份证号码不能为空'})
          }
          else{
            if (/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(this.data.card_id)){
              if (this.data.phone == "") {
                feedbackApi.showToast({ title: '手机号码格式错误' })
              }
              else {
                if (/^1[34578][0-9]{9}$/.test(this.data.phone)){
                  var request = require("../../utils/request.js")
                  var params = new Object()
                  params.account = this.data.account
                  params.card_num = this.data.card_num
                  params.ownername = this.data.ownername
                  params.phone = this.data.phone
                  params.card_id = this.data.card_id
                  var url = '/User/users_bank_add_save'
                  var n = 3
                  var cookies = wx.getStorageSync('Cookie');
                  request.POST({
                    params: params,
                    url: url,
                    n: n,
                    cookies: cookies,
                    success: function (res) {
                      console.log(res.data)
                      if(res.data.status==1){
                        wx.navigateTo({
                          url: 'about_info_bank',
                        })
                      }
                      else{
                        feedbackApi.showToast({ title: res.data.msg })
                      }
                    }
                  })
                }
                else{
                  feedbackApi.showToast({ title: '手机号码格式错误' })
                }
              }
            }
            else{
              feedbackApi.showToast({ title: '身份证号码格式错误' })
            }
          }
        }
      } else {
        feedbackApi.showToast({title: '银行卡号格式错误'})
      }
    }
  },
  back: function(e) {
    wx.navigateTo({
      url: 'about_info_bank',
    })
  },
  
})