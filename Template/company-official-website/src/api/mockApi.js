import { mockData, generatePageData, successResponse, errorResponse } from '@/mock/mockData'

// 模拟延迟
const delay = (ms = 300) => new Promise(resolve => setTimeout(resolve, ms))

// 轮播图相关API
export async function getSwiperList() {
  await delay()
  console.log('Mock API: getSwiperList')
  return successResponse(mockData.carousels)
}

export async function addCarousel(data) {
  await delay()
  console.log('Mock API: addCarousel', data)
  const newCarousel = {
    id: mockData.carousels.length + 1,
    ...data,
    createTime: new Date().toISOString()
  }
  mockData.carousels.push(newCarousel)
  return successResponse(newCarousel, '添加成功')
}

export async function updateCarousel(data) {
  await delay()
  console.log('Mock API: updateCarousel', data)
  const index = mockData.carousels.findIndex(item => item.id === data.id)
  if (index !== -1) {
    mockData.carousels[index] = { ...mockData.carousels[index], ...data }
    return successResponse(mockData.carousels[index], '更新成功')
  }
  return errorResponse('轮播图不存在')
}

export async function searchCarouselByName(name) {
  await delay()
  console.log('Mock API: searchCarouselByName', name)
  const results = mockData.carousels.filter(item => 
    item.title.includes(name)
  )
  return successResponse(results)
}

export async function deleteCarouselById(id) {
  await delay()
  console.log('Mock API: deleteCarouselById', id)
  const index = mockData.carousels.findIndex(item => item.id === parseInt(id))
  if (index !== -1) {
    mockData.carousels.splice(index, 1)
    return successResponse(null, '删除成功')
  }
  return errorResponse('轮播图不存在')
}

export async function getCarouselByPage(page, size) {
  await delay()
  console.log('Mock API: getCarouselByPage', page, size)
  return generatePageData(mockData.carousels, parseInt(page), parseInt(size))
}

// 商品轮播相关API
export async function getAllProductCarousel() {
  await delay()
  console.log('Mock API: getAllProductCarousel')
  const productCarousels = mockData.productsCarousels.map(carousel => ({
    ...carousel,
    productDetails: carousel.products.map(productId => 
      mockData.products.find(p => p.id === productId)
    ).filter(Boolean)
  }))
  return successResponse(productCarousels)
}

export async function getProductCarouselById(id) {
  await delay()
  console.log('Mock API: getProductCarouselById', id)
  const carousel = mockData.productsCarousels.find(item => item.id === parseInt(id))
  if (carousel) {
    const productDetails = carousel.products.map(productId => 
      mockData.products.find(p => p.id === productId)
    ).filter(Boolean)
    return successResponse({ ...carousel, productDetails })
  }
  return errorResponse('商品轮播不存在')
}

export async function addProductsCarousel(carousel) {
  await delay()
  console.log('Mock API: addProductsCarousel', carousel)
  const newCarousel = {
    id: mockData.productsCarousels.length + 1,
    ...carousel,
    createTime: new Date().toISOString()
  }
  mockData.productsCarousels.push(newCarousel)
  return successResponse(newCarousel, '添加成功')
}

export async function updateProductsCarousel(carousel) {
  await delay()
  console.log('Mock API: updateProductsCarousel', carousel)
  const index = mockData.productsCarousels.findIndex(item => item.id === carousel.id)
  if (index !== -1) {
    mockData.productsCarousels[index] = { ...mockData.productsCarousels[index], ...carousel }
    return successResponse(mockData.productsCarousels[index], '更新成功')
  }
  return errorResponse('商品轮播不存在')
}

// 商品相关API
export async function searchProductsByName(name) {
  await delay()
  console.log('Mock API: searchProductsByName', name)
  const results = mockData.products.filter(item => 
    item.name.includes(name) || item.description.includes(name)
  )
  return successResponse(results)
}

export async function getProductById(id) {
  await delay()
  console.log('Mock API: getProductById', id)
  const product = mockData.products.find(item => item.id === parseInt(id))
  if (product) {
    return successResponse(product)
  }
  return errorResponse('商品不存在')
}

export async function getAllProducts() {
  await delay()
  console.log('Mock API: getAllProducts')
  return successResponse(mockData.products)
}

export async function addProduct(data) {
  await delay()
  console.log('Mock API: addProduct', data)
  const newProduct = {
    id: mockData.products.length + 1,
    ...data,
    createTime: new Date().toISOString()
  }
  mockData.products.push(newProduct)
  return successResponse(newProduct, '添加成功')
}

export async function getProductsPaged(page, size, sortField) {
  await delay()
  console.log('Mock API: getProductsPaged', page, size, sortField)
  let sortedProducts = [...mockData.products]
  if (sortField) {
    sortedProducts.sort((a, b) => {
      if (sortField === 'price') {
        return b.price - a.price
      }
      if (sortField === 'sales') {
        return b.sales - a.sales
      }
      return 0
    })
  }
  return generatePageData(sortedProducts, parseInt(page), parseInt(size))
}

export async function deleteProductById(id) {
  await delay()
  console.log('Mock API: deleteProductById', id)
  const index = mockData.products.findIndex(item => item.id === parseInt(id))
  if (index !== -1) {
    mockData.products.splice(index, 1)
    return successResponse(null, '删除成功')
  }
  return errorResponse('商品不存在')
}

export async function updateProduct(data) {
  await delay()
  console.log('Mock API: updateProduct', data)
  const index = mockData.products.findIndex(item => item.id === data.id)
  if (index !== -1) {
    mockData.products[index] = { ...mockData.products[index], ...data }
    return successResponse(mockData.products[index], '更新成功')
  }
  return errorResponse('商品不存在')
}

