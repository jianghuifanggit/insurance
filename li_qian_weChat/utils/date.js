// 获取当前时间
function formatTime(date) {
  var date = new Date(date)
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  // var hour = date.getHours()
  // var minute = date.getMinutes()
  // var second = date.getSeconds() 
  // return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')  
  
  return [year, month, day].map(formatNumber).join('-') 
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

// module.exports = {
//   formatTime: formatTime
// }  
function js_date_time(unixtime) {
  var dateTime = new Date(parseInt(unixtime) * 1000)
  var year = dateTime.getFullYear();
  var month = dateTime.getMonth() + 1;
  var day = dateTime.getDate();
  var hour = dateTime.getHours();
  var minute = dateTime.getMinutes();
  var second = dateTime.getSeconds();
  var now = new Date();
  var now_new = Date.parse(now.toDateString());  //typescript转换写法
  var milliseconds = now_new - dateTime;
  var timeSpanStr = year + '-' + month + '-' + day ;
  return timeSpanStr;
}
module.exports = {
  js_date_time: js_date_time,
  formatTime: formatTime
}
