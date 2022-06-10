function _getSystemInfo() {
	const info = uni.getSystemInfoSync()
	const app = getApp({
		allowDefault: true
	})

	app.globalData.screenHeight = info.screenHeight
	app.globalData.statusBarHeight = info.statusBarHeight || 0
	
	// #ifdef MP-ALIPAY
	app.globalData.navBarHeight = info.titleBarHeight || 0
	// #endif
	let safeTop = 0
	if (info.safeArea) {
		// H5上这个始终会为0
		safeTop = info.safeArea.top
	}
	// #ifdef MP-TOUTIAO
	if (safeTop > 0 && app.globalData.statusBarHeight === 0) {
		app.globalData.statusBarHeight = app.globalData.safeTop
	}
	// #endif
	// 简单粗暴的处理底部安全区的高度
	// 安全区高度：34px？ 68rpx？
	// #ifndef H5
	if (info.platform == 'ios' && info.windowHeight / info.windowWidth > 1.78) {
		app.globalData.xBarHeight = 34
	} else {
		app.globalData.xBarHeight = 0
	}
	// #endif
	// #ifdef H5
	app.globalData.xBarHeight = 0
	// #endif
	app.globalData.platform = info.platform
	app.globalData.brand = info.brand
	app.globalData.model = info.model
}

export function initSystemInfo() {
	try {
		_getSystemInfo()
	} catch (e) {
		_getSystemInfo()
	}
}

export function getPlatform() {
	const app = getApp({
		allowDefault: true
	})
	if (app.globalData.platform) {
		return app.globalData.platform
	}
	initSystemInfo()
	return app.globalData.platform
}

export function getScreenHeight() {
	const app = getApp({
		allowDefault: true
	})
	if (app.globalData.screenHeight) {
		return app.globalData.screenHeight
	}
	initSystemInfo()
	return app.globalData.screenHeight
}

// 默认每次都是重新获取windowHeight
export function getWindowHeight() {
	const app = getApp({
		allowDefault: true
	})
	// 如果您需要使用某个固定的windowHeight，
	// 您可以将其存起来
	if (app.globalData.windowHeight) {
		return app.globalData.windowHeight
	}
	try{
		return uni.getSystemInfoSync().windowHeight
	}catch(e){
		try{
			return uni.getSystemInfoSync().windowHeight
		}catch(e){
			return 0
		}
	}
}
export function getWindowHeightAsync() {
	return new Promise((resolve, reject) => {
		uni.getSystemInfo({
			success: (res) => {
				resolve(res.windowHeight)
			},
			fail: (err) => {
				reject(err)
			}
		})
	})
}

export function getStatusBarHeight() {
	const app = getApp({
		allowDefault: true
	})
	if (app.globalData.statusBarHeight) {
		return app.globalData.statusBarHeight
	}
	if (!app.globalData.platform || app.globalData.platform.length === 0) {
		initSystemInfo()
	}
	return app.globalData.statusBarHeight
}
// 自定义时使用
// 自带navbar时候，我们一般使用windowHeight，故此值一般不需要使用
export function getNavBarHeight() {
	const app = getApp({
		allowDefault: true
	})
	if (app.globalData.navBarHeight >= 0) {
		return app.globalData.navBarHeight
	}
	// 默认使用44px高度，需要覆盖请自行设置app.globalData.navBarHeight
	app.globalData.navBarHeight = 44
	return app.globalData.navBarHeight
}
// 在不同的小程序中，系统自带的tabBarHeight的高度是不同的
// 用户在界面下很容易获取到tabBarHeight，
// 但是我们框架内部获取到的不一定是正确的
// 这里仅仅是作为缓存
export function getTabBarHeight() {
	const app = getApp({
		allowDefault: true
	})
	if (app.globalData.tabBarHeight >= 0) {
		return app.globalData.tabBarHeight
	}
	return 0
}

export function getXBarHeight() {
	const app = getApp({
		allowDefault: true
	})
	if (app.globalData.xBarHeight >= 0) {
		return app.globalData.xBarHeight
	}
	if (!app.globalData.platform || app.globalData.platform.length === 0) {
		initSystemInfo()
	}
	return app.globalData.xBarHeight || 0
}

export function getPx(val) {
	if (typeof val === 'number') {
		return uni.upx2px(val)
	}
	const a = parseInt(val)
	if (val.indexOf('rpx') >= 0) {
		return uni.upx2px(a)
	}
	if (val.indexOf('upx') >= 0) {
		return uni.upx2px(a)
	}
	if (val.indexOf('px') >= 0) {
		return a
	}
	return uni.upx2px(a)
}

// window-screen-status-nav-x-50rpx-10px-20-!32rpx
export function getHeight(val) {
	if (val === 'screen') {
		return getScreenHeight()
	}
	if (val === 'window') {
		return getWindowHeight()
	}
	if (val === 'status') {
		return getStatusBarHeight()
	}
	if (val === 'nav') {
		return getNavBarHeight()
	}
	if (val === 'status-nav' || val === 'nav-status') {
		return getStatusBarHeight() + getNavBarHeight()
	}
	if (val === 'x') {
		return getXBarHeight()
	}
	if (typeof val === 'string') {
		const arr = val.split('-')
		let h = 0
		for (const i in arr) {
			const t = arr[i]
			let factor = 1
			if (t.startsWith('!')) {
				factor = -1
			}
			if (t === 'screen' || t === '!screen') {
				h += factor * getScreenHeight()
			} else if (t === 'window' || t === '!window') {
				h += factor * getWindowHeight()
			} else if (t === 'status' || t === '!status') {
				h += factor * getStatusBarHeight()
			} else if (t === 'nav' || t === '!nav') {
				h += factor * getNavBarHeight()
			} else if (t === 'tab' || t === '!tab') {
				h += factor * getTabBarHeight()
			} else if (t === 'x' || t === '!x') {
				h += factor * getXBarHeight()
			} else {
				if (t.startsWith('!')) {
					h -= getPx(t.substring(1))
				} else {
					h += getPx(t)
				}
			}
		}
		return h
	}
	return getPx(val)
}
