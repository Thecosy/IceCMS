// 模拟文章数据
export const mockPosts = [
  {
    id: 1,
    title: "Hao主题：优雅的博客体验",
    summary: "介绍这个基于Nuxt 3开发的现代化博客主题，具有响应式设计、暗色模式、动画效果等特色功能。",
    content: "这是一篇关于Hao主题的介绍文章...",
    author: {
      name: "Hao",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Hao",
      url: "/author/hao"
    },
    publishTime: "2024-08-25T10:00:00.000Z",
    updateTime: "2024-08-25T10:00:00.000Z",
    cover: "https://picsum.photos/800/400?random=1",
    categories: [
      { name: "前端开发", slug: "frontend", color: "#3b82f6" }
    ],
    tags: [
      { name: "Nuxt3", slug: "nuxt3", color: "#00dc82" },
      { name: "Vue3", slug: "vue3", color: "#4fc08d" },
      { name: "TailwindCSS", slug: "tailwindcss", color: "#06b6d4" }
    ],
    stats: {
      views: 1250,
      comments: 8,
      likes: 32
    },
    pinned: true
  },
  {
    id: 2,
    title: "JavaScript高级特性解析",
    summary: "深入探讨JavaScript的高级特性，包括闭包、原型链、异步编程等核心概念。",
    content: "JavaScript作为现代Web开发的核心语言...",
    author: {
      name: "Hao",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Hao",
      url: "/author/hao"
    },
    publishTime: "2024-08-24T14:30:00.000Z",
    cover: "https://picsum.photos/800/400?random=2",
    categories: [
      { name: "前端开发", slug: "frontend", color: "#3b82f6" }
    ],
    tags: [
      { name: "JavaScript", slug: "javascript", color: "#f7df1e" },
      { name: "编程基础", slug: "programming", color: "#6366f1" }
    ],
    stats: {
      views: 890,
      comments: 5,
      likes: 23
    },
    pinned: false
  },
  {
    id: 3,
    title: "现代CSS布局技巧",
    summary: "掌握Flexbox、Grid和现代CSS特性，打造响应式的精美界面。",
    content: "CSS布局是前端开发的基础技能...",
    author: {
      name: "Hao",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Hao",
      url: "/author/hao"
    },
    publishTime: "2024-08-23T09:15:00.000Z",
    cover: "https://picsum.photos/800/400?random=3",
    categories: [
      { name: "前端开发", slug: "frontend", color: "#3b82f6" }
    ],
    tags: [
      { name: "CSS", slug: "css", color: "#1572b6" },
      { name: "响应式设计", slug: "responsive", color: "#ec4899" }
    ],
    stats: {
      views: 756,
      comments: 12,
      likes: 19
    },
    pinned: false
  },
  {
    id: 4,
    title: "Vue 3 Composition API实战",
    summary: "通过实际案例学习Vue 3的Composition API，提升组件复用能力。",
    content: "Vue 3引入了Composition API...",
    author: {
      name: "Hao",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Hao",
      url: "/author/hao"
    },
    publishTime: "2024-08-22T16:45:00.000Z",
    cover: "https://picsum.photos/800/400?random=4",
    categories: [
      { name: "Vue开发", slug: "vue", color: "#4fc08d" }
    ],
    tags: [
      { name: "Vue3", slug: "vue3", color: "#4fc08d" },
      { name: "Composition API", slug: "composition-api", color: "#42b883" }
    ],
    stats: {
      views: 1123,
      comments: 7,
      likes: 28
    },
    pinned: false
  },
  {
    id: 5,
    title: "TypeScript进阶教程",
    summary: "从基础到进阶，全面掌握TypeScript的类型系统和高级特性。",
    content: "TypeScript为JavaScript带来了强类型...",
    author: {
      name: "Hao",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Hao",
      url: "/author/hao"
    },
    publishTime: "2024-08-21T11:20:00.000Z",
    cover: "https://picsum.photos/800/400?random=5",
    categories: [
      { name: "前端开发", slug: "frontend", color: "#3b82f6" }
    ],
    tags: [
      { name: "TypeScript", slug: "typescript", color: "#3178c6" },
      { name: "类型系统", slug: "type-system", color: "#7c3aed" }
    ],
    stats: {
      views: 945,
      comments: 9,
      likes: 35
    },
    pinned: false
  },
  {
    id: 6,
    title: "Node.js全栈开发指南",
    summary: "使用Node.js构建现代Web应用，涵盖后端API开发和数据库操作。",
    content: "Node.js让JavaScript能够运行在服务端...",
    author: {
      name: "Hao",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Hao",
      url: "/author/hao"
    },
    publishTime: "2024-08-20T13:30:00.000Z",
    cover: "https://picsum.photos/800/400?random=6",
    categories: [
      { name: "后端开发", slug: "backend", color: "#ef4444" }
    ],
    tags: [
      { name: "Node.js", slug: "nodejs", color: "#339933" },
      { name: "全栈开发", slug: "fullstack", color: "#8b5cf6" }
    ],
    stats: {
      views: 667,
      comments: 4,
      likes: 16
    },
    pinned: false
  }
];

