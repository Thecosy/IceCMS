function isSrc(url) {
	return url.indexOf('http') === 0 || url.indexOf('data:image') === 0 || url.indexOf('//') === 0;
}

function _typeof(obj) {
	return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
}

function isPlainObject(obj) {
	return _typeof(obj) === 'object';
}

function isString(obj) {
	return typeof obj === 'string';
}

function isNonEmptyArray(obj = []) {
	return obj && obj.length > 0 && Array.isArray(obj) && typeof obj !== 'undefined';
}

function isObject(item) {
	return item && typeof item === 'object' && !Array.isArray(item);
}

function isEmptyObject(obj) {
	return Object.keys(obj).length === 0 && obj.constructor === Object;
}

function decodeIconFont(text) {
	// 正则匹配 图标和文字混排 eg: 我去上学校&#xe600;,天天不&#xe600;迟到
	const regExp = /&#x[a-z|0-9]{4,5};?/g;
	if (regExp.test(text)) {
		return text.replace(new RegExp(regExp, 'g'), function(iconText) {
			const replace = iconText.replace(/&#x/, '0x').replace(/;$/, '');
			return String.fromCharCode(replace);
		});
	} else {
		return text;
	}
}

function mergeDeep(target, ...sources) {
	if (!sources.length) return target;
	const source = sources.shift();
	if (isObject(target) && isObject(source)) {
		for (const key in source) {
			if (isObject(source[key])) {
				if (!target[key]) {
					Object.assign(target, {[key]: {}});
				}
				mergeDeep(target[key], source[key]);
			} else {
				Object.assign(target, {[key]: source[key]});
			}
		}
	}
	return mergeDeep(target, ...sources);
}

function deepCopy(obj) {
	var newobj = {}
	for (arr in obj) {
		if (typeof obj[arr] === 'object' && obj[arr] !== null) {
			newobj[arr] = deepCopy(obj[arr])
		} else {
			newobj[arr] = obj[arr]
		}
	}
	return newobj
}

function compareVersion(currVer = '0.0.0', promoteVer = '0.0.0') {
	if (currVer === promoteVer) return true;
	const currVerArr = currVer.split('.');
	const promoteVerArr = promoteVer.split('.');
	const len = Math.max(currVerArr.length, promoteVerArr.length);
	for (let i = 0; i < len; i++) {
		const proVal = ~~promoteVerArr[i];
		const curVal = ~~currVerArr[i];
		if (proVal < curVal) {
			return true;
		} else if (proVal > curVal) {
			return false;
		}
	}
	return false;
}

function arrayChunk(arr = [], size = 4, fill) {
	let groups = [];
	if (arr && arr.length > 0) {
		groups = arr
			.map((e, i) => {
				return i % size === 0 ? arr.slice(i, i + size) : null;
			})
			.filter(e => {
				return e;
			});
	}
	if (typeof fill != 'undefined') {
		while (groups[groups.length-1].length < size) {
			groups[groups.length-1].push(fill)
		}
	}
	return groups;
}

// 乱序array. 原地打乱。需要注意会覆盖传入的数组
function derangeArray(arr=[]) {
	for(var j, x, i = arr.length; i; j = parseInt(Math.random() * i), x = arr[--i], arr[i] = arr[j], arr[j] = x);
	return arr
}

// 使用reduce对数组去重
function derepeatArray(arr=[], key=null) {
	if (key) {
		const obj = {}
		return arr.reduce((cur,next) => {
		    obj[next[key]] ? "" : obj[next[key]] = true && cur.push(next)
		    return cur
		},[])
	} else {
		return [...(new Set(arr))]
	}
}

/*
 * 截断字符串
 * @param str 传入字符串
 * @param len 截断长度
 * @param hasDot 末尾是否...
 * @returns {String}
 */
function truncateString(str, len, hasDot = true) {
	let newLength = 0;
	let newStr = '';
	let singleChar = '';
	const chineseRegex = /[^\x00-\xff]/g;
	const strLength = str.replace(chineseRegex, '**').length;
	for (let i = 0; i < strLength; i++) {
		singleChar = str.charAt(i).toString();
		if (singleChar.match(chineseRegex) !== null) {
			newLength += 2;
		} else {
			newLength++;
		}
		if (newLength > len) {
			break;
		}
		newStr += singleChar;
	}

	if (hasDot && strLength > len) {
		newStr += '...';
	}
	return newStr;
}

/*
 * 转换 obj 为 url params参数
 * @param obj 传入字符串
 * @returns {String}
 */
function objToParams(obj) {
	let str = '';
	for (const key in obj) {
		if (str !== '') {
			str += '&';
		}
		str += key + '=' + encodeURIComponent(obj[key]);
	}
	return str;
}

/*
 * 转换 url params参数为obj
 * @param str 传入url参数字符串
 * @returns {Object}
 */
function paramsToObj(str) {
	let obj = {};
	try {
		obj = JSON.parse(
			'{"' +
			decodeURI(str)
			.replace(/"/g, '\\"')
			.replace(/&/g, '","')
			.replace(/=/g, '":"') +
			'"}'
		);
	} catch (e) {
		console.log(e);
	}
	return obj;
}

// only simple css to js
function cssToJs(str) {
	const arr = (str||'').split(';')
	const a = {}
	arr.forEach(val => {
		if (val && val.length >= 3) {
			const b = val.trim().split(':')
			const attr = b[0].trim()
			const value = b[1].trim()
			a[attr] = value
		}
	})
	return a
}

const toLine = (name) => {
	return name.replace(/([A-Z])/g, '-$1').toLowerCase();
}
/**
 * style对象转化为style字符串
 * @return {string}
 */
function styleObjToStr(styleObject) {
	let transfrom = '';
	for (let i in styleObject) {
		let line = toLine(i);
		transfrom += line + ':' + styleObject[i] + ';';
	}
	return transfrom
}

module.exports = {
	isSrc,
	isPlainObject,
	isString,
	isObject,
	isNonEmptyArray,
	isEmptyObject,
	decodeIconFont,
	mergeDeep,
	deepCopy,
	compareVersion,
	arrayChunk,
	derangeArray,
	derepeatArray,
	truncateString,
	objToParams,
	paramsToObj,
	cssToJs,
	styleObjToStr
}
