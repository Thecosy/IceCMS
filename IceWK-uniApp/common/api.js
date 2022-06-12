const { http } = uni.$u
// 获取菜单
export const fetchMenu = (params, config = {}) => http.post('/ebapi/public_api/index', params, config)
