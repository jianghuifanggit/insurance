var request = require("../../utils/request.js");
var car_id = wx.getStorageSync('car_id');
var com_id = parseInt(wx.getStorageSync('company_id'));
// var com_id = 10
console.log(car_id);
console.log(com_id);
console.log(1);
var cookies = wx.getStorageSync('Cookie');
var page = 10;
// 获取数据的方法，具体怎么获取列表数据大家自行发挥
var GetList = function(that) {
  that.setData({
    hidden: false
  });
  var car_id = wx.getStorageSync('car_id');
  var com_id = parseInt(wx.getStorageSync('company_id'));
  console.log(car_id);
  console.log(com_id);
  var url = '/Car/car_model'
  var n = 3
  var params = new Object()
  params.id = car_id
  params.com_id = com_id
  request.POST({
      params: params,
      url: url,
      n: n,
      cookies: cookies,
      success: function(res) {
        // console.log(com_id);
        // console.log(res.data.content.Body.VehicleModelList);
        console.log(res.data)
        if (res.data.code < 0) {
          console.log(0)
          wx.showToast({
            title: '未查到有关型号数据',
            icon: 'none',
            duration: 3000
          })
          that.setData({
            hidden: true
          });
        } else {
          // var list = res.data.content.Body.VehicleModelList.VehicleModel;
          if (com_id === 10) {
            var list = res.data.content.Body.VehicleModelList.VehicleModel;
            // list.push(res.data.content.Body.VehicleModelList.VehicleModel[i]);
            for (var i = 0; i < list.length; i++) {
              list[i].modelName = list[i].StandardName; //车型号
              list[i].brand = list[i].VehicleBrand; //品牌
              list[i].newsOne = list[i].AutoModelChnName; //信息1
              list[i].newsTwo = list[i].Maker; //信息2
              list[i].price = list[i].PurchasePrice; //车价钱
              list[i].id = i; //车价钱
            }
          }
          else if (com_id === 9) {
            // var list = res.data.content.Body.VehicleModelList.VehicleModel;
            var list = res.data.content.CarModelQueryResponseMain.VehicleList.VehicleVO;
            for (var i = 0; i < list.length; i++) {
              // list.push(res.data.content.CarModelQueryResponseMain.VehicleList.VehicleVO[i]);
              list[i].modelName = list[i].vehicleName; //车型号
              list[i].brand = list[i].brandName; //品牌
              list[i].newsOne = list[i].configName; //信息1
              list[i].newsTwo = list[i].gearboxType; //信息2
              list[i].price = list[i].purchasePrice; //车价钱
              list[i].id = i; //车价钱
            }
          }
          else{
            var list = res.data.content.result.vehicleModelList;
            // list.push(res.data.content.Body.VehicleModelList.VehicleModel[i]);
            for (var i = 0; i < list.length; i++) {
              list[i].modelName = list[i].standardName; //车型号
              list[i].brand = list[i].familyName; //品牌
              list[i].newsOne = list[i].standardName; //信息1
              list[i].newsTwo = list[i].remark; //信息2
              list[i].price = list[i].purchasePrice; //车价钱
              list[i].id = i; //车价钱
            }
          }
        }
        that.setData({
          list: list,
          page: page
        });
        page = page + 10;
        that.setData({
          hidden: true
        });
      }
  });
}
Page({
  data: {
    hidden: true,
    list: [],
    scrollTop: 0,
    scrollHeight: 0,
    type_id: 0
  },
  //返回
  back: function() {
    wx.navigateTo({
      url: '../car_company/car_company',
    })
  },

  //个人中心
  about: function() {
    wx.switchTab({
      url: '../about/about',
    })
  },
  //radio事件
  radioChange: function(e) {
    var that = this;
    that.setData({
      type_id: e.detail.value
    });
    console.log('radio发生change事件，携带value值为：', e.detail.value)
  },

  //确认事件
  carmodel_btn: function() {
    var that = this
    var car_id = wx.getStorageSync('car_id');
    console.log(car_id);
    //写入参数  
    if (com_id == 10) {
      var url = '/Car/ansheng_add_model'
    } //若是选择安盛
    if (com_id == 9) {
      var url = '/Car/anxin_add_model'
    } //若是选择安心
    else{
      var url = '/Car/feizhu_add_model'
    }
    var params = new Object()
    params.id = car_id
    params.type_id = that.data.type_id
    console.log(car_id + ' ' + that.data.type_id)
    var n = 3

    //发起请求  
    request.POST({
      params: params,
      url: url,
      n: n,
      cookies: cookies,
      success: function(res) {
        console.log(res.data)
        if (res.data.code == 100) {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 3000
          })
          wx.navigateTo({
            url: '../insure/insure',
          })
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 3000
          })
        }
      }
    });

  },

  onLoad: function() {
    //   这里要非常注意，微信的scroll-view必须要设置高度才能监听滚动事件，所以，需要在页面的onLoad事件中给scroll-view的高度赋值
    var that = this;
    wx.getSystemInfo({
      success: function(res) {
        console.log(res.windowHeight);
        that.setData({
          scrollHeight: res.windowHeight - 100
        });
      }
    });
  },
  onShow: function() {
    //   在页面展示之后先获取一次数据
    var that = this;
    GetList(that);
  },
  bindDownLoad: function() {
    //   该方法绑定了页面滑动到底部的事件
    var that = this;
    GetList(that);
  }
})