// 基础信息相关API
export async function getFooterData() {
  await delay()
  console.log('Mock API: getFooterData')
  return successResponse([mockData.basicInformation])
}

export async function updateFooterData(data) {
  await delay()
  console.log('Mock API: updateFooterData', data)
  mockData.basicInformation = { ...mockData.basicInformation, ...data }
  return successResponse(mockData.basicInformation, '更新成功')
}

// 品牌相关API
export async function getBrands() {
  await delay()
  console.log('Mock API: getBrands')
  return successResponse(mockData.brands)
}

export async function addBrand(data) {
  await delay()
  console.log('Mock API: addBrand', data)
  const newBrand = {
    id: mockData.brands.length + 1,
    ...data,
    createTime: new Date().toISOString()
  }
  mockData.brands.push(newBrand)
  return successResponse(newBrand, '添加成功')
}

export async function getBrandsPaged(page, size, sortField) {
  await delay()
  console.log('Mock API: getBrandsPaged', page, size, sortField)
  return generatePageData(mockData.brands, parseInt(page), parseInt(size))
}

export async function searchBrandsByName(name) {
  await delay()
  console.log('Mock API: searchBrandsByName', name)
  const results = mockData.brands.filter(item => 
    item.name.includes(name) || item.description.includes(name)
  )
  return successResponse(results)
}

export async function deleteBrandById(id) {
  await delay()
  console.log('Mock API: deleteBrandById', id)
  const index = mockData.brands.findIndex(item => item.id === parseInt(id))
  if (index !== -1) {
    mockData.brands.splice(index, 1)
    return successResponse(null, '删除成功')
  }
  return errorResponse('品牌不存在')
}

export async function updateBrand(data) {
  await delay()
  console.log('Mock API: updateBrand', data)
  const index = mockData.brands.findIndex(item => item.id === data.id)
  if (index !== -1) {
    mockData.brands[index] = { ...mockData.brands[index], ...data }
    return successResponse(mockData.brands[index], '更新成功')
  }
  return errorResponse('品牌不存在')
}

// 商品分类相关API
export async function getProductCategories() {
  await delay()
  console.log('Mock API: getProductCategories')
  return successResponse(mockData.productCategories)
}

// 文件上传API
export async function uploadFile(data) {
  await delay()
  console.log('Mock API: uploadFile', data)
  // 模拟文件上传成功，返回一个假的URL
  const mockUrl = '/src/assets/images/icon.png'
  return successResponse({
    url: mockUrl,
    originalName: data.get ? data.get('file')?.name : 'uploaded-file',
    size: 1024
  }, '上传成功')
}

// 证书相关API
export async function addCertificate(certificate) {
  await delay()
  console.log('Mock API: addCertificate', certificate)
  const newCertificate = {
    id: mockData.certificates.length + 1,
    ...certificate,
    createTime: new Date().toISOString()
  }
  mockData.certificates.push(newCertificate)
  return successResponse(newCertificate, '添加成功')
}

export async function getCertificatesPaged(page, size, sortField) {
  await delay()
  console.log('Mock API: getCertificatesPaged', page, size, sortField)
  return generatePageData(mockData.certificates, parseInt(page), parseInt(size))
}

export async function updateCertificate(certificate) {
  await delay()
  console.log('Mock API: updateCertificate', certificate)
  const index = mockData.certificates.findIndex(item => item.id === certificate.id)
  if (index !== -1) {
    mockData.certificates[index] = { ...mockData.certificates[index], ...certificate }
    return successResponse(mockData.certificates[index], '更新成功')
  }
  return errorResponse('证书不存在')
}

export async function searchCertificatesByName(name) {
  await delay()
  console.log('Mock API: searchCertificatesByName', name)
  const results = mockData.certificates.filter(item => 
    item.name.includes(name) || item.brandName.includes(name)
  )
  return successResponse(results)
}

export async function deleteCertificateById(id) {
  await delay()
  console.log('Mock API: deleteCertificateById', id)
  const index = mockData.certificates.findIndex(item => item.id === parseInt(id))
  if (index !== -1) {
    mockData.certificates.splice(index, 1)
    return successResponse(null, '删除成功')
  }
  return errorResponse('证书不存在')
}

export async function getAllCertificates() {
  await delay()
  console.log('Mock API: getAllCertificates')
  return successResponse(mockData.certificates)
}

// 加盟申请API
export async function addBusiness(data) {
  await delay()
  console.log('Mock API: addBusiness', data)
  return successResponse(null, '申请提交成功，我们会尽快联系您')
}

// 关于我们API
export async function getAboutById(id) {
  await delay()
  console.log('Mock API: getAboutById', id)
  return successResponse(mockData.about)
}

// GPS相关API
export async function getList(params) {
  await delay()
  console.log('Mock API: getList', params)
  return successResponse(mockData.gpsData)
}

export async function getMyOrder(params) {
  await delay()
  console.log('Mock API: getMyOrder', params)
  return successResponse(mockData.orders)
}

export async function getOrderDetail(id) {
  await delay()
  console.log('Mock API: getOrderDetail', id)
  const order = mockData.orders.find(item => item.id === parseInt(id))
  if (order) {
    return successResponse(order)
  }
  return errorResponse('订单不存在')
}

export async function addGpsOrder(data) {
  await delay()
  console.log('Mock API: addGpsOrder', data)
  const newOrder = {
    id: mockData.orders.length + 1,
    ...data,
    orderNo: `ORD${Date.now()}`,
    createTime: new Date().toISOString()
  }
  mockData.orders.push(newOrder)
  return successResponse(newOrder, '下单成功')
}

export async function getMyGps(params) {
  await delay()
  console.log('Mock API: getMyGps', params)
  return successResponse(mockData.gpsData)
} 