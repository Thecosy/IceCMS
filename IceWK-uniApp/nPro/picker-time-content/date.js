const formatNum = (num) => {
	return num*1 < 10 ? ('0' + num*1) : (num + '')
}

const generateNumArr = (start, end, step=1) => {
	const arr = []
	if (start*1 > end*1) {
		for (let i = start*1; i >= end*1; i = i - step*1) {
			arr.push(formatNum(i))
		}
	} else {
		for (let i = start*1; i <= end*1; i+=step*1) {
			arr.push(formatNum(i))
		}
	}
	return arr
}

const getStartEnd = (now, start, end, includeBefore, includeAfter) => {
	let _start = start
	let _end = end
	if (start*1 > end*1) {
		if (!includeAfter && start*1 > now*1) {
			_start = now
		}
		if (!includeBefore && now*1 > end*1) {
			_end = now
		}
		return [_start, _end]
	}
	if (!includeBefore && now*1 > start*1) {
		_start = now
	}
	if (!includeAfter && end*1 > now*1) {
		_end = now
	}
	return [_start, _end]
}

const generateYearsArr = (now, start, end, includeBefore, includeAfter) => {
	if (includeBefore&&includeAfter) return generateNumArr(start, end);
	const a = getStartEnd(now.getFullYear(), start, end, includeBefore, includeAfter)
	return generateNumArr(a[0], a[1])
}

const generateMonthsArr = (now, year, years, includeBefore, includeAfter) => {
	if (includeBefore && includeAfter) return {years: years, months: generateNumArr(1, 12)};
	if (!year*1 !== now.getFullYear()) return {years: years, months: generateNumArr(1, 12)};
	const _start = years[0]
	const _end = years[years.length-1]
	if (year*1 !== _start*1 && year*1 !== _end*1) return {years: years, months: generateNumArr(1,12)};
	if (_start*1 > _end*1) {
		if (year*1 === _start*1 && !includeAfter) return {years: years, months: generateNumArr(now.getMonth()+1, 1)};
		if (year*1 === _end && !includeBefore) return {years: years, months: generateNumArr(12, now.getMonth()+1)};
	} else {
		if (year*1 === _start*1 && !includeBefore) return {years: years, months: generateNumArr(now.getMonth()+1, 12)};
		if (year*1 === _end*1 && !includeAfter) return {years: years, months: generateNumArr(1, now.getMonth()+1)};
	}
	return {years: years, months: generateNumArr(1,12)}
}

const generateDaysArr = (now, year, month, years, months, includeBefore, includeAfter) => {
	// month不能减1，因为日期0，表示是上一个月的最后一天
	const days = new Date(year*1, month*1, 0).getDate()
	if (includeBefore && includeAfter) return {years: years, months: months, days: generateNumArr(1, days)};
	const ny = now.getFullYear()
	const nm = now.getMonth()+1
	if (ny !== year*1 || nm !== month*1) return {years: years, months: months, days: generateNumArr(1, days)};
	const sy = years[0]
	const ey = years[years.length-1]
	const sm = months[0]
	const em = months[months.length-1]
	if ((year*1 !== sy*1 || month*1 !== sm*1) && (year*1 !== ey*1 || month*1 !== em*1)) return {years: years, months: months, days: generateNumArr(1, days)};
	if (sy*1 > ey*1) {
		if (year*1 === sy*1 && month*1 === sm*1 && !includeAfter) return {years: years, months: months, days: generateNumArr(now.getDate(), 1)};
		if (year*1 === ey*1 && month*1 === em*1 && !includeBefore) return {years: years, months: months, days: generateNumArr(days, now.getDate())};
	} else {
		if (year*1 === sy*1 && month*1 === sm*1 && !includeBefore) return {years: years, months: months, days: generateNumArr(now.getDate(), days)};
		if (year*1 === ey*1 && month*1 === em*1 && !includeAfter) return {years: years, months: months, days: generateNumArr(1, now.getDate())};
	}
	return {years: years, months: months, days: generateNumArr(1, days)};
}

