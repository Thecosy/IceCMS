// 获取某年的某月共多少天
export function getMonthDays(year, month) {
	return new Date(year, month, 0).getDate()
}

// 获取某一天(年月日)是星期几
export function getDayWeekday(year, month, date) {
	const dateNow = new Date(year, parseInt(month) - 1, date)
	// 0-6, 0 is sunday
	return dateNow.getDay()
}

// 获取某一天所在周的日期
export function getWeekDatesForDate(date) {
	const timeStamp = date.getTime()
	const currentDay = date.getDay()
	let dates = []
	for (var i = 0; i < 7; i++) {
		const _i = i - (currentDay + 6) % 7
		const _isToday = _i === 0
		const _date = new Date(timeStamp + 24 * 60 * 60 * 1000 * _i)
		dates.push({
			theDay: _isToday,  // 只是指当前查询的时间，在那一周的哪一天. 并不是指查询的这一天是否是今天
			date: _date,
			today: isToday(_date) // 是否是今天
		})
	}
	return dates
}

// 获取当前周的日期
export function getWeekDates() {
	const new_Date = new Date()
	return getWeekDatesForDate(new_Date)
}

// 获取某一天所在周的日期
export function getWeekDatesForYMD(year, month, date) {
	const dateNow = new Date(year, parseInt(month) - 1, date)
	return getWeekDatesForDate(dateNow)
}

// 获取 开始日期 之后 第n周 的 日期
export function getDatesAfterWeeks(start, diff) {
	const _arr = start.split('-')
	const y = _arr[0]
	const m = _arr[1]
	const d = _arr[2]
	const _start = new Date(y, parseInt(m) - 1, d)
	const timeStamp = _start.getTime()
	const date = new Date(timeStamp + diff * 7 * 24 * 60 * 60 * 1000)
	return getWeekDatesForDate(date)
}

// 获取当前是开始日期之后的第几周，如果大于total，则表示已经结束过时，如果小于0，则表示start还没有到来。
// 我们这里需要注意的是，比如 开始日期是星期四（没有给出星期一的日期），下周的星期一应该是第2周，而不是还在第一周。(我们这里不仅仅只是差值周数计算，还需要受实际周的限制)
// 不能只是计算差值，如果给出的开始日期是星期一的，差值计算正确，如果不是，则需要考虑开始日期的星期
export function getCurrentWeekNumber(start, total) {
	const _arr = start.split('-')
	const y = _arr[0]
	const m = _arr[1]
	const d = _arr[2]
	const _start = new Date(y, parseInt(m) - 1, d)
	let _timestamp = _start.getTime()
	let day = _start.getDay() // 星期几
	day = (day + 6) % 7  // 将星期几转化为距离星期一多少天
	// 我们将开始时间修正到那一周的星期一
	// 这里我们将星期天作为最后一天，星期一作为第一天
	_timestamp = _timestamp - day * (24 * 60 * 60 * 1000)
	// current
	const dt = new Date()
	const _y = dt.getFullYear()
	const _m = dt.getMonth()
	const _d = dt.getDate()
	const today = new Date(_y, _m, _d)
	const todayStamp = today.getTime()
	const diff = todayStamp - _timestamp
	if (diff < 0) {
		// start还没有开始，未来返回-1
		return -1
	}
	const weekStamp = 7 * 24 * 60 * 60 * 1000
	let weekDiff = parseInt(diff / weekStamp)
	const more = diff % weekStamp
	// if (more >= 24 * 60 * 60 * 1000) {
		// weekDiff += 1
	// }
	// wo always need to plus 1 for weekDiff
	const weekNumber = weekDiff + 1
	if (weekNumber > total) {
		// 已经过期
		return -2
	}
	return weekNumber
}

// 查询某日期是否是今天
export function isToday(date) {
	const dt = new Date();
	const y = dt.getFullYear(); // 年
	const _y = date.getFullYear();
	const m = dt.getMonth(); // 月份从0开始的
	const _m = date.getMonth();
	const d = dt.getDate(); //日
	const _d = date.getDate();
	return (_y + '-' + _m + '-' + _d) === (y + '-' + m + '-' + d);
}

// 获取 某年某月某日 是在 那一月 的第几周
export function getMonthWeek(year, month, date) {
	/*  
	    month = 6 - w = 当前周的还有几天过完(不算今天)  
	    year + month 的和在除以7 就是当天是当前月份的第几周  
	*/
	let dateNow = new Date(year, parseInt(month) - 1, date);
	let w = dateNow.getDay(); //星期数
	let d = dateNow.getDate();
	return Math.ceil((d + 6 - w) / 7);
}

