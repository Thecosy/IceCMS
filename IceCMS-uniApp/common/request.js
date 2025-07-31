// common/request.js

const BASE_URL = 'https://api.icecmspro.com'; // 替换为你的实际请求地址

const request = (url, options = {}) => {
  return new Promise((resolve, reject) => {
    const fullUrl = options.params ? `${BASE_URL}${url}?${serializeParams(options.params)}` : BASE_URL + url;

    uni.request({
      url: fullUrl,
      method: options.method || 'GET',
      data: options.data || {},
      header: options.header || {
        'Content-Type': 'application/json' // 默认 Content-Type 为 application/json
      },
      success: (res) => {
        if (res.statusCode === 200) {
          resolve(res.data);
        } else {
          reject(res.data);
        }
      },
      fail: (err) => {
        reject(err);
      }
    });
  });
};

// 将对象参数序列化为查询字符串
function serializeParams(params) {
  const serialized = [];
  for (const key in params) {
    if (params.hasOwnProperty(key)) {
      serialized.push(`${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`);
    }
  }
  return serialized.join('&');
}

export default request;
