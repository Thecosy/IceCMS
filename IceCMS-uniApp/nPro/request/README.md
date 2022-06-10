# n-request

简洁干脆的请求器。颗粒细，可配置和定制能力强。有任何问题可以加我`QQ：382006503`或者`微信：pptpdf`。

因为我们自己做了一套 `nvue` 页面 `uni-app` 模式下的 组件 `nPro`，为了名字更加简短，改为 `n-request`。

整个处理逻辑都比较`直接`，代码也比较`直白`，就是`简单粗暴`的去适配`uni.request`，并且支持`全局配置`和`独立覆盖`。

- 请求拦截，比如Header/URL配置检测、自动刷新Token等；
- 响应拦截；
- 在`uni.request`的回调中使用的全局callback；
- api级别的callback；
- 支持常规请求，上传以及下载；
- 支持Promise以及Task；
- 支持同步/异步；
- 更多...

# TODO

- 被拦截时回掉处理也放入响应拦截器里面；

> **注意：**
> 
> 没有对`header`做细致的合并工作（不打算处理），也就是请求中的`header`配置是直接覆盖全局中的`header`配置，而不是差异合并（当然，如果你有特殊需求，可以在`请求拦截器`里面处理`header`）。
> 
> 不对`url`进行任何的检测（自己保证`url`的合法性），最终的`url`就是`baseUrl`和`api`配置中`url`的拼接（当然，你可以在拦截请求器里面修改`url`）。
> 
> 可以根据需要在构建接口时任意添加`参数/字段`，方便你在`拦截器`里面使用。
> 
> `请求被拦截`也会进入响应拦截器里面，而且会自动`reject`返回的内容，响应拦截器接收到的数据为`{nCancel:true, response:...}`；
> 
> 请求`fail`也会进入响应拦截器里面，而且会自动`reject`返回的内容，`fail`时响应拦截器接收到的数据为`{nFail:true, response:...}`；
> 
> `success/fail/complete`回掉并不对应`uni.request`，而是对应响应拦截器的处理逻辑，`resolve`对应`success`，`reject`对应`fail`；
> 
> 不会`类axios`处理，不会进一步抽象与提炼。

# 使用
源码比较直白，可以看源码:

- `Request`class对象，需要实例化；
- 提供了一个`request`方法，`request`方法会调用您设置的`请求拦截器`，提前拦截；
- 适配`uni.request`，完成 `request` 方法；
- 请求取消或者失败会走`reject`（`catch`中处理）；
- 您可以通过`nReqToReject`在响应拦截器中自由控制是否进入`reject`；
- `fail`情况下也会进入响应拦截器，是否`fail`根据`response`中的`nFail`来做判断；
- `请求被拦截`也会进入响应拦截器，是否`被拦截`根据`response`中的`nCancel`来做判断；

## 初始化请求器

自己可以新建一个 `request.js`，用来配置自己的请求器。

```js
// 引入 Request
import Request from '@/nPro/request/index.js'

// 设置 通用的 baseUrl 以及 header
const config = {
	baseUrl: baseUrl,
	header: {"content-type": "application/x-www-form-urlencoded"}
}

// 设置自己的请求拦截器，必须加上 `async`
// 请求前的拦截，比如是否登录/过期/刷新token/...
const reqInterceptor = async (options) => {
	// 必须返回一个 Object
	// 拦截请求：return {nReqToCancel: true, ...}
	// TODO: 添加任意拦截逻辑
	return options
}

// 设置自己的响应拦截器
// 统一对返回的数据进行整理，方便接口统一使用
// conf是您api的options信息，一般情况下您只需要用到您自定义的标记字段
const resInterceptor = (response, conf={}) => {
	// 必须返回你需要处理的数据，将会进入resolve（then中处理）
	// 如果需要reject，需要设置nReqToReject:true，还可以携带自己定义的任何提示内容（catch中处理）
	// uni.request进入fail也会进入该拦截器（为了统一处理逻辑），这个时候的response参数为{nFail: true, response: fail info}。fail时不管返回啥，都进入reject(catch)
	if (response.nFail) {
		return response.response
	}
	// 请求被拦截时也会进入该回掉（为了统一处理逻辑），这个时候的response参数为{nCancel: true, response: cancel info}。cancel时不管返回啥，都进入reject(catch)
	if (response.nCancel) {
		return response.response
	}
	return response
}

// 实例化请求器
// 您可以根据需要实例化多个请求器
const req = new Request(config, reqInterceptor, resInterceptor)

export default req
```

## 构建api或者直接使用

**我们使用了一些固定的参数来定义请求的类别：**

- type: request-普通请求，upload-上传，download-下载；
- task: 布尔值，是否返回task任务，默认是不返回 false；

