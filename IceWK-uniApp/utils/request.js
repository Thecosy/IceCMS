import config from './config.js';
import store from '../store/index.js';
export default {
	request(options = {}) {
		return new Promise((resolve, reject) => {
			let url = options.url;
			if (url.indexOf("http://") == -1 && url.indexOf("https://") == -1) {
				options.url = config.domain + url;
			}
			
			if(store.state.userInfo){
				options.header.token = store.state.userInfo.token;
			}
			options.complete = (response) => {
				if (response.statusCode == 200) {
					if (response.data.code == 410 || response.data.code == 420) {
						// #ifdef MP-WEIXIN
							uni.navigateTo({
								url: "/pages/user/login"
							})
						// #endif
						
						// #ifdef H5
							uni.navigateTo({
								url: "/pages/user/sms-login"
							})
						// #endif
					}

					if (response.data.code == 400) {
						uni.showToast({
							title: response.data.msg,
							icon: "none"
						});
					}
					resolve(response.data)
				} else {
					uni.showToast({
						title: '请求异常！',
						icon: "none"
					});
				}
			}

			uni.request(options)
		})
	},

	post(url, data = {}, header = {}) {

		let options = {
			url: url,
			data: data,
			header: header,
			method: "POST"
		}

		return this.request(options);
	},

	get(url, data = {}, header = {}) {
		let options = {
			url: url,
			data: data,
			header: header
		}

		return this.request(options);
	}
};