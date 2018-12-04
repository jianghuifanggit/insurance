// pages/insure/insure.js
var request = require("../../utils/request.js")
var cookies = wx.getStorageSync('Cookie');
Page({
  data: {
    apply_status: false,
    apply_status2: false,
    registerDate: '请选择',
    registerDate2: '请选择',
    index: 0,
    insure_id: 2,
    info: [1, 2, 3, 4, 5, 6, 7, 8, 9, 12, 13, 14, 15, 16, 0, 0, 0, 0, 0],
    check: [1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  },

  //返回
  back: function() {
    wx.navigateTo({
      url: '../car_vin/car_vin',
    })
  },

  //个人中心
  about: function() {
    wx.switchTab({
      url: '../about/about',
    })
  },

  //switch事件
  apply_status: function(e) {
    this.setData({
      apply_status: e.detail.value
    })
  },
  apply_status2: function(e) {
    this.setData({
      apply_status2: e.detail.value
    })
  },

  //交强险生效日期
  datePickerBindchange: function(e) {
    this.setData({
      registerDate: e.detail.value
    })
  },

  //商业险生效日期
  datePickerBindchange2: function(e) {
    this.setData({
      registerDate2: e.detail.value
    })
  },
  //单选框点击事件
  checkboxChange: function(e) {
    var check = this.data.check;
    var value = e.detail.value;
    var insure_id = e.target.dataset.insureId;
    if (insure_id < 12) {
      if (e.detail.value == '') {
        check[insure_id - 1] = 0
      } else {
        check[insure_id - 1] = 1
      }
    } else {
      if (e.detail.value == '') {
        check[insure_id - 3] = 0
      } else {
        check[insure_id - 3] = 1
      }
    }

    this.setData({
      check: check
    })
  },


  //投保金额单级列表
  bindPickerChange: function(e) {
    var insure_id = e.target.dataset.insureId;
    var index = e.detail.value;
    if (insure_id < 12) {
      var money = this.data.list[insure_id - 1].set_arr[index];
    } else {
      var money = this.data.list[insure_id - 3].set_arr[index];
    }
    var info = this.data.info;
    info[insure_id - 1] = money;
    this.setData({
      info: info
    })
  },

  //确认提交
  formSubmit: function(e) {
    var that = this;
    var date = require('../../utils/date.js');
    var time = date.formatTime(new Date());
    var data = e.detail.value;
    var jq = false;
    var sy = false;
    if (data.insure_jq == true) {
      if (data.insure_jq_date == '请选择') {
        wx.showToast({
          title: '交强险日期不能为空',
          icon: 'none',
          duration: 2000
        })
      } else if (data.insure_jq_date < time) {
        wx.showToast({
          title: '交强险日期不能早于当前日期',
          icon: 'none',
          duration: 2000
        })
      } else {
        jq = true;
        data.insure_jq = 1;
      }
    } else {
      jq = true;
      data.insure_jq = 0;
    }
    if (data.insure_sy == true) {
      if (data.insure_sy_date == '请选择') {
        wx.showToast({
          title: '商业险日期不能为空',
          icon: 'none',
          duration: 2000
        })
      } else if (data.insure_sy_date < time) {
        wx.showToast({
          title: '商业险日期不能早于当前日期',
          icon: 'none',
          duration: 2000
        })
      } else {
        sy = true;
        data.insure_sy = 1;
      }
    } else {
      sy = true;
      data.insure_sy = 1;
    }
    if (jq == true && sy == true) {
      var params = new Object()
      params.id = data;
      var url = '/Car/add_insure'
      var n = 3
      //发起请求  
      request.POST({
        params: params.id,
        url: url,
        n: n,
        cookies: cookies,
        success: function(res) {
          if (res.data.code == "0") {
            wx.showToast({
              title: res.data.message,
              icon: 'none',
              duration: 2000
            });
            wx.navigateTo({
              url: '../search_recode/search_recode',
            })
          } else {
            wx.showToast({
              title: "提交失败"+res.data.msg,
              icon: 'none',
              duration: 2000
            });
          }
          console.log(res.data)
        }
      });
      console.log(e.detail.value)
    }


  },

  // 监听页面加载
  onLoad: function(options) {
    var com_id = wx.getStorageSync('company_id');
    console.log(com_id);
    // var com_id=10;
    var that = this;
    var request = require("../../utils/request.js")
    //写入参数  
    var params = new Object()
    params.id = wx.getStorageSync('car_id');
    var url = '/Car/insure'
    var n = 2

    //发起请求  
    request.GET({
      params: params,
      url: url,
      n: n,
      success: function(res) {
        console.log(res.data)
        that.setData({
          plate_no: res.data.car_info.plate_no,
          plate_prefix: res.data.car_info.plate_prefix,
          owner: res.data.car_info.owner,
          brand: res.data.car_info.brand,
          apply_name: res.data.car_info.apply_name,
          list: res.data.list,
          car_id: res.data.car_info.id,
          com_id: com_id
        })
      }
    });
  },
})