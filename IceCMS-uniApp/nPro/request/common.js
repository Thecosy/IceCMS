export async function requestConfig(ins, options) {
	// JSON.parse(JSON.stringify(options.header || ins.header))
	// 注意: header默认采用了整体取代的方式,options设置了header,ins中的header会整个丢弃
	const header = Object.assign({}, (options.header || ins.header))
	const baseUrl = options.baseUrl || ins.baseUrl
	// config
	let config = {
		url: baseUrl + options.url,
		header: header
	}
	let _cg = null
	if (ins.requestInterceptor) {
		try{
			const _options = JSON.parse(JSON.stringify(Object.assign({}, (options||{}), config)))
			// _cg is tha same object of _options
			_cg = await ins.requestInterceptor(_options)
		}catch(e){
			return {nReqToCancel: true, error: e}
		}
		// no need to reqeust
		if (_cg.nReqToCancel) {
			return _cg
		}
		// we could also change the url and header in interceptors
		config.url = _cg.url
		config.header = _cg.header
	}
	const type = options.type || "request"
	// config detail, remove unneeded props
	if (type === "request") {
		config["data"] = _cg.data || {}
		config["method"] = _cg.method || "GET"
		config["dataType"] = _cg.dataType || "json"
		config["responseType"] = _cg.responseType || "text"
	} else if (type === "upload") {
		config['filePath'] = _cg.filePath
		config['name'] = _cg.name
		config["method"] = _cg.method || "POST"
		config['formData'] = _cg.formData || {}
		// fileType for alipay
		config["fileType"] = _cg.fileType || "image"
		// config.header['content-type'] = 'multipart/form-data;charset=UTF-8'
		delete config.header['Content-Type']
		delete config.header['content-type']
	} // download need nothing else to config
	return config
}
