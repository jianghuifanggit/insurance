// pages/car_add/car_add.js
var request = require("../../utils/request.js")
var time = require('../../utils/date.js');
var helper = require('../../src/index.js');
Page({
  data: {
    x: 0,
    y: 0,
    areaWith: 750,
    areaHeight: 750,
    imgUrl: '',
    imagewidth: '',
    imageheight: '',
    base64: '../../images/pic1.png',
    region: ['', '请选择', ''],
    name: '请选择',
    lcode: '浙C',
    picker1Value: 0,
    registerDate: '选择日期',
    transferDate: '选择日期',
    check1: 'check',
    check2: 'check',
    transferflag: false,
    applystatus: true,
    insuredstatus: true,
    apply_status: 1,
    insured_status: 1
  },

  //switch事件
  transferflag: function(e) {
    this.setData({
      transferflag: e.detail.value
    })
  },
  applystatus: function(e) {
    this.setData({
      applystatus: e.detail.value
    })
    if (e.detail.value == true) {
      this.setData({
        apply_status: 1
      })
    } else {
      this.setData({
        apply_status: 0,
        apply_name: '',
        apply_card_id: '',
        apply_phone: '',
        apply_address: ''
      })
    }
  },
  insuredstatus: function(e) {
    this.setData({
      insuredstatus: e.detail.value
    })
    if (e.detail.value == true) {
      this.setData({
        insured_status: 1
      })
    } else {
      this.setData({
        insured_status: 0,
        insured_name: '',
        insured_card_id: '',
        insured_phone: '',
        insured_address: ''
      })
    }
  },


  //注册日期获取
  datePickerBindchange: function(e) {
    this.setData({
      registerDate: e.detail.value
    })
  },
  //过户日期获取
  transferDate: function(e) {
    this.setData({
      transferDate: e.detail.value
    })
  },




  // 省市区获取
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
            addressCity: city
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
              code: code[p].code,
              citycode: code[p].code
            })
          }

        }
      }
    });
  },

  //返回
  back: function() {
    var pre_del = wx.getStorageSync('pre_del');
    if (pre_del == '0') {
      wx.navigateTo({
        url: '../car_list/car_list',
      })
    } else if (pre_del > 10) {
      wx.navigateTo({
        url: '../car_detail/car_detail',
      })
    } else {
      wx.switchTab({
        url: '../index/index',
      })
    }
  },

  //个人中心
  about: function() {
    wx.switchTab({
      url: '../about/about',
    })
  },

  //提交
  formSubmit: function(e) {
    var edv = e.detail.value;
    console.log(edv)
    // 车主信息检查
    if(edv.owner=='')
    {
      wx.showToast({
        title: '车主姓名不能为空',
        icon: 'none',
        duration: 2000
      })
      return false;
    }else if(edv.card_id==''){
      wx.showToast({
        title: '证件号码不能为空',
        icon: 'none',
        duration: 2000
      })
      return false;
    } else if (/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(edv.card_id)==false){
      wx.showToast({
        title: '证件号码格式错误',
        icon: 'none',
        duration: 2000
      })
      return false;
    } else if (edv.phone == ''){
      wx.showToast({
        title: '手机号码不能为空',
        icon: 'none',
        duration: 2000
      })
      return false;
    } else if (/^1[34578][0-9]{9}$/.test(edv.phone)==false){
      wx.showToast({
        title: '手机号码格式错误',
        icon: 'none',
        duration: 2000
      })
      return false;
    }
    //车辆信息
    else if (edv.addressCity=='') {
      wx.showToast({
        title: '请选择地区',
        icon: 'none',
        duration: 2000
      })
      return false;
    }else if(edv.brand==''){
      wx.showToast({
        title: '请选择品牌关键字',
        icon: 'none',
        duration: 2000
      })
      return false;
    } else if (edv.plateNo==''){
      wx.showToast({
        title: '请输入车牌号',
        icon: 'none',
        duration: 2000
      })
      return false;
    }else if(edv.vin==''){
      wx.showToast({
        title: '请输入车牌号',
        icon: 'none',
        duration: 2000
      })
      return false;
    }else if(edv.engineNo==''){
      wx.showToast({
        title: '请输入发动机号',
        icon: 'none',
        duration: 2000
      })
      return false;
    }else if(edv.registerDate==''){
      wx.showToast({
        title: '请选择注册日期',
        icon: 'none',
        duration: 2000
      })
      return false;
    }
    //被投保人与被保险人
     else if (edv.apply_status == '0' &&edv.apply_name== '') {
        wx.showToast({
          title: '被投保人姓名不能为空',
          icon: 'none',
          duration: 2000
        })
        return false;
      } else if (edv.apply_status == '0' &&edv.apply_card_id == '') {
        wx.showToast({
          title: '被投保人证件号码不能为空',
          icon: 'none',
          duration: 2000
        })
        return false;
      } else if (edv.apply_status == '0' &&/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(edv.apply_card_id) == false) {
        wx.showToast({
          title: '被投保人证件号码格式错误',
          icon: 'none',
          duration: 2000
        })
        return false;
      } else if (edv.apply_status == '0' &&edv.apply_phone == '') {
        wx.showToast({
          title: '被投保人手机号码不能为空',
          icon: 'none',
          duration: 2000
        })
        return false;
      } else if (edv.apply_status == '0' &&/^1[34578][0-9]{9}$/.test(edv.apply_phone) == false) {
        wx.showToast({
          title: '被投保人手机号码格式错误',
          icon: 'none',
          duration: 2000
        })
        return false;
      }
      //被保险人
      else if (edv.insured_status == '0' && edv.insured_name == '') {
        wx.showToast({
          title: '被保险人姓名不能为空',
          icon: 'none',
          duration: 2000
        })
        return false;
      } else if (edv.insured_status == '0' && edv.insured_card_id == '') {
        wx.showToast({
          title: '被保险人证件号码不能为空',
          icon: 'none',
          duration: 2000
        })
        return false;
      } else if (edv.insured_status == '0' && /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(edv.insured_card_id) == false) {
        wx.showToast({
          title: '被保险人证件号码格式错误',
          icon: 'none',
          duration: 2000
        })
        return false;
      } else if (edv.insured_status == '0' && edv.insured_phone == '') {
        wx.showToast({
          title: '被保险人手机号码不能为空',
          icon: 'none',
          duration: 2000
        })
        return false;
      } else if (edv.insured_status == '0' && /^1[34578][0-9]{9}$/.test(edv.insured_phone) == false) {
        wx.showToast({
          title: '被保险人手机号码格式错误',
          icon: 'none',
          duration: 2000
        })
        return false;
      }else{
      if (edv.apply_status == '1') {
        edv.apply_status = 'on';
        edv.apply_address = edv.addressCity;
        edv.apply_card_id = edv.card_id;
        edv.apply_name = edv.owner;
        edv.apply_phone = edv.phone
      }
        if(edv.insured_status=='1'){
          edv.insured_status='on';
          edv.insured_address=edv.addressCity;
          edv.insured_card_id=edv.card_id;
          edv.insured_name=edv.owner;
          edv.insured_phone=edv.phone
        }
        var cookies = wx.getStorageSync('Cookie');
        var params = new Object()
        params = edv
        var url = '/Car/addcar'
        var n = 3
      request.POST({
        params: params,
        url: url,
        n: n,
        cookies: cookies,
        success: function (res) {
          console.log(res.data);
          console.log(edv.insured_status)
          if (res.data.code == 0) {
            var car_id = res.data.message
            wx.setStorageSync("car_id", car_id);
            wx.navigateTo({
              url: '../car_company/car_company?car_id=' + car_id,
              // url: '../car_vin/car_vin?car_id=' + car_id,
            })
            wx.showToast({
              title: '添加车辆成功',
              icon: 'none',
              duration: 2000,
              mask: true
            });
           
          } else {
            wx.navigateTo({
              url: '../login/login',
            })
          }
        }
      });
      }

  },

  onLoad: function(options) {
    var that = this
    console.log(options)
    if (options.xc == 'no') {
      that.setData({
        name: options.city,
        plateNo: options.plateNo,
        lcode: options.lcode
      })
    } else {
      var cookies = wx.getStorageSync('Cookie');
      var params = new Object()
      params.platePrefix = options.platePrefix
      params.plateNo = options.plateNo
      params.citycode = options.citycode
      var url = '/Car/get_creat'
      var n = 3
      request.POST({
        params: params,
        url: url,
        n: n,
        cookies: cookies,
        success: function(res) {
          console.log(res.data)
          var r = res.data.content
          console.log('apply_status=' + r.apply_status)
          if (res.data.code == 0) {
            var registerDate = time.js_date_time(r.register_date);
            console.log(time.js_date_time(r.issue_date))
            // var transferDate = time.js_date_time(r.issue_date);
            if (r.transferflag == 0) {
              var transferflag = false
            } else {
              var transferflag = true
              that.setData({
                transferDate: time.js_date_time(r.issue_date)
              })
            }
            if (res.data.content.owner == r.apply_name || r.apply_status == 1) {
              that.setData({
                applystatus: true,
                apply_status: 1,
                check1: 'check'
              })
            } else {
              console.log(false)
              that.setData({
                applystatus: false,
                apply_status: 0,
                check1: ''
              })
            }
            if (r.owner == r.insured_name || r.insured_status == 1) {
              that.setData({
                insuredstatus: true,
                insured_status: 1,
                check2: 'check'
              })
            } else {
              that.setData({
                insuredstatus: false,
                insured_status: 0,
                check2: ''
              })
            }
            if (r.xsz_img == '') {
              that.setData({
                imgUrl: '../../images/pic1.png',
                base64: '../../images/pic1.png'
              })
            } else {
              that.setData({
                imgUrl: "https://www.4006723723.net" + r.xsz_img,
                base64: 'https://www.4006723723.net' + r.xsz_img
              })
            }
            that.setData({
              owner: r.owner,
              phone: r.phone,
              name: r.address_city,
              addressCity: r.address_city,
              cartype: r.brand,
              lcode: r.plate_prefix,
              plateNo: r.plate_no,
              vin: r.vin,
              engineNo: r.engine_no,
              registerDate: time.js_date_time(r.register_date),
              transferflag: transferflag,
              card_id: r.card_id,
              apply_name: r.apply_name,
              apply_card_id: r.apply_card_id,
              apply_phone: r.apply_phone,
              apply_address: r.apply_address,
              insured_name: r.insured_name,
              insured_card_id: r.insured_card_id,
              insured_phone: r.insured_phone,
              insured_address: r.insured_address
            })
          } else {
            wx.showToast({
              title: '数据获取失败',
              icon: 'none',
              duration: 2000,
              mask: true
            })
          }
        }
      });
    }
  },


  onReady: function() {
    helper.checkOrientation('judgeCanva') //检查图片有没有倒转
  },

  //将图片改变成base64格式
  uploadImage: function(e) {
    var _this = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function(res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;
        _this.setData({
          imgUrl: tempFilePaths[0]
        })
        helper.getBase64Image('myCanvas', tempFilePaths[0], function(data) {
          _this.setData({
            base64: data
          });
          // console.log(data);
          var params = new Object()
          params.mypic = data
          var url = '/Car/xsz_upload'
          var n = 4
          request.POST({
            params: params,
            url: url,
            n: n,
            success: function(res) {
              console.log(res.data)
              if (res.data.result.owner != null) {
                wx.showToast({
                  title: '上传成功',
                  icon: 'none',
                  duration: 2000,
                  mask: true
                })
                _this.setData({
                  xsz_img: '/' + res.data.msg,
                  owner: res.data.result.owner,
                  region: ['', res.data.result.city, ''],
                  name: res.data.result.city,
                  addressCity: res.data.result.city,
                  citycode: res.data.result.cityCode,
                  cartype: res.data.result.cartype,
                  lcode: res.data.result.prefix,
                  plateNo: res.data.result.plateNo,
                  vin: res.data.result.vin,
                  engineNo: res.data.result.engineNo,
                  registerDate: res.data.result.registerDate
                });
              } else {
                wx.showToast({
                  title: '上传失败',
                  icon: 'none',
                  duration: 2000,
                  mask: true
                })
              }
            }
          })

        }, 600, 400);
      }
    })
  },
  imageReponseToBox: function(e) {
    var imageSize = {};
    wx.getSystemInfo({
      success: function(res) {
        var windowWidth = res.windowWidth;
        var windowHeight = res.windowHeight;
        imageSize.imageWidth = windowWidth * 0.96;
        imageSize.imageHeight = 240;
      }
    })
    return imageSize;
  },
  imageLoad: function(e) {
    var imageSize = this.imageReponseToBox(e)
    this.setData({
      imagewidth: imageSize.imageWidth,
      imageheight: imageSize.imageHeight
    })
  }
})