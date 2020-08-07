/**
 * Created by jiachenpan on 16/11/18.
 */

export function parseSimpleTime(time) {
  if (!time) return time;
  let date;
  if (typeof time === 'object') {
    date = time;
  } else {
    if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
      time = parseInt(time);
    }
    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000;
    }
    date = new Date(time);
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate()
  };
  return `${formatObj.y}-${formatObj.m}-${formatObj.d}`;
}
export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null;
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}';
  let date;
  if (typeof time === 'object') {
    date = time;
  } else {
    if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
      time = parseInt(time);
    }
    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000;
    }
    date = new Date(time);
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  };
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key];
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') {return ['日', '一', '二', '三', '四', '五', '六'][value ];}
    if (result.length > 0 && value < 10) {
      value = '0' + value;
    }
    return value || 0;
  });
  return time_str;
}

export function strftime(date, sFormat) {
  if (date == null) return '';
  if (typeof (date) === 'string') {
    const s = Date.parse(date);
    const t = new Date();
    t.setTime(s);
    date = t;
  }
  if (!(date instanceof Date)) date = new Date();
  var nDay = date.getDay(),
    nDate = date.getDate(),
    nMonth = date.getMonth(),
    nYear = date.getFullYear(),
    nHour = date.getHours(),
    aDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    aMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    aDayCount = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334],
    isLeapYear = function() {
      if ((nYear & 3) !== 0) return false;
      return nYear % 100 !== 0 || nYear % 400 === 0;
    },
    getThursday = function() {
      var target = new Date(date);
      target.setDate(nDate - ((nDay + 6) % 7) + 3);
      return target;
    },
    zeroPad = function(nNum, nPad) {
      return ('' + (Math.pow(10, nPad) + nNum)).slice(1);
    };
  return sFormat.replace(/%[a-z]/gi, function(sMatch) {
    return {
      '%a': aDays[nDay].slice(0, 3),
      '%A': aDays[nDay],
      '%b': aMonths[nMonth].slice(0, 3),
      '%B': aMonths[nMonth],
      '%c': date.toUTCString(),
      '%C': Math.floor(nYear / 100),
      '%d': zeroPad(nDate, 2),
      '%e': nDate,
      '%F': date.toISOString().slice(0, 10),
      '%G': getThursday().getFullYear(),
      '%g': ('' + getThursday().getFullYear()).slice(2),
      '%H': zeroPad(nHour, 2),
      '%I': zeroPad((nHour + 11) % 12 + 1, 2),
      '%j': zeroPad(aDayCount[nMonth] + nDate + ((nMonth > 1 && isLeapYear()) ? 1 : 0), 3),
      '%k': '' + nHour,
      '%l': (nHour + 11) % 12 + 1,
      '%m': zeroPad(nMonth + 1, 2),
      '%M': zeroPad(date.getMinutes(), 2),
      '%p': (nHour < 12) ? 'AM' : 'PM',
      '%P': (nHour < 12) ? 'am' : 'pm',
      '%s': Math.round(date.getTime() / 1000),
      '%S': zeroPad(date.getSeconds(), 2),
      '%u': nDay || 7,
      '%V': (function() {
        var target = getThursday(),
          n1stThu = target.valueOf();
        target.setMonth(0, 1);
        var nJan1 = target.getDay();
        if (nJan1 !== 4) target.setMonth(0, 1 + ((4 - nJan1) + 7) % 7);
        return zeroPad(1 + Math.ceil((n1stThu - target) / 604800000), 2);
      })(),
      '%w': '' + nDay,
      '%x': date.toLocaleDateString(),
      '%X': date.toLocaleTimeString(),
      '%y': ('' + nYear).slice(2),
      '%Y': nYear,
      '%z': date.toTimeString().replace(/.+GMT([+-]\d+).+/, '$1'),
      '%Z': date.toTimeString().replace(/.+\((.+?)\)$/, '$1')
    }[sMatch] || sMatch;
  });
}

export function formatTime(time, option) {
  time = +time * 1000;
  const d = new Date(time);
  const now = Date.now();

  const diff = (now - d) / 1000;

  if (diff < 30) {
    return '刚刚';
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前';
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前';
  } else if (diff < 3600 * 24 * 2) {
    return '1天前';
  }
  if (option) {
    return parseTime(time, option);
  } else {
    return (
      d.getMonth() +
      1 +
      '月' +
      d.getDate() +
      '日' +
      d.getHours() +
      '时' +
      d.getMinutes() +
      '分'
    );
  }
}

// 格式化时间
export function getQueryObject(url) {
  url = url == null ? window.location.href : url;
  const search = url.substring(url.lastIndexOf('?') + 1);
  const obj = {};
  const reg = /([^?&=]+)=([^?&=]*)/g;
  search.replace(reg, (rs, $1, $2) => {
    const name = decodeURIComponent($1);
    let val = decodeURIComponent($2);
    val = String(val);
    obj[name] = val;
    return rs;
  });
  return obj;
}