// 只考虑小时的includeBefore/After
const generateDateTimeArr = (now, year, month, day, years, months, days, includeBefore, includeAfter) => {
	if (includeBefore && includeAfter) return {years, months, days, hours: generateNumArr(0,23), minutes: generateNumArr(0,59)};
	const ny = now.getFullYear()
	const nm = now.getMonth()+1
	const nd = now.getDate()
	const nhh = now.getHours()
	if(ny!=year*1 || nm!=month*1 || nd!=day*1) return {years, months, days, hours: generateNumArr(0,23), minutes: generateNumArr(0,59)};
	const sy = years[0]
	const ey = years[years.length-1]
	const sm = months[0]
	const em = months[months.length-1]
	const sd = days[0]
	const ed = days[days.length-1]
	if ((year*1 !== sy*1 || month*1 !== sm*1) && (year*1 !== ey*1 || month*1 !== em*1)) return {years, months, days, hours: generateNumArr(0,23), minutes: generateNumArr(0,59)};
	if (sy*1 > ey*1) {
		if (year*1 === sy*1 && month*1 === sm*1 && day*1 === sd*1 && !includeAfter) return {years, months, days, hours: generateNumArr(nhh, 0), minutes: generateNumArr(59,0)};
		if (year*1 === ey*1 && month*1 === em*1 && day*1 === ed*1 && !includeBefore) return {years, months, days, hours: generateNumArr(23, nhh) , minutes: generateNumArr(59,0)};
	} else {
		if (year*1 === sy*1 && month*1 === sm*1 && day*1 === sd*1 && !includeBefore) return {years, months, days, hours: generateNumArr(nhh,23), minutes: generateNumArr(0,59)};
		if (year*1 === ey*1 && month*1 === em*1 && day*1 === ed*1 && !includeAfter) return {years, months, days, hours: generateNumArr(0,nhh), minutes: generateNumArr(0,59)};
	}
	return {years, months, days, hours: generateNumArr(0,23), minutes: generateNumArr(0,59)};
}

const generateHoursArr = (now, start, end, includeBefore, includeAfter) => {
	let _start = start
	let _end = end
	if (start.length > 2) {
		_start = 0
	}
	if (end.length > 2) {
		_end = 23
	}
	if (includeBefore && includeAfter) return generateNumArr(_start, _end);
	const a = getStartEnd(now.getHours(), _start, _end, includeBefore, includeAfter)
	return generateNumArr(a[0], a[1])
}

const generateMinutesArr = (now, hour, hours, includeBefore, includeAfter) => {
	if (includeBefore && includeAfter) return {hours: hours, minutes: generateNumArr(0, 59)};
	const nhh = now.getHours()
	if (nhh !== hour*1) return {hours: hours, minutes: generateNumArr(0, 59)};
	const sh = hours[0]
	const eh = hours[hours.length-1]
	if (sh*1 !== hour*1 && eh*1 !== hour*1) return {hours: hours, minutes: generateNumArr(0, 59)};
	if (sh*1 > eh*1) {
		if (hour*1 === sh*1 && !includeAfter) return {hours, minutes: generateNumArr(now.getMinutes(), 0)}
		if (hour*1 === eh*1 && !includeBefore) return {hours, minutes: generateNumArr(59, now.getMinutes())}
	} else {
		if (hour*1 === sh*1 && !includeBefore) return {hours, minutes: generateNumArr(now.getMinutes(), 59)}
		if (hour*1 === eh*1 && !includeAfter) return {hours, minutes: generateNumArr(0, now.getMinutes())}
	}
	return {hours: hours, minutes: generateNumArr(0, 59)};
}

const getDefaultValue = (mode, value, useCurrent) => {
	if (value && typeof value === 'object' && value.length > 0 && !useCurrent) {
		return value
	}
	if (useCurrent) {
		const now = new Date()
		switch (mode) {
			case 'dateTime':
				return [now.getFullYear(), now.getMonth()+1, now.getDate(), now.getHours(), now.getMinutes()]
				break
			case 'date':
				return [now.getFullYear(), now.getMonth()+1, now.getDate()]
				break
			case 'yearMonth':
				return [now.getFullYear(), now.getMonth()+1]
				break
			case 'time':
				return [now.getHours(), now.getMinutes()]
				break
		}
	}
	return []
}

const findYearIndex = (years, value, now, includeBefore, includeAfter) => {
	const y = formatNum(value[0])
	const yIdx = years.indexOf(y)
	if (yIdx<0) return {index: [0], months: generateMonthsArr(now, years[0], years, includeBefore, includeAfter).months};
	return {index: [yIdx], months: generateMonthsArr(now, y, years, includeBefore, includeAfter).months}
}

