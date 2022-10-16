/* eslint-disable quotes */
/* eslint-disable no-array-constructor */
/* eslint-disable spaced-comment */
export function formatDate(date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  const o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }
  for (const k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      const str = o[k] + ''
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : padLeftZero(str))
    }
  }
  return fmt
}

function padLeftZero(str) {
  return ('00' + str).substr(str.length)
}

export function Todate(num) { //Fri Oct 31 18:00:00 UTC+0800 2008
  num = num + ''
  var date = ''
  var month = new Array()
  month["Jan"] = 1; month["Feb"] = 2; month["Mar"] = 3; month["Apr"] = 4; month["May"] = 5; month["Jan"] = 6
  month["Jul"] = 7; month["Aug"] = 8; month["Sep"] = 9; month["Oct"] = 10; month["Nov"] = 11; month["Dec"] = 12
  var week = new Array()
  week["Mon"] = "一"; week["Tue"] = "二"; week["Wed"] = "三"; week["Thu"] = "四"; week["Fri"] = "五"; week["Sat"] = "六"; week["Sun"] = "日"
  const str = num.split(" ")
  date = str[3] + "-"
  date = date + month[str[1]] + "-" + str[2] + " " + str[4]
  return date
}

export function GetWeekdate(intime) { //Fri Oct 31 18:00:00 UTC+0800 2008
  
  var dateString = intime;
  var dateObject = new Date(dateString);
  dateObject.getDay()//返回值是 0（周日） 到 6（周六） 之间的一个整数。
  return dateObject.getDay()
}
