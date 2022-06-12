
// import store from '@/store'

let  baseUrl='http://http://119.45.164.21:7953/'//基本请求路径

//这个是我封装的网络请求 

export  function api(networkUrl,methodsWay,dataCont,util=undefined){
	
	// 默认关闭错误提示
	if(util == undefined) {
		util = {
			showError: false,//开启错误提示
		}
	}
	//在这里发送真正的网络请求 因为你的部分接口携带oken
	//所以在每次调用前 要去那vue里面的token
	// let token=store.state.Token！！！！！
	return new Promise((resolve,reject)=>{
		uni.request({
			url: baseUrl+networkUrl, //由基础路径和接口地址
			method:methodsWay||"GET",//请求的方式必须大写
			data:dataCont||{},//参数
			header: {
				'Content-Type': 'application/json',
				// 'Authorization':token||"" //在请求头携带token 如果有的话 没有就为空
			},
			// 成功使用resolve
			success: (res) => {
				if(res.data&&res.data.success){
						resolve(res.data)
				}else{ 
					if(util.showError){
						showError(res);
					}
						resolve(res.data)
				}
			},
			//失败调用reject，
			fail:(err)=>{
				// 失败做处理
				if(util.showError){
					showError(res);
				}
				reject(err)
			}
		});
	})
}

// 错误处理
const showError = (error) => {
	if(error){
		switch (error.data.code) {
			case 401:
			uni.showToast({
				title: '没有权限',
				icon:'none',
				duration: 1000
			});
			break;
			
			case 403:
			uni.showToast({
				title: '拒绝访问',
				icon:'none',
				duration: 1000
			});
			break;
			
			case 404:
			uni.showToast({
				title: '很抱歉，资源未找到!',
				icon:'none',
				duration: 1000
			});
			break;
			
			case 500:
			uni.showToast({
				title: '没有权限',
				icon:'none',
				duration: 1000
			});
			break;
			
			case 502:
			uni.showToast({
				title: '服务器异常',
				icon:'none',
				duration: 1000
			});
			break;
			
			case 504:
			uni.showToast({
				title: '网络超时',
				icon:'none',
				duration: 1000
			});
			break;
			
			default:
			uni.showToast({
				title:"网络错误",
				icon:'none',
				duration: 1000
			});
			break
		}
	}
}