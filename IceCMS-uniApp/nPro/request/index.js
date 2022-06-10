import { requestConfig } from './common.js'

export default class Request {
	constructor(config={}, reqInterceptor=null, resInterceptor=null, successHandler=null, failHandler=null, completeHandler=null) {
	    this.baseUrl = config.baseUrl
		if (config.header) {
			// we must parse deep-copy header, then it can not be influenced by the-before request
			this.header = Object.assign({}, config.header) // JSON.parse(JSON.stringify(config.header))
		} else {
			this.header = {"content-type": "application/json;charset=UTF-8"}
		}
		this.success = successHandler
		this.fail = failHandler
		this.complete = completeHandler
		// interceptors
		this.requestInterceptor = reqInterceptor
		this.responseInterceptor = resInterceptor
	}
	
	async request(options, successHandler=null, failHandler=null, completeHandler=null) {
		const task = options.task || false
		const type = options.type || "request"
		let config = null
		try{
			config = await requestConfig(this, options)
		}catch(e){
			const _res = (this.responseInterceptor && this.responseInterceptor({nCancel: true, response: e}, options)) || {nCancel: true, response: e}
			_callbackWrapper(_res, [this.fail, failHandler, this.complete, completeHandler])
			return Promise.reject(_res)
		}
		if (config.nReqToCancel) {
			const _res = (this.responseInterceptor && this.responseInterceptor({nCancel: true, response: config}, options)) || {nCancel: true, response: config}
			_callbackWrapper(_res, [this.fail, failHandler, this.complete, completeHandler])
			return Promise.reject(_res)
		}
		if (task) {
			const cg = _configWrapper(null, null, config, options, this.responseInterceptor, [this.success, successHandler, this.complete, completeHandler], [this.fail, failHandler, this.complete, completeHandler])
			const f = _requestWrapper(type)
			return f(cg)
		}
		return new Promise((resolve, reject) => {
			const cg = _configWrapper(resolve, reject, config, options, this.responseInterceptor, [this.success, successHandler, this.complete, completeHandler], [this.fail, failHandler, this.complete, completeHandler])
			const f = _requestWrapper(type)
			f(cg)
		})
	}
}

function _callbackWrapper(res, fns) {
	fns.forEach(fn => {
		fn && fn(res)
	})
}

function _configWrapper(resolve, reject, config, options, interceptor, sucFns, failFns) {
	config["success"] = (response) => {
		let _res = response
		if (interceptor) {
			_res = interceptor(response, options)
		}
		if (_res && _res.nReqToReject) {
			delete _res.nReqToReject
			_callbackWrapper(_res, failFns)
			reject && reject(_res)
		} else {
			_callbackWrapper(_res, sucFns)
			resolve && resolve(_res)
		}
	}
	config["fail"] = (response) => {
		let _res = response
		if (interceptor) {
			_res = interceptor({nFail: true, response: response}, options)
		}
		delete _res.nReqToReject
		_callbackWrapper(_res, failFns)
		reject && reject(_res)
	}
	return config
}

function _requestWrapper(type) {
	if (type === 'request') {
		return uni.request
	} else if (type === 'upload') {
		return uni.uploadFile
	} else {
		return uni.downloadFile
	}
}
