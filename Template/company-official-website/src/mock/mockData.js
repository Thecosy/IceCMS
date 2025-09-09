// 模拟数据
export const mockData = {
  // 轮播图数据
  carousels: [
    {
      id: 1,
      title: '轮播图1',
      imageUrl: '/src/assets/banner/1.jpg',
      link: '#',
      sort: 1,
      status: 1,
      createTime: '2024-01-01 10:00:00'
    },
    {
      id: 2,
      title: '轮播图2',
      imageUrl: '/src/assets/banner/2.jpg',
      link: '#',
      sort: 2,
      status: 1,
      createTime: '2024-01-02 10:00:00'
    },
    {
      id: 3,
      title: '轮播图3',
      imageUrl: '/src/assets/banner/3.jpg',
      link: '#',
      sort: 3,
      status: 1,
      createTime: '2024-01-03 10:00:00'
    }
  ],

  // 商品数据
  products: [
    {
      id: 1,
      name: '智能手机',
      description: '高性能智能手机，配备最新处理器',
      price: 2999,
      originalPrice: 3999,
      imageUrl: '/src/assets/product/default.jpg',
      category: '数码产品',
      brand: '科技品牌',
      stock: 100,
      sales: 1250,
      status: 1,
      createTime: '2024-01-01 10:00:00'
    },
    {
      id: 2,
      name: '笔记本电脑',
      description: '轻薄便携笔记本电脑，适合办公和学习',
      price: 5999,
      originalPrice: 6999,
      imageUrl: '/src/assets/product/default.jpg',
      category: '数码产品',
      brand: '科技品牌',
      stock: 50,
      sales: 890,
      status: 1,
      createTime: '2024-01-02 10:00:00'
    },
    {
      id: 3,
      name: '平板电脑',
      description: '高清显示平板电脑，娱乐办公两不误',
      price: 2599,
      originalPrice: 2999,
      imageUrl: '/src/assets/product/default.jpg',
      category: '数码产品',
      brand: '科技品牌',
      stock: 75,
      sales: 650,
      status: 1,
      createTime: '2024-01-03 10:00:00'
    },
    {
      id: 4,
      name: '智能手表',
      description: '多功能智能手表，健康监测专家',
      price: 1299,
      originalPrice: 1599,
      imageUrl: '/src/assets/product/default.jpg',
      category: '智能穿戴',
      brand: '科技品牌',
      stock: 120,
      sales: 980,
      status: 1,
      createTime: '2024-01-04 10:00:00'
    },
    {
      id: 5,
      name: '无线耳机',
      description: '降噪无线耳机，音质清晰',
      price: 599,
      originalPrice: 799,
      imageUrl: '/src/assets/product/default.jpg',
      category: '音频设备',
      brand: '科技品牌',
      stock: 200,
      sales: 1500,
      status: 1,
      createTime: '2024-01-05 10:00:00'
    }
  ],

  // 品牌数据
  brands: [
    {
      id: 1,
      name: '科技品牌',
      logo: '/src/assets/images/icon.png',
      description: '专注于科技产品的知名品牌',
      status: 1,
      sort: 1,
      createTime: '2024-01-01 10:00:00'
    },
    {
      id: 2,
      name: '时尚品牌',
      logo: '/src/assets/images/icon.png',
      description: '引领时尚潮流的品牌',
      status: 1,
      sort: 2,
      createTime: '2024-01-02 10:00:00'
    },
    {
      id: 3,
      name: '生活品牌',
      logo: '/src/assets/images/icon.png',
      description: '提升生活品质的品牌',
      status: 1,
      sort: 3,
      createTime: '2024-01-03 10:00:00'
    }
  ],

  // 商品分类数据
  productCategories: [
    {
      id: 1,
      name: '数码产品',
      description: '各类数码电子产品',
      sort: 1,
      status: 1
    },
    {
      id: 2,
      name: '智能穿戴',
      description: '智能穿戴设备',
      sort: 2,
      status: 1
    },
    {
      id: 3,
      name: '音频设备',
      description: '音频相关设备',
      sort: 3,
      status: 1
    }
  ],

  // 横向商品轮播数据
  productsCarousels: [
    {
      id: 1,
      title: '热销商品推荐',
      products: [1, 2, 3, 4, 5],
      status: 1,
      sort: 1,
      createTime: '2024-01-01 10:00:00'
    }
  ],

  // 基础信息数据
  basicInformation: {
    id: 1,
    companyName: '科技有限公司',
    companyAddress: '中国上海市浦东新区',
    phone: '400-123-4567',
    email: 'contact@company.com',
    wechat: '/src/assets/images/weChat-1.jpg',
    beian: '沪ICP备12345678号',
    copyright: '© 2024 科技有限公司 版权所有',
    description: '专业的科技产品供应商，致力于为客户提供优质的产品和服务。'
  },

  // 证书数据
  certificates: [
    {
      id: 1,
      name: '品牌授权证书A',
      brandName: '科技品牌',
      certificateUrl: '/src/assets/images/icon.png',
      validDate: '2025-12-31',
      status: 1,
      createTime: '2024-01-01 10:00:00'
    },
    {
      id: 2,
      name: '品牌授权证书B',
      brandName: '时尚品牌',
      certificateUrl: '/src/assets/images/icon.png',
      validDate: '2025-12-31',
      status: 1,
      createTime: '2024-01-02 10:00:00'
    }
  ],

  // 关于我们数据
  about: {
    id: 1,
    title: '关于我们',
    content: `
      <h2>公司简介</h2>
      <p>我们是一家专注于科技产品的创新型企业，成立于2020年，总部位于上海。</p>
      
      <h3>企业文化</h3>
      <p>创新、品质、服务是我们的核心价值观。</p>
      
      <h3>发展历程</h3>
      <ul>
        <li>2020年：公司成立</li>
        <li>2021年：推出首款产品</li>
        <li>2022年：获得行业认证</li>
        <li>2023年：业务规模扩大</li>
        <li>2024年：持续创新发展</li>
      </ul>
    `,
    createTime: '2024-01-01 10:00:00'
  },

  // 用户数据
  admin: {
    id: 1,
    username: 'admin',
    password: '123456', // 实际项目中应该加密
    name: '管理员',
    avatar: '/src/assets/avatar.png',
    roles: ['admin'],
    permissions: ['*']
  },

  // GPS相关数据（如果需要）
  gpsData: [
    {
      id: 1,
      sn: 'GPS001',
      latitude: 31.2304,
      longitude: 121.4737,
      address: '上海市黄浦区',
      updateTime: '2024-01-01 10:00:00'
    }
  ],

  // 订单数据
  orders: [
    {
      id: 1,
      orderNo: 'ORD20240101001',
      userId: 1,
      totalAmount: 2999,
      status: 1,
      createTime: '2024-01-01 10:00:00',
      items: [
        {
          productId: 1,
          productName: '智能手机',
          quantity: 1,
          price: 2999
        }
      ]
    }
  ]
};

// 生成分页数据的工具函数
export function generatePageData(data, page = 1, size = 10) {
  const start = (page - 1) * size;
  const end = start + size;
  const items = data.slice(start, end);
  
  return {
    code: 0,
    message: 'success',
    data: {
      content: items,
      totalElements: data.length,
      totalPages: Math.ceil(data.length / size),
      size: size,
      number: page - 1,
      numberOfElements: items.length,
      first: page === 1,
      last: page === Math.ceil(data.length / size)
    }
  };
}

// 生成成功响应的工具函数
export function successResponse(data = null, message = 'success') {
  return {
    code: 0,
    message: message,
    data: data
  };
}

// 生成错误响应的工具函数
export function errorResponse(message = 'error', code = -1) {
  return {
    code: code,
    message: message,
    data: null
  };
} 