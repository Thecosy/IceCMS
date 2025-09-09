import { mockData, successResponse, errorResponse } from '@/mock/mockData'
import md5 from 'js-md5'

// 模拟延迟
const delay = (ms = 300) => new Promise(resolve => setTimeout(resolve, ms))

// 生成模拟token
const generateToken = (username) => {
  return `mock_token_${username}_${Date.now()}`
}

// 管理员登录接口
export async function login(param) {
  await delay()
  console.log('Mock API: login', param)
  
  const { username, password } = param
  
  // 简单的用户验证
  if (username === mockData.admin.username && password === mockData.admin.password) {
    const token = generateToken(username)
    return successResponse({
      token: token,
      userInfo: {
        id: mockData.admin.id,
        username: mockData.admin.username,
        name: mockData.admin.name,
        avatar: mockData.admin.avatar,
        roles: mockData.admin.roles,
        permissions: mockData.admin.permissions
      }
    }, '登录成功')
  } else {
    return errorResponse('用户名或密码错误')
  }
}

export async function loginNum(inStorageNo) {
  await delay()
  console.log('Mock API: loginNum', inStorageNo)
  // 模拟手机号登录验证
  if (inStorageNo === '13800138000') {
    return successResponse({
      exists: true,
      message: '手机号已注册'
    })
  } else {
    return successResponse({
      exists: false,
      message: '手机号未注册'
    })
  }
}

// 管理员登出接口
export async function logout() {
  await delay()
  console.log('Mock API: logout')
  return successResponse(null, '登出成功')
}

// 获取管理员信息
export async function getInfo(token) {
  await delay()
  console.log('Mock API: getInfo', token)
  
  if (token && token.startsWith('mock_token_')) {
    return successResponse({
      id: mockData.admin.id,
      username: mockData.admin.username,
      name: mockData.admin.name,
      avatar: mockData.admin.avatar,
      roles: mockData.admin.roles,
      permissions: mockData.admin.permissions
    })
  } else {
    return errorResponse('无效的token', 401)
  }
}

// 发送手机登录验证码
export async function sendMobileVerifyCode(data) {
  await delay()
  console.log('Mock API: sendMobileVerifyCode', data)
  
  const { mobile } = data
  if (mobile && /^1[3-9]\d{9}$/.test(mobile)) {
    // 模拟发送验证码成功
    return successResponse({
      code: '123456', // 模拟验证码，实际项目中不应该返回
      message: '验证码发送成功'
    }, '验证码发送成功')
  } else {
    return errorResponse('手机号格式不正确')
  }
}

// 对比验证码的正确情况
export async function compareVerifycode(data) {
  await delay()
  console.log('Mock API: compareVerifycode', data)
  
  const { mobile, code } = data
  // 模拟验证码验证，这里简单设置为123456
  if (code === '123456') {
    return successResponse({
      valid: true,
      message: '验证码正确'
    }, '验证码正确')
  } else {
    return errorResponse('验证码错误')
  }
}

// 注册
export async function register(data) {
  await delay()
  console.log('Mock API: register', data)
  
  const { username, password, mobile, code } = data
  
  // 验证验证码
  if (code !== '123456') {
    return errorResponse('验证码错误')
  }
  
  // 检查用户名是否已存在
  if (username === mockData.admin.username) {
    return errorResponse('用户名已存在')
  }
  
  // 模拟注册成功
  const newUser = {
    id: Date.now(),
    username: username,
    password: password, // 实际项目中应该加密
    mobile: mobile,
    name: username,
    avatar: '/src/assets/avatar.png',
    roles: ['user'],
    permissions: ['read'],
    createTime: new Date().toISOString()
  }
  
  return successResponse(newUser, '注册成功')
}

// 修改密码
export async function resetpass(data) {
  await delay()
  console.log('Mock API: resetpass', data)
  
  const { mobile, newPassword, code } = data
  
  // 验证验证码
  if (code !== '123456') {
    return errorResponse('验证码错误')
  }
  
  // 模拟密码修改成功
  return successResponse(null, '密码修改成功')
}

export async function getSignTypeList() {
  await delay()
  console.log('Mock API: getSignTypeList')
  
  // 模拟业务类型列表
  return successResponse([
    { id: 1, name: '零售业务', code: 'RETAIL' },
    { id: 2, name: '批发业务', code: 'WHOLESALE' },
    { id: 3, name: '代理业务', code: 'AGENCY' },
    { id: 4, name: '其他业务', code: 'OTHER' }
  ])
}

export async function zcDelectFile(param) {
  await delay()
  console.log('Mock API: zcDelectFile', param)
  
  // 模拟文件删除成功
  return successResponse(null, '文件删除成功')
} 