/**
 * @param {Sting} input value
 * @returns {number} output value
 */
export function byteLength(str) {
  // returns the byte length of an utf8 string
  let s = str.length;
  for (var i = str.length - 1; i >= 0; i--) {
    const code = str.charCodeAt(i);
    if (code > 0x7f && code <= 0x7ff) s++;
    else if (code > 0x7ff && code <= 0xffff) s += 2;
    if (code >= 0xDC00 && code <= 0xDFFF) i--;
  }
  return s;
}

export function cleanArray(actual) {
  const newArray = [];
  for (let i = 0; i < actual.length; i++) {
    if (actual[i]) {
      newArray.push(actual[i]);
    }
  }
  return newArray;
}

export function param(json) {
  if (!json) return '';
  return cleanArray(
    Object.keys(json).map(key => {
      if (json[key] === undefined) return '';
      return encodeURIComponent(key) + '=' + encodeURIComponent(json[key]);
    })
  ).join('&');
}

export function param2Obj(url) {
  const search = url.split('?')[1];
  if (!search) {
    return {};
  }
  return JSON.parse(
    '{"' +
    decodeURIComponent(search)
      .replace(/"/g, '\\"')
      .replace(/&/g, '","')
      .replace(/=/g, '":"')
      .replace(/\+/g, ' ') +
    '"}'
  );
}

export function html2Text(val) {
  const div = document.createElement('div');
  div.innerHTML = val;
  return div.textContent || div.innerText;
}

export function objectMerge(target, source) {
  /* Merges two  objects,
     giving the last one precedence */

  if (typeof target !== 'object') {
    target = {};
  }
  if (Array.isArray(source)) {
    return source.slice();
  }
  Object.keys(source).forEach(property => {
    const sourceProperty = source[property];
    if (typeof sourceProperty === 'object') {
      target[property] = objectMerge(target[property], sourceProperty);
    } else {
      target[property] = sourceProperty;
    }
  });
  return target;
}

export function toggleClass(element, className) {
  if (!element || !className) {
    return;
  }
  let classString = element.className;
  const nameIndex = classString.indexOf(className);
  if (nameIndex === -1) {
    classString += '' + className;
  } else {
    classString =
      classString.substr(0, nameIndex) +
      classString.substr(nameIndex + className.length);
  }
  element.className = classString;
}
export const beforePickerOptions = [
  {
    text: '今天',
    onClick(picker) {
      const end = new Date();
      const start = new Date(new Date().toDateString());
      end.setTime(start.getTime());
      picker.$emit('pick', [start, end]);
    }
  },
  {
    text: '最近一周',
    onClick(picker) {
      const end = new Date(new Date().toDateString());
      const start = new Date();
      start.setTime(end.getTime() - 3600 * 1000 * 24 * 7);
      picker.$emit('pick', [start, end]);
    }
  },
  {
    text: '最近一个月',
    onClick(picker) {
      const end = new Date(new Date().toDateString());
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
      picker.$emit('pick', [start, end]);
    }
  },
  {
    text: '最近三个月',
    onClick(picker) {
      const end = new Date(new Date().toDateString());
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
      picker.$emit('pick', [start, end]);
    }
  }
];
export const laterPickerOptions = [
  {
    text: '往后一天',
    onClick(picker) {
      const end = new Date();
      const start = new Date();
      end.setTime(start.getTime() + 3600 * 1000 * 24 * 1);
      picker.$emit('pick', [start, end]);
    }
  }, {
    text: '往后二天',
    onClick(picker) {
      const end = new Date();
      const start = new Date();
      end.setTime(start.getTime() + 3600 * 1000 * 24 * 2);
      picker.$emit('pick', [start, end]);
    }
  }, {
    text: '往后三天',
    onClick(picker) {
      const end = new Date();
      const start = new Date();
      end.setTime(start.getTime() + 3600 * 1000 * 24 * 3);
      picker.$emit('pick', [start, end]);
    }
  }, {
    text: '往后一周',
    onClick(picker) {
      const end = new Date();
      const start = new Date();
      end.setTime(start.getTime() + 3600 * 1000 * 24 * 7);
      picker.$emit('pick', [start, end]);
    }
  }
];
export const laterPickerOptionsByGreatRange = [
  {
    text: '往后一周',
    onClick(picker) {
      const end = new Date();
      const start = new Date();
      end.setTime(start.getTime() + 3600 * 1000 * 24 * 7);
      picker.$emit('pick', [start, end]);
    }
  }, {
    text: '往后一个月',
    onClick(picker) {
      const end = new Date();
      const start = new Date();
      end.setTime(start.getTime() + 3600 * 1000 * 24 * 30);
      picker.$emit('pick', [start, end]);
    }
  }, {
    text: '往后三个月',
    onClick(picker) {
      const end = new Date();
      const start = new Date();
      end.setTime(start.getTime() + 3600 * 1000 * 24 * 90);
      picker.$emit('pick', [start, end]);
    }
  }
];

export function getTime(type) {
  if (type === 'start') {
    return new Date().getTime() - 3600 * 1000 * 24 * 90;
  } else {
    return new Date(new Date().toDateString());
  }
}

// 根据日期范围生成限定时间选择器的条件
export function laterConstraintPickerOptions(startTime, endTime) {
  const start = new Date();
  if (typeof startTime === 'string' && typeof endTime === 'string') {
    startTime = new Date(startTime);
    endTime = new Date(endTime);
  }
  const temStartTime = startTime.getTime() - 1000 * 60 * 60 * 24;
  const pickerOptions = {
    disabledDate(time) {
      return time.getTime() < temStartTime || time.getTime() > endTime.getTime();
    }
  };
  // 设置日期范围不超过给定的范围
  // let temEndTime = new Date(new Date().setDate(endTime.getDate() + 1));
  const temEndTime = endTime.getTime() + 1000 * 60 * 60 * 24;
  if (start.getTime() < startTime.getTime() || start.getTime() > temEndTime) {
    return pickerOptions;
  }
  // 表示当前是在限定周期内， 要从当前日期算，并且不超过限定周期
  const options = [];
  for (let i = 1; i <= 4; i++) {
    const temWeekTime = start.getTime() + 3600 * 1000 * 24 * 7 * i;
    if (temWeekTime > temEndTime) {
      break;
    }
    options.push({
      text: '往后' + i + '周',
      onClick(picker) {
        picker.$emit('pick', [start, new Date(temWeekTime)]);
      }
    });
  }
  pickerOptions.shortcuts = options;
  return pickerOptions;
}

export function debounce(func, wait, immediate) {
  let timeout, args, context, timestamp, result;

  const later = function() {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp;

    // 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last);
    } else {
      timeout = null;
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      }
    }
  };

  return function(...args) {
    context = this;
    timestamp = +new Date();
    const callNow = immediate && !timeout;
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait);
    if (callNow) {
      result = func.apply(context, args);
      context = args = null;
    }

    return result;
  };
}