const findYearMonthIndex = (years, value, now, includeBefore, includeAfter) => {
	const a = findYearIndex(years, value, now, includeBefore, includeAfter)
	if (value.length <= 1) return {index: [a.index[0], 0], months: a.months};
	const m = formatNum(value[1])
	const mIdx = a.months.indexOf(m)
	if (mIdx<0) return {index: [a.index[0], 0], months: a.months};
	return {index: [a.index[0], mIdx], months: a.months}
}

const findDateIndex = (years, value, now, includeBefore, includeAfter) => {
	const a = findYearMonthIndex(years, value, now, includeBefore, includeAfter)
	if (value.length <= 2) return {index: a.index.concat([0]), months: a.months, days: generateDaysArr(now, years[a.index[0]], a.months[a.index[1]], years, a.months, includeBefore, includeAfter).days}
	const d = formatNum(value[2])
	const days = generateDaysArr(now, years[a.index[0]], a.months[a.index[1]], years, a.months, includeBefore, includeAfter).days
	let dIdx = days.indexOf(d)
	if (dIdx<0) dIdx = 0;
	return {index: a.index.concat(dIdx), months: a.months, days: days}
}

const findTimeIndex = (hours, value, now, includeBefore, includeAfter) => {
	const h = formatNum(value[0])
	const hIdx = hours.indexOf(h)
	if (hIdx<0) return {index: [0,0], minutes: generateMinutesArr(now, hours[0], hours, includeBefore, includeAfter).minutes};
	if (value.length <= 1) return {index: [hIdx, 0], minutes: generateMinutesArr(now, h, hours, includeBefore, includeAfter)}
	const minutes = generateMinutesArr(now, h, hours, includeBefore, includeAfter).minutes
	const m = formatNum(value[1])
	const mIdx = minutes.indexOf(m)
	if (mIdx<0) return {index: [hIdx, 0], minutes: minutes};
	return {index: [hIdx, mIdx], minutes: minutes}
}

const findDateTimeIndex = (years, value, now, includeBefore, includeAfter) => {
	const a = findDateIndex(years, value, now, includeBefore, includeAfter)
	if (value.length <= 3) {
		const hms = generateDateTimeArr(now, years[a.index[0]], a.months[a.index[1]], a.days[a.index[2]], years, a.months, a.days, includeBefore, includeAfter)
		return {index: a.index.concat([0,0]), months: a.months, days: a.days, hours: hms.hours, minutes: hms.minutes}
	}
	const hms = generateDateTimeArr(now, years[a.index[0]], a.months[a.index[1]], a.days[a.index[2]], years, a.months, a.days, includeBefore, includeAfter)
	const h = formatNum(value[3])
	const hIdx = hms.hours.indexOf(h)
	if (hIdx<0) return {index:a.index.concat([0,0]), months: a.months, days: a.days, hours: hms.hours, minutes: hms.minutes};
	if (value.length <= 4) return {index:a.index.concat([hIdx,0]), months: a.months, days: a.days, hours: hms.hours, minutes: hms.minutes};
	const m = formatNum(value[4])
	let mIdx = hms.minutes.indexOf(m)
	if (mIdx < 0) {mIdx = 0};
	return {index:a.index.concat([hIdx,mIdx]), months: a.months, days: a.days, hours: hms.hours, minutes: hms.minutes};
}

