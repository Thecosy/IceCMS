// 切换到模拟数据模式
const USE_MOCK = true

// 如果不使用模拟数据，导入真实的request模块
let request
if (!USE_MOCK) {
  request = require('@/utils/request').default
}

// 统一的API调用函数
async function callApi(apiName, ...args) {
  if (USE_MOCK) {
    const mockApi = await import('@/api/mockApi')
    return mockApi[apiName](...args)
  } else {
    // 这里可以调用真实的API
    throw new Error(`Real API ${apiName} not implemented in mock mode`)
  }
}

// 轮播图相关API
export function getSwiperList() {
  return callApi('getSwiperList')
}

export function addCarousel(data) {
  return callApi('addCarousel', data)
}

export function updateCarousel(data) {
  return callApi('updateCarousel', data)
}

export function searchCarouselByName(name) {
  return callApi('searchCarouselByName', name)
}

export function deleteCarouselById(id) {
  return callApi('deleteCarouselById', id)
}

export function getCarouselByPage(page, size) {
  return callApi('getCarouselByPage', page, size)
}

// 商品轮播相关API
export function getAllProductCarousel() {
  return callApi('getAllProductCarousel')
}

export function getProductCarouselById(id) {
  return callApi('getProductCarouselById', id)
}

export function addProductsCarousel(carousel) {
  return callApi('addProductsCarousel', carousel)
}

export function updateProductsCarousel(carousel) {
  return callApi('updateProductsCarousel', carousel)
}

// 商品相关API
export function searchProductsByName(name) {
  return callApi('searchProductsByName', name)
}

export function getProductById(id) {
  return callApi('getProductById', id)
}

export function getAllProducts() {
  return callApi('getAllProducts')
}

export function addProduct(data) {
  return callApi('addProduct', data)
}

export function getProductsPaged(page, size, sortField) {
  return callApi('getProductsPaged', page, size, sortField)
}

export function deleteProductById(id) {
  return callApi('deleteProductById', id)
}

export function updateProduct(data) {
  return callApi('updateProduct', data)
}

// 基础信息相关API
export function getFooterData() {
  return callApi('getFooterData')
}

export function updateFooterData(data) {
  return callApi('updateFooterData', data)
}

// 品牌相关API
export function getBrands() {
  return callApi('getBrands')
}

export function addBrand(data) {
  return callApi('addBrand', data)
}

export function getBrandsPaged(page, size, sortField) {
  return callApi('getBrandsPaged', page, size, sortField)
}

export function searchBrandsByName(name) {
  return callApi('searchBrandsByName', name)
}

export function deleteBrandById(id) {
  return callApi('deleteBrandById', id)
}

export function updateBrand(data) {
  return callApi('updateBrand', data)
}

// 商品分类相关API
export function getProductCategories() {
  return callApi('getProductCategories')
}

// 文件上传API
export function uploadFile(data) {
  return callApi('uploadFile', data)
}

// 证书相关API
export function addCertificate(certificate) {
  return callApi('addCertificate', certificate)
}

export function getCertificatesPaged(page, size, sortField) {
  return callApi('getCertificatesPaged', page, size, sortField)
}

export function updateCertificate(certificate) {
  return callApi('updateCertificate', certificate)
}

export function searchCertificatesByName(name) {
  return callApi('searchCertificatesByName', name)
}

export function deleteCertificateById(id) {
  return callApi('deleteCertificateById', id)
}

export function getAllCertificates() {
  return callApi('getAllCertificates')
}

// 加盟申请API
export function addBusiness(data) {
  return callApi('addBusiness', data)
}

// 关于我们API
export function getAboutById(id) {
  return callApi('getAboutById', id)
}

// GPS相关API
export function getList(params) {
  return callApi('getList', params)
}

export function getMyOrder(params) {
  return callApi('getMyOrder', params)
}

export function getOrderDetail(id) {
  return callApi('getOrderDetail', id)
}

export function addGpsOrder(data) {
  return callApi('addGpsOrder', data)
}

export function getMyGps(params) {
  return callApi('getMyGps', params)
}