// 获取 某年某月某日 是在 那一年 的第几周
export function getYearWeek(year, month, date) {
	/*  
	    dateNow是当前日期 
	    dateFirst是当年第一天  
	    dataNumber是当前日期是今年第多少天  
	    用dataNumber + 当前年的第一天的周差距的和在除以7就是本年第几周
	*/
	let dateNow = new Date(year, parseInt(month) - 1, date);
	let dateFirst = new Date(year, 0, 1);
	let dataNumber = Math.round((dateNow.valueOf() - dateFirst.valueOf()) / 86400000);
	return Math.ceil((dataNumber + ((dateFirst.getDay() + 1) - 1)) / 7);
}

// 获取今天是星期几
export function getCurrentWeekday() {
	const myDate = new Date()
	let days = myDate.getDay()
	const number = days
	switch (days) {
		case 1:
			days = '周一'
			break
		case 2:
			days = '周二'
			break
		case 3:
			days = '周三'
			break
		case 4:
			days = '周四'
			break
		case 5:
			days = '周五'
			break
		case 6:
			days = '周六'
			break
		case 0:
			days = '周日'
			break
	}
	return {
		number: number,
		weekday: days
	}
}

// 获取今天的 年月日
export function getCurrentYearMonthDay() {
	const date = new Date()
	const year = date.getFullYear()
	const month = date.getMonth() + 1
	const day = date.getDate()
	return {
		year: year,
		month: month,
		day: day
	}
}

// 时间格式化。可以作为过滤器直接使用。
/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string}
 */
export function parseTime(time, cFormat) {
	if (arguments.length === 0) {
		return null
	}
	const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
	let date
	if (typeof time === 'object') {
		date = time
	} else {
		if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
			time = parseInt(time)
		}
		if ((typeof time === 'number') && (time.toString().length === 10)) {
			time = time * 1000
		}
		if ((typeof time === 'string') && time.indexOf('-') >= 0) {
			time = time.replace(/-/g, "/").replace("T", " ")
		}
		date = new Date(time)
	}
	const formatObj = {
		y: date.getFullYear(),
		m: date.getMonth() + 1,
		d: date.getDate(),
		h: date.getHours(),
		i: date.getMinutes(),
		s: date.getSeconds(),
		a: date.getDay()
	}
	const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
		let value = formatObj[key]
		// Note: getDay() returns 0 on Sunday
		if (key === 'a') {
			return ['日', '一', '二', '三', '四', '五', '六'][value]
		}
		if (result.length > 0 && value < 10) {
			value = '0' + value
		}
		return value || 0
	})
	return time_str
}

// time ago，时间格式化。可以作为过滤器直接使用。
/**
 * @param {number|string|object} time
 * @param {string} option
 * @returns {string}
 */
export function formatTime(time, option) {
	if (arguments.length === 0) {
		return null
	}
	let date
	if (typeof time === 'object') {
		date = time
	} else {
		if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
			time = parseInt(time)
		}
		if ((typeof time === 'number') && (time.toString().length === 10)) {
			time = time * 1000
		}
		if ((typeof time === 'string') && time.indexOf('-') >= 0) {
			time = time.replace(/-/g, "/").replace("T", " ")
		}
		date = new Date(time)
	}
	const d = date
	const now = Date.now()

	const diff = (now - d) / 1000

	if (diff < 30) {
		return '刚刚'
	} else if (diff < 3600) {
		// less 1 hour
		return Math.ceil(diff / 60) + '分钟前'
	} else if (diff < 3600 * 24) {
		return Math.ceil(diff / 3600) + '小时前'
	} else if (diff < 3600 * 24 * 2) {
		return '1天前'
	}
	if (option) {
		return parseTime(time, option)
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
		)
	}
}

// 只能比较同一天之内的时间，不跨天比较
// 24小时制，最大时间23:59
export function inTimePeriod(start, end) {
	const now = new Date()
	const nowH = now.getHours() * 1
	const nowM = now.getMinutes() * 1
	const _now = nowH * 60 + nowM
	const startArr = start.split(":")
	const startH = startArr[0] * 1
	const startM = startArr[1] * 1
	const _start = startH * 60 + startM
	const endArr = end.split(":")
	const endH = endArr[0] * 1
	const endM = endArr[1] * 1
	const _end = endH * 60 + endM
	if (_now > _end) {
		// 已经过时
		return -1
	}
	if (_now >= _start && _now <= _end) {
		// 正在进行
		return 0
	}
	// 尚未开始
	return 1
}