**我们使用了一些固定的参数来标记拦截状态：**

- nReqToCancel: 布尔值。请求拦截器的返回里标记是否拦截请求；
- nCancel: 布尔值。响应拦截器回掉参数中，标记请求是否被拦截；
- nFail: 布尔值。响应拦截器回掉参数中，标记是否进入了`uni.request`的`fail`，具体可以看拦截器示范；
- nReqToReject：布尔值。用于响应拦截器里面的返回内容标记，标记是否进入`reject`；

### 构建api
```js
import request from '@/common/request.js'

// baseUrl: 'https://www.baidu.com'
// 在您需要请求的地方直接使用该api
export function editInfo(data) {
	return request.request({
		url: '/search',
		method: 'POST',
		data: data
	})
}
```

```js
import { editInfo } from '@/api/user.js'

export default {
	methods: {
		changeUserInfo() {
			editInfo({name: 'nickname'}).then(res => {
				// success
			}).catch(err => {
				// error
				// err 有可能是 Error 对象，也有可能是 您自己定义的内容，处理的时候您需要自己判断
				// 一个通用的错误提示组件就可以完成
			})
		}
	}
}
```

### 直接使用

```js
import request from '@/common/request.js'

export default {
	methods: {
		changeUserInfo() {
			request.request({
				url: '/edit_info',
				data: {name: 'nickname'},
				method: 'POST'
			}).then(res => {
				// success
			}).catch(err => {
				// error
			})
		}
	}
}
```

当然，您也可以在其它`js`中使用，比如`store`。

## task
### api
```js
export function upVideoProject(file, name, data={}, success=null, fail=null, complete=null) {
	return req.request({
		url: '/projects/video_upload/',
		filePath: file,
		name: name,
		formData: data,
		type: 'upload',
		task: true
	}, success, fail, complete)
}
```

### 获取task

**使用async/await获取**

```js
try{
	const a = await upVideoProject(this.videoSrc, 'video', {name: this.name.trim()}, (suc)=>{
		// 其实就是resolve/then
		console.log('a success', suc)
	}, (fail) => {
		// 其实就是reject/catch
		console.log('a fail', fail)
	}, (com) => {
		// 通用逻辑
		console.log('a complete', com)
	})
	console.log('a task:', a)
	a.onProgressUpdate = (pg) => {
		console.log(pg.progress)
	}
}catch(e){
	//TODO handle the exception
	console.log('try:e:', e)
}
console.log('hi')
```

**then获取**
```js
const a = upVideoProject(this.videoSrc, 'video', {name: this.name.trim()}, (suc)=>{
	console.log('success', suc)
}, (fail) => {
	console.log('fail', fail)
}, (com) => {
	console.log('complete', com)
})
console.log('task:', a)
a.then(res => {
	console.log('res:', res)
	res.onProgressUpdate = (pg) => {
		console.log(pg.progress)
	}
}).catch(err => {
	console.log('err:', err)
})
console.log('hello')
```

## success/fail/complete回掉

- `success/fail/complete`都支持全局配置和局部配置，全局和局部并不是覆盖关系，而是都会运行。先运行全局配置，然后是局部配置；
- 所有的回掉都有一个参数，该参数就是响应拦截器里面您的返回内容；
- `success/fail/complete`回掉并不对应`uni.request`的相应回掉，而是对应您的业务逻辑，`resolve/then`的就是`success`，`reject/catch`的就是`fail`；
- `task`任务中，业务处理在`success/fail/complete`回掉中，毕竟不再是常规的`then/catch`处理；

### 全局配置
```js
const sucH = (res)=>{}
...
const req = new Request(config, reqInter, resInter, sucH, failH, comH)
```

### 局部配置
参考上面的task api处理方式。

# 建议

在构建`api`或者使用`request`的时候，您可以根据需要在`参数`里面增加字段，这样您可以根据自己的字段在`拦截器`里面做更多的事情。

## 比如

```js
export function login(data) {
	return request.request({
		url: '/login',
		method: 'POST',
		data: data,
		authType: 'None'
	})
}
```

我们在`options`里面增加了一个`authType`参数，这样我们在构建`拦截器`的时候可以根据这个参数来判断该接口是否需要`登录授权`。

```js
// 需要登录的拦截掉，不需要登录的通过请求
const reqInterceptor = async (options) => {
	if (options.authType === 'None') {
		return options
	}
	return false
}
```

# 更多

这就是一个最简单直接的请求库，你可以查看源码，从而根据自己的需要构建一个满意的`拦截器`和`响应器`。

其实就是根据你的接口配置信息以及拦截返回的数据进行判断，进一步去适配`uni.request`。

一切需要的都可以通过拦截器来实现。
