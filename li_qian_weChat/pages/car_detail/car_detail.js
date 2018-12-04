// pages/car_detail/car_detail.js
Page({
  data: {
  },

  //返回
  back: function () {
    wx.navigateTo({
      url: '../car_list/car_list',
    })
  },

  //个人中心
  about: function () {
    wx.switchTab({
      url: '../about/about',
    })
  },

// 立即查价
goto:function(e){
  //有该车存在
  var that=this
  wx.setStorageSync('pre_del', 30)
  wx.navigateTo({
    url: '../car_add/car_add?xc=yes&platePrefix=' + that.data.plate_prefix + '&plateNo=' + that.data.plate_no + '&citycode=' + that.data.citycode,
  });
},

  onLoad: function (options) {
    var time = require("../../utils/date.js");  
    var that=this;
    var id = wx.getStorageSync('car_id');
    var cookies = wx.getStorageSync('Cookie');
    wx.request({
      url: 'https://www.4006723723.cn/index.php/App/User/car_info',
      data: {
        id: id
      },
      method: {},
      header: {
        'content-type': 'application/json',// 默认值
        'Cookie': cookies
      },
      success: function (res) {
        console.log(res.data);
        if (res.data.code == 0) {
          if (res.data.content.apply_status==0){
            var status='未申请'
          }
          else { var status = '申请中'}
          var register_date = time.js_date_time(res.data.content.register_date);
          var issue_date = time.js_date_time(res.data.content.issue_date);
          if (res.data.content.xsz_img==null){ var image=null;}
          else{
            var image = "https://www.4006723723.cn" + res.data.content.xsz_img;
          }
          that.setData({
            plate_prefix: res.data.content.plate_prefix,
            plate_no: res.data.content.plate_no,
            apply_status:status,
            owner: res.data.content.owner,
            brand: res.data.content.brand,
            vin: res.data.content.vin,
            engine_no: res.data.content.engine_no,
            register_date: register_date,
            issue_date: issue_date,
            image:image,
            citycode: res.data.content.citycode,
            status: options.status
          });
        }
      }
    })
  },

  //查看图片
  previewImage:function(e){
    console.log(e.target.dataset.src);
    var current=e.target.dataset.src;
    if (this.data.image == null || current =='https://www.4006723723.cn'){
      wx.showToast({
        title: '图片不存在',
        icon: 'none',
        duration: 3000,
        mask: true
      })
    }
    else{
    wx.previewImage({
      current:current,
      urls: [this.data.image],
    })
    }
  }
})