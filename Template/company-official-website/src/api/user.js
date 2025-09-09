// 切换到模拟数据模式
const USE_MOCK = true

// 统一的API调用函数
async function callApi(apiName, ...args) {
  if (USE_MOCK) {
    const mockApi = await import('@/api/mockUser')
    return mockApi[apiName](...args)
  } else {
    // 这里可以调用真实的API
    throw new Error(`Real API ${apiName} not implemented in mock mode`)
  }
}

// 管理员登录接口
export function login(param) {
  return callApi('login', param)
}

export const loginNum = (inStorageNo) => {
  return callApi('loginNum', inStorageNo)
}

// 管理员登出接口
export const logout = () => {
  return callApi('logout')
}

// 获取管理员信息
export const getInfo = (token) => {
  return callApi('getInfo', token)
}

// 发送手机登录验证码
export const sendMobileVerifyCode = (data) => {
  return callApi('sendMobileVerifyCode', data)
}

// 对比验证码的正确情况
export const compareVerifycode = (data) => {
  return callApi('compareVerifycode', data)
}

// 注册
export const register = (data) => {
  return callApi('register', data)
}

// 修改密码
export const resetpass = (data) => {
  return callApi('resetpass', data)
}

export const getSignTypeList = () => {
  return callApi('getSignTypeList')
}

export const zcDelectFile = (param) => {
  return callApi('zcDelectFile', param)
}