const dateMaker = {
	// date/yearMonth/dateTime/time
	init(mode='date', now, value, useCurrent, start, end, includeBefore, includeAfter) {
		const _value = getDefaultValue(mode, value, useCurrent)
		switch (mode) {
			case 'date':
				const ys = generateYearsArr(now, start, end, includeBefore, includeAfter)
				const dt = findDateIndex(ys, _value, now, includeBefore, includeAfter)
				return {years: ys, months: dt.months, days: dt.days, defaultArr: dt.index}
				break
			case 'dateTime':
				const yss = generateYearsArr(now, start, end, includeBefore, includeAfter)
				const dtt = findDateTimeIndex(yss, _value, now, includeBefore, includeAfter)
				return {years: yss, months: dtt.months, days: dtt.days, hours: dtt.hours, minutes: dtt.minutes, defaultArr: dtt.index}
				break
			case 'yearMonth':
				const ysss = generateYearsArr(now, start, end, includeBefore, includeAfter)
				const ym = findYearMonthIndex(ysss, _value, now, includeBefore, includeAfter)
				return {years: ysss, months: ym.months, defaultArr: ym.index}
				break
			case 'time':
				const hours = generateHoursArr(now, start, end, includeBefore, includeAfter)
				const tm = findTimeIndex(hours, _value, now, includeBefore, includeAfter)
				return {hours: hours, minutes: tm.minutes, defaultArr: tm.index}
				break
		}
	},
	initMonths(now, year, years, includeBefore, includeAfter) {
		return generateMonthsArr(now, year, years, includeBefore, includeAfter).months
	},
	initDays(now, year, month, years, months, includeBefore, includeAfter) {
		return generateDaysArr(now, year, month, years, months, includeBefore, includeAfter).days
	},
	initHoursMinutes(now, year, month, day, years, months, days, includeBefore, includeAfter) {
		const a = generateDateTimeArr(now, year, month, day, years, months, days, includeBefore, includeAfter)
		return {hours: a.hours, minutes: a.minutes}
	},
	initMinutes(now, hour, hours, includeBefore, includeAfter) {
		return generateMinutesArr(now, hour, hours, includeBefore, includeAfter).minutes
	}
}

// 暂时比较粗糙
// TODO: 限制右侧的数据使其与左侧更加符合范围选择
// 优先级：1-一般优先级，等待其它业务完成之后
const rangeMaker = {
	// dateRange/yearMonthRange,timeRange
	init(mode='dateRange', now, value, useCurrent, start, end, includeBefore, includeAfter) {
		let fYears = []
		let tYears = []
		let fMonths = []
		let tMonths = []
		let fDays = []
		let tDays = []
		let fHours = []
		let tHours = []
		let fMinutes = []
		let tMinutes = []
		let defaultArr = []  // value into index
		let res1 = []
		let res2 = []
		let fArr = []
		let tArr = []
		switch (mode) {
			case 'dateRange':
				res1 = dateMaker.init('date', now, value, useCurrent, start, end, includeBefore, includeAfter)
				fYears = res1.years
				fMonths = res1.months
				fDays = res1.days
				fArr = res1.defaultArr
				// 根据当前from的选中数据生成to的数据
				res2 = dateMaker.init('date', now, (value||[]).slice(3), false, fYears[fArr[0]], end, includeBefore, includeAfter)
				tYears = res2.years
				tMonths = res2.months
				tDays = res2.days
				tArr = res2.defaultArr
				break
			case 'yearMonthRange':
				res1 = dateMaker.init('yearMonth', now, value, useCurrent, start, end, includeBefore, includeAfter)
				fYears = res1.years
				fMonths = res1.months
				fArr = res1.defaultArr
				// 根据当前from的选中数据生成to的数据
				res2 = dateMaker.init('yearMonth', now, (value||[]).slice(2), false, fYears[fArr[0]], end, includeBefore, includeAfter)
				tYears = res2.years
				tMonths = res2.months
				tArr = res2.defaultArr
				break
			case 'timeRange':
				res1 = dateMaker.init('time', now, value, useCurrent, start, end, includeBefore, includeAfter)
				fHours = res1.hours
				fMinutes = res1.minutes
				fArr = res1.defaultArr
				// 根据当前from的选中数据生成to的数据
				res2 = dateMaker.init('time', now, (value||[]).slice(2), false, fHours[fArr[0]], end, includeBefore, includeAfter)
				tHours = res2.hours
				tMinutes = res2.minutes
				tArr = res2.defaultArr
				break
		}
		defaultArr = fArr.concat([0]).concat(tArr)
		switch (mode) {
			case 'dateRange':
				return {
					fYears,
					tYears,
					fMonths,
					tMonths,
					fDays,
					tDays,
					defaultArr
				}
				break
			case 'yearMonthRange':
				return {
					fYears,
					tYears,
					fMonths,
					tMonths,
					defaultArr
				}
				break
			case 'timeRange':
				return {
					fHours,
					tHours,
					fMinutes,
					tMinutes,
					defaultArr
				}
				break
		}
	}
}

export default {
	date: dateMaker,
	range: rangeMaker
}
