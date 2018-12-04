//提示框简洁版
function showToast(obj) {
  if (typeof obj == 'object' && obj.title) {
    if (!obj.duration || typeof obj.duration != 'number') { obj.duration = 1500; }//默认1.5s后消失  
    var that = getCurrentPages()[getCurrentPages().length - 1];//获取当前page实例  
    obj.isShow = true;//开启toast  
    if (obj.duration < 10000) {
      setTimeout(function () {
        obj.isShow = false;
        obj.cb && typeof obj.cb == 'function' && obj.cb();//如果有成功的回调则执行  
        that.setData({
          'showToast.isShow': obj.isShow
        });
      }, obj.duration);
    }
    that.setData({
      showToast: obj
    });
  } else {
    console.log('showToast fail:请确保传入的是对象并且title必填');
  }
}
/**  
 *手动关闭toast提示  
 */
function hideToast() {
  var that = getCurrentPages()[getCurrentPages().length - 1];//获取当前page实例  
  if (that.data.showToast) {
    that.setData({
      'showToast.isShow': false
    });
  }
}
module.exports = {
  showToast: showToast,
  hideToast: hideToast
}  