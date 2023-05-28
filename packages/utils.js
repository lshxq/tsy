const random = (start=10, end=100) => {
  return Math.floor(Math.random() * (end - start)) + start
}
const bool = () => {
  return random() > 50
}

localStorage

const daytimeInMili = 24 * 60 * 60 * 1000;

export default {
  setLocal(blockName, obj) {
    const origin = localStorage[blockName] || {}
    const newValue = Object.assign({}, origin, obj);
    localStorage[blockName] = JSON.stringify(newValue)

  },
  getLocal(blockName, path) {
    let curr = localStorage[blockName]
    curr = curr ? JSON.parse(curr) : {}
    const pathSplit = path.split('.')
    for (const key of pathSplit) {
      if (curr) {
        curr = curr[key] 
      }
    }
    return curr
  },

  random,
  randomStr(maxLen=200) {
    let str = ''
    const len = random(10, maxLen)
    for (let idx=0; idx<len; idx++) {
      str += String.fromCharCode(bool() ? random(48, 57) : random(65, 122))
    }
    return str
  },
  strInArray(str, arr=[]) {
    for (const ele of arr) {
      if (`${str}` === `${ele}`) {
        return true
      }
    }
    return false
  },

  formatDate(date, fmt='yyyy-MM-dd hh:mm:ss') {
    var o = {
    "M+": date.getMonth() + 1, //月份
    "d+": date.getDate(), //日
    "h+": date.getHours(), //小时
    "m+": date.getMinutes(), //分
    "s+": date.getSeconds(), //秒
    "q+": Math.floor((date.getMonth() + 3) / 3), //季度
    "S": date.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
  },

  getMonthDay(year, month) {
    const days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if ((year % 4 === 0) && (year % 100 !== 0 || year % 400 === 0)) {
      days[1] = 29;
    }
    return days[month]
  },

  getPreviousMonth(year, month) {
    const date = new Date(year, month, 1);
    const milli = date.getTime();
    const milli2 = milli - daytimeInMili;
    const previous = new Date(milli2)
    return {
      year: previous.getFullYear(),
      month: previous.getMonth()
    }
  },
  
  getNextMonth(year, month) {
    const dd = new Date(year, month, 15);
    const milli = dd.getTime();
    const milli2 = milli + daytimeInMili * 20;
    const next = new Date(milli2);

    return {
      year: next.getFullYear(),
      month: next.getMonth(),
    };
  },
  
}