/**
 * This is just a simple version of deep copy
 * Has a lot of edge cases bug
 * If you want to use a perfect deep copy, use lodash's _.cloneDeep
 */
export function deepClone(source) {
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments', 'deepClone');
  }
  const targetObj = source.constructor === Array ? [] : {};
  Object.keys(source).forEach(keys => {
    if (source[keys] && typeof source[keys] === 'object') {
      targetObj[keys] = deepClone(source[keys]);
    } else {
      targetObj[keys] = source[keys];
    }
  });
  return targetObj;
}

export function uniqueArr(arr) {
  return Array.from(new Set(arr));
}

export function createUniqueString() {
  const timestamp = +new Date() + '';
  const randomNum = parseInt((1 + Math.random()) * 65536) + '';
  return (+(randomNum + timestamp)).toString(32);
}

// 获取当前document元素对象的绝对位置
export function getElemPos(obj) {
  var pos = { 'top': 0, 'left': 0 };
  if (obj.offsetParent) {
    while (obj.offsetParent) {
      pos.top += obj.offsetTop;
      pos.left += obj.offsetLeft;
      obj = obj.offsetParent;
    }
  } else if (obj.x) {
    pos.left += obj.x;
  } else if (obj.x) {
    pos.top += obj.y;
  }
  return { x: pos.left, y: pos.top };
}



function pint(n) {
  n = Math.floor(n);
  if (n >= 0 && n < 10) return '0' + n;
  return n;
}
/**
 * 将秒转换为时间
 * @param val
 * @returns {string}
 */
export function countSecond(val) {
  let transformTime;
  if (val < 60) {
    // 转换几秒几豪秒
    transformTime = `00:${pint(val)}秒`;
  } else if (val >= 60 && val < 60 * 60) {
    // 转换几分钟几秒
    const minute = Math.floor(val / 60);
    const second = Math.floor(val % 60);
    transformTime = `${pint(minute)}:${pint(second)}`;
  } else if (val >= 60 * 60 && val < 60 * 60 * 24) {
    // 转换为几小时 几分钟
    const hour = Math.floor((val / 60) / 60);
    const minute = Math.floor((val / 60) % 60);
    const second = val % 60 % 60;
    transformTime = `${hour}小时 ${pint(minute)}:${pint(second)}`;
  } else {
    // 转换几天 几小时
    const day = Math.floor((val / 60 / 60) / 24);
    const hour = Math.floor((val / 60 / 60) % 24);
    const minute = Math.floor((val / 60) % 60);
    const second = val % 60 % 60;
    transformTime = `${day}天 ${hour ? hour + '小时' : ''} ${pint(minute)}:${pint(second)}`;
  }
  return transformTime;
}
