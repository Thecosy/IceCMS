// #ifdef APP-NVUE
const animation = uni.requireNativePlugin('animation')
const bindingX = uni.requireNativePlugin('bindingx');
// #endif

// https://weex.apache.org/zh/docs/modules/animation.html#transition
export function animate(ref, options, ins, name, extra) {
	if (!options) return Promise.reject("请设置动画内容")
	// #ifdef APP-NVUE
	if (!ref) return Promise.reject("请指定元素")
	return new Promise((resolve, reject) => {
		animation.transition(ref, {
			styles: options.styles,
			duration: options.duration || 0,
			delay: options.delay || 0,
			timingFunction: options.timingFunction || 'ease',
			needLayout: options.needLayout || false
		}, (res)=>{
			resolve(res || {})
		})
	})
	// #endif
	// #ifndef APP-NVUE
	if (!ins || !name) return Promise.reject("请指明实例和变量")
	const styles = options.styles || {}
	const keys = Object.keys(styles)
	const tps = []
	keys.forEach(item => {
		tps.push(toLine(item))
	})
	let sty = ''
	sty += `transition-property:${tps.join(',')};`
	for (const i in keys) {
		const theK = keys[i]
		sty += `${tps[i]}:${styles[theK]};`
	}
	sty += `transition-duration: ${options.duration||0}ms;transition-delay: ${options.delay||0}ms;transition-timing-function:${options.timingFunction || 'ease'};`
	ins[name] = sty + (extra || '')
	const dur = (options.duration || 0) * 1 + (options.delay || 0) * 1
	if (dur > 0) {
		return new Promise((resolve, reject) => {
			// setTimeout(resolve, dur, {})
			setTimeout(()=>{
				resolve({})
			}, dur)
		})
	} else {
		return Promise.resolve({})
	}
	// #endif
}

// https://alibaba.github.io/bindingx/guide/cn_api_attributes
export function timing(props, exitExpression) {
	// #ifdef APP-NVUE
	if (!props) return;
	const token = bindingX.bind({
			eventType: 'timing',
			exitExpression: exitExpression || {},
			props: props
		}, e => {})
	return token.token
	// #endif
}

export function unbind(token, type) {
	// #ifdef APP-NVUE
	token && bindingX && bindingX.unbind({eventType: type, token: token})
	// #endif
}

// 驼峰转中横线
function toLine(name) {
	return name.replace(/([A-Z])/g, '-$1').toLowerCase()
}