// 模拟分类数据
export const mockCategories = [
  {
    name: "前端开发",
    slug: "frontend",
    description: "前端技术分享与探讨",
    color: "#3b82f6",
    cover: "https://picsum.photos/400/200?random=10",
    postCount: 4
  },
  {
    name: "Vue开发",
    slug: "vue",
    description: "Vue.js相关技术文章",
    color: "#4fc08d",
    cover: "https://picsum.photos/400/200?random=11",
    postCount: 1
  },
  {
    name: "后端开发",
    slug: "backend",
    description: "服务端技术与架构",
    color: "#ef4444",
    cover: "https://picsum.photos/400/200?random=12",
    postCount: 1
  }
];

// 模拟标签数据
export const mockTags = [
  { name: "Nuxt3", slug: "nuxt3", color: "#00dc82", postCount: 1 },
  { name: "Vue3", slug: "vue3", color: "#4fc08d", postCount: 2 },
  { name: "TailwindCSS", slug: "tailwindcss", color: "#06b6d4", postCount: 1 },
  { name: "JavaScript", slug: "javascript", color: "#f7df1e", postCount: 1 },
  { name: "编程基础", slug: "programming", color: "#6366f1", postCount: 1 },
  { name: "CSS", slug: "css", color: "#1572b6", postCount: 1 },
  { name: "响应式设计", slug: "responsive", color: "#ec4899", postCount: 1 },
  { name: "Composition API", slug: "composition-api", color: "#42b883", postCount: 1 },
  { name: "TypeScript", slug: "typescript", color: "#3178c6", postCount: 1 },
  { name: "类型系统", slug: "type-system", color: "#7c3aed", postCount: 1 },
  { name: "Node.js", slug: "nodejs", color: "#339933", postCount: 1 },
  { name: "全栈开发", slug: "fullstack", color: "#8b5cf6", postCount: 1 }
];

// 模拟菜单数据
export const mockMenu = {
  menuItems: [
    { name: "首页", path: "/", icon: "home" },
    { name: "分类", path: "/categories", icon: "folder" },
    { name: "标签", path: "/tags", icon: "tag" },
    { name: "归档", path: "/archives", icon: "archive" },
    { name: "友链", path: "/friends", icon: "link" },
    { name: "关于", path: "/about", icon: "user" }
  ]
};

// 模拟站点配置
export const mockSiteConfig = {
  title: "Hao Blog",
  subtitle: "分享技术与生活",
  description: "一个基于Nuxt 3的现代化博客主题",
  author: {
    name: "Hao",
    bio: "热爱技术的前端开发者",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Hao",
    social: {
      github: "https://github.com",
      twitter: "https://twitter.com",
      email: "mailto:hello@example.com"
    }
  },
  footer: {
    copyright: "© 2024 Hao Blog. All rights reserved.",
    links: [
      { name: "隐私政策", url: "/privacy" },
      { name: "服务条款", url: "/terms" }
    ]
  }
};