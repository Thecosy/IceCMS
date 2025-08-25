// 模拟博客数据
export const mockPosts = [
  {
    id: 1,
    title: '探索Vue 3的响应式原理',
    excerpt: '深入了解Vue 3的响应式系统，学习Proxy和Reactivity API的工作机制',
    cover: '/assets/img/article-avatar.png',
    publishTime: new Date('2024-01-15'),
    stats: { visit: 1248, comment: 23 },
    categories: [
      { spec: { displayName: '前端开发', slug: 'frontend' } }
    ],
    tags: [
      { spec: { displayName: 'Vue 3', slug: 'vue3' } },
      { spec: { displayName: 'JavaScript', slug: 'javascript' } },
      { spec: { displayName: '前端框架', slug: 'frontend-framework' } }
    ],
    spec: { pinned: true }
  },
  {
    id: 2,
    title: 'Tailwind CSS实战指南',
    excerpt: '从零开始学习Tailwind CSS，构建现代化的响应式界面',
    cover: '/assets/img/imbg.avif',
    publishTime: new Date('2024-01-10'),
    stats: { visit: 856, comment: 12 },
    categories: [
      { spec: { displayName: '前端开发', slug: 'frontend' } }
    ],
    tags: [
      { spec: { displayName: 'CSS', slug: 'css' } },
      { spec: { displayName: '工程化', slug: 'engineering' } }
    ],
    spec: { pinned: false }
  },
  {
    id: 3,
    title: 'TypeScript进阶技巧',
    excerpt: '掌握TypeScript的高级特性，提升代码质量和开发效率',
    cover: '',
    publishTime: new Date('2024-01-05'),
    stats: { visit: 642, comment: 8 },
    categories: [
      { spec: { displayName: '编程语言', slug: 'programming' } }
    ],
    tags: [
      { spec: { displayName: 'TypeScript', slug: 'typescript' } },
      { spec: { displayName: '工程化', slug: 'engineering' } }
    ],
    spec: { pinned: false }
  },
  {
    id: 4,
    title: 'Node.js性能优化实践',
    excerpt: '分享Node.js应用性能优化的经验和最佳实践',
    cover: '/assets/img/rose_l.png',
    publishTime: new Date('2024-01-01'),
    stats: { visit: 423, comment: 5 },
    categories: [
      { spec: { displayName: '后端开发', slug: 'backend' } }
    ],
    tags: [
      { spec: { displayName: 'Node.js', slug: 'nodejs' } },
      { spec: { displayName: '性能优化', slug: 'performance' } }
    ],
    spec: { pinned: false }
  },
  {
    id: 5,
    title: 'React Hooks深入解析',
    excerpt: '全面理解React Hooks的原理和最佳实践',
    cover: '/assets/img/imbg.avif',
    publishTime: new Date('2023-12-20'),
    stats: { visit: 789, comment: 15 },
    categories: [
      { spec: { displayName: '前端开发', slug: 'frontend' } }
    ],
    tags: [
      { spec: { displayName: 'React', slug: 'react' } },
      { spec: { displayName: 'Hooks', slug: 'hooks' } },
      { spec: { displayName: '前端框架', slug: 'frontend-framework' } }
    ],
    spec: { pinned: false }
  },
  {
    id: 6,
    title: 'Python数据分析入门',
    excerpt: '使用Python进行数据分析的基础知识和实践案例',
    cover: '',
    publishTime: new Date('2023-12-15'),
    stats: { visit: 567, comment: 9 },
    categories: [
      { spec: { displayName: '数据科学', slug: 'data-science' } }
    ],
    tags: [
      { spec: { displayName: 'Python', slug: 'python' } },
      { spec: { displayName: '数据分析', slug: 'data-analysis' } }
    ],
    spec: { pinned: false }
  },
  {
    id: 7,
    title: 'Vue 3组合式API最佳实践',
    excerpt: '深入探讨Vue 3 Composition API的使用技巧和最佳实践',
    cover: '/assets/img/article-avatar.png',
    publishTime: new Date('2023-12-01'),
    stats: { visit: 934, comment: 18 },
    categories: [
      { spec: { displayName: '前端开发', slug: 'frontend' } }
    ],
    tags: [
      { spec: { displayName: 'Vue 3', slug: 'vue3' } },
      { spec: { displayName: 'JavaScript', slug: 'javascript' } },
      { spec: { displayName: '前端框架', slug: 'frontend-framework' } }
    ],
    spec: { pinned: false }
  }
]

// 模拟站点配置
export const mockSiteConfig = {
  title: 'Ideaflow Blog',
  logo: '/assets/img/default-avatar.png',
  description: '探索技术的无限可能',
}

// 模拟主题配置
export const mockThemeConfig = {
  common: {
    defaultAvatar: '/assets/img/default-avatar.png',
    favicon: '/assets/img/favicon.ico',
    backgroundImgs: [
      { url: '/assets/img/imbg.avif' }
    ],
    mobileBackgroundImgs: [
      { url: '/assets/img/imbg.avif' }
    ],
    isFullScreen: false,
    isFullScreenMobile: false,
    showStarryEffect: true,
    showRippleEffect: true,
  },
  blogger: {
    avatar: '/assets/img/default-avatar.png',
    nickname: 'Ideaflow',
    bio: '热爱技术，享受编程',
    location: '北京',
    social_links: [
      { platform: 'GitHub', url: 'https://github.com', icon: '<svg>...</svg>' }
    ]
  },
  footer: {
    footerSlogan: '遇事不决，可问春风',
    contactEmail: 'hello@ideaflow.com',
    contactText: '联系我',
    footerAnimalImage: '/assets/img/animals.webp',
    showFooterAnimalImageOnMobile: false
  },
  sidebar: {
    sidebarOrder: ['authorCard', 'hotPosts', 'tagCloud']
  }
}

// 模拟菜单数据  
export const mockMenu = {
  menuItems: [
    {
      status: { displayName: '首页', href: '/' },
      spec: { target: { value: '_self' } },
      children: []
    },
    {
      status: { displayName: '分类', href: '/categories' },
      spec: { target: { value: '_self' } },
      children: [
        { status: { displayName: '前端开发', href: '/category/frontend' } },
        { status: { displayName: '后端开发', href: '/category/backend' } },
        { status: { displayName: '编程语言', href: '/category/programming' } },
        { status: { displayName: '数据科学', href: '/category/data-science' } }
      ]
    },
    {
      status: { displayName: '标签', href: '/tags' },
      spec: { target: { value: '_self' } },
      children: []
    },
    {
      status: { displayName: '关于', href: '/about' },
      spec: { target: { value: '_self' } },
      children: []
    }
  ]
}

// 模拟热门文章
export const mockHotPosts = [
  { title: '热门文章1', permalink: '/post/1' },
  { title: '热门文章2', permalink: '/post/2' },
  { title: '热门文章3', permalink: '/post/3' }
]

// 模拟标签云
export const mockTags = [
  { 
    id: 1,
    spec: { displayName: 'Vue 3', slug: 'vue3', description: 'Vue.js 3.x版本相关内容' },
    status: { permalink: '/tag/vue3', postCount: 2 }
  },
  { 
    id: 2,
    spec: { displayName: 'React', slug: 'react', description: 'React框架开发技巧' },
    status: { permalink: '/tag/react', postCount: 1 }
  },
  { 
    id: 3,
    spec: { displayName: 'JavaScript', slug: 'javascript', description: 'JavaScript语言基础与进阶' },
    status: { permalink: '/tag/javascript', postCount: 2 }
  },
  { 
    id: 4,
    spec: { displayName: 'CSS', slug: 'css', description: 'CSS样式与布局技巧' },
    status: { permalink: '/tag/css', postCount: 1 }
  },
  { 
    id: 5,
    spec: { displayName: 'TypeScript', slug: 'typescript', description: 'TypeScript类型系统' },
    status: { permalink: '/tag/typescript', postCount: 1 }
  },
  { 
    id: 6,
    spec: { displayName: 'Node.js', slug: 'nodejs', description: 'Node.js后端开发' },
    status: { permalink: '/tag/nodejs', postCount: 1 }
  },
  { 
    id: 7,
    spec: { displayName: '性能优化', slug: 'performance', description: '前端性能优化技巧' },
    status: { permalink: '/tag/performance', postCount: 1 }
  },
  { 
    id: 8,
    spec: { displayName: 'Hooks', slug: 'hooks', description: 'React Hooks相关' },
    status: { permalink: '/tag/hooks', postCount: 1 }
  },
  { 
    id: 9,
    spec: { displayName: 'Python', slug: 'python', description: 'Python编程语言' },
    status: { permalink: '/tag/python', postCount: 1 }
  },
  { 
    id: 10,
    spec: { displayName: '数据分析', slug: 'data-analysis', description: '数据分析与可视化' },
    status: { permalink: '/tag/data-analysis', postCount: 1 }
  },
  { 
    id: 11,
    spec: { displayName: '前端框架', slug: 'frontend-framework', description: '各种前端框架对比' },
    status: { permalink: '/tag/frontend-framework', postCount: 3 }
  },
  { 
    id: 12,
    spec: { displayName: '工程化', slug: 'engineering', description: '前端工程化实践' },
    status: { permalink: '/tag/engineering', postCount: 2 }
  }
]

// 模拟分类数据 - 支持嵌套结构
export const mockCategories = [
  {
    id: 1,
    spec: { 
      displayName: '前端开发',
      slug: 'frontend',
      description: '前端开发相关技术文章' 
    },
    status: { 
      permalink: '/category/frontend',
      postCount: 3 
    },
    children: [
      {
        id: 11,
        spec: { 
          displayName: 'Vue.js',
          slug: 'vue',
          description: 'Vue.js框架相关' 
        },
        status: { 
          permalink: '/category/vue',
          postCount: 1 
        },
        children: []
      },
      {
        id: 12,
        spec: { 
          displayName: 'React',
          slug: 'react',
          description: 'React框架相关' 
        },
        status: { 
          permalink: '/category/react',
          postCount: 1 
        },
        children: []
      }
    ]
  },
  {
    id: 2,
    spec: { 
      displayName: '后端开发',
      slug: 'backend',
      description: '后端开发技术分享' 
    },
    status: { 
      permalink: '/category/backend',
      postCount: 1 
    },
    children: [
      {
        id: 21,
        spec: { 
          displayName: 'Node.js',
          slug: 'nodejs',
          description: 'Node.js开发相关' 
        },
        status: { 
          permalink: '/category/nodejs',
          postCount: 1 
        },
        children: []
      }
    ]
  },
  {
    id: 3,
    spec: { 
      displayName: '编程语言',
      slug: 'programming',
      description: '各种编程语言学习' 
    },
    status: { 
      permalink: '/category/programming',
      postCount: 1 
    },
    children: []
  },
  {
    id: 4,
    spec: { 
      displayName: '数据科学',
      slug: 'data-science',
      description: '数据分析与机器学习' 
    },
    status: { 
      permalink: '/category/data-science',
      postCount: 1 
    },
    children: []
  }
]