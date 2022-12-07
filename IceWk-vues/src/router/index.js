import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/',
    component: () => import('@/page/Home'),
    hidden: true
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/error',
    component: () => import('@/views/LongOutErr'),
    hidden: true
  },

  // my self page out
  {
    path: '/home',
    component: () => import('@/page/Home'),
    hidden: true
  },
  {
    path: '/list',
    component: () => import('@/page/List'),
    hidden: true
  },
  {
    path: '/list/:id(\\d+)',
    component: () => import('@/page/Resource'),
    hidden: true
  },
  {
    path: '/post/:id(\\d+)',
    component: () => import('@/page/Post'),
    hidden: true
  },
  {
    path: '/post/all',
    component: () => import('@/page/AllPost'),
    hidden: true
  },
  {
    path: '/class',
    component: () => import('@/page/Class'),
    hidden: true
  },
  {
    path: '/classdetal/:id(\\d+)',
    component: () => import('@/page/ClassDetal'),
    hidden: true
  },
  {
    path: '/planet/:square',
    component: () => import('@/page/Planet'),
    hidden: true
  },
  {
    path: '/planet',
    component: () => import('@/page/Planet'),
    hidden: true
  },
  {
    path: '/userinfo',
    component: () => import('@/page/UserInfo'),
    hidden: true,
    children: [
      {
        path: '/userinfo/index',
        component: () => import('@/page/UserComponents/Info'),
      },
      {
        path: '/userinfo/post',
        component: () => import('@/page/UserComponents/post'),
      },
      {
        path: '/userinfo/payInfo',
        component: () => import('@/page/UserComponents/payInfo'),
      },
      {
        path: '/userinfo/charge',
        component: () => import('@/page/UserComponents/charge'),
      },
      {
        path: '/userinfo/vip',
        component: () => import('@/page/UserComponents/vip'),
      },
      {
        path: '/userinfo/changePw',
        component: () => import('@/page/UserComponents/changePw'),
      },
      {
        path: '/userinfo/star',
        component: () => import('@/page/UserComponents/star'),
      },
    ]
  },
  {
    path: '/post/:content/all',
    component: () => import('@/page/SearchPost'),
    hidden: true
  },
  {
    path: '/list/:content/all',
    component: () => import('@/page/SearchResource'),
    hidden: true
  },
  {
    path: '/download/:id',
    component: () => import('@/page/Download'),
    hidden: true
  },
  {
    path: '/about',
    component: () => import('@/page/About'),
    hidden: true
  },
  {
    path: '/privacy',
    component: () => import('@/page/Privacy'),
    hidden: true
  },
  {
    path: '/protocol',
    component: () => import('@/page/Protocol'),
    hidden: true
  },
  // admin page home
  {
    path: '/admin',
    component: Layout,
    redirect: '/admin/dashboard',
    children: [{
      path: 'dashboard',
      name: '首页',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'dashboard', requireAuth: true }
      // 需要登录才能进入的页面可以增加一个requireAuth属性
    }]
  },

  // admin page （my）
  {
    path: '/newArticle',
    component: Layout,
    redirect: '/article/AllArticle',
    name: 'newArticle',
    meta: {
      title: '文章',
      icon: 'article',
      requireAuth: true
      // 需要登录才能进入的页面可以增加一个requireAuth属性
    },
    children: [
      {
        path: 'NewArticle',
        component: () => import('@/admin/NewArticle'),
        name: 'NewArticle',
        meta: { title: '创建文章', icon: 'el-icon-edit', requireAuth: true, noCache: false }
        // 需要登录才能进入的页面可以增加一个requireAuth属性
      }
    ]
  },
  {
    path: '/newResource',
    component: Layout,
    redirect: '/resource/Allresource',
    name: 'newresource',
    meta: {
      title: '资源',
      icon: 'resource',
      requireAuth: true
      // 需要登录才能进入的页面可以增加一个requireAuth属性
    },
    children: [
      {
        path: 'NewResource',
        component: () => import('@/admin/NewResource'),
        name: 'NewResource',
        meta: { title: '创建资源', icon: 'el-icon-edit-outline', requireAuth: true, noCache: false }
        // 需要登录才能进入的页面可以增加一个requireAuth属性
      }
    ]
  },
  {
    path: '/article',
    component: Layout,
    redirect: '/article/AllArticle',
    name: 'article',
    meta: {
      title: '内容管理',
      icon: 'list',
      requireAuth: true
      // 需要登录才能进入的页面可以增加一个requireAuth属性
    },
    children: [
      {
        path: 'edit/:id(\\d+)',
        component: () => import('@/admin/ArticleEdit'),
        name: 'EditArticle',
        meta: { title: '编辑文章', noCache: true, activeMenu: '/article/list', requireAuth: true },
        // 需要登录才能进入的页面可以增加一个requireAuth属性
        hidden: true
      },
      {
        path: 'AllArticle',
        component: () => import('@/admin/ArticleList'),
        name: 'AllArticle',
        meta: { title: '文章列表', icon: 'documentation', requireAuth: true }
        // 需要登录才能进入的页面可以增加一个requireAuth属性
      },
      {
        path: 'ArticleComment',
        component: () => import('@/admin/ArticleComment'),
        name: 'ArticleComment',
        meta: { title: '评论管理', icon: 'message', requireAuth: true }
        // 需要登录才能进入的页面可以增加一个requireAuth属性
      },
      {
        path: 'ArticleClass',
        component: () => import('@/admin/ArticleClass'),
        name: 'ArticleClass',
        meta: { title: '分类管理', icon: 'el-icon-receiving', requireAuth: true }
        // 需要登录才能进入的页面可以增加一个requireAuth属性
      }
    ]
  },
  {
    path: '/adplanet',
    component: Layout,
    redirect: '/adplanet/Allplanet',
    name: 'adplanet',
    meta: {
      title: '圈子管理',
      icon: 'el-icon-help',
      requireAuth: true
      // 需要登录才能进入的页面可以增加一个requireAuth属性
    },
    children: [
      {
        path: 'PlanetList',
        component: () => import('@/admin/PlanetList'),
        name: 'PlanetList',
        meta: { title: '圈子列表', icon: 'documentation', requireAuth: true }
        // 需要登录才能进入的页面可以增加一个requireAuth属性
      },
      {
        path: 'PlanetCommentList',
        component: () => import('@/admin/PlanetCommentList'),
        name: 'PlanetCommentList',
        meta: { title: '内容管理', icon: 'message', requireAuth: true }
        // 需要登录才能进入的页面可以增加一个requireAuth属性
      },
      {
        path: 'PlanetClass',
        component: () => import('@/admin/PlanetClass'),
        name: 'PlanetClass',
        meta: { title: '分类管理', icon: 'el-icon-upload', requireAuth: true }
        // 需要登录才能进入的页面可以增加一个requireAuth属性
      },
      {
        path: 'PlanetUser',
        component: () => import('@/admin/PlanetUser'),
        name: 'PlanetUser',
        meta: { title: '用户管理', icon: 'message', requireAuth: true }
        // 需要登录才能进入的页面可以增加一个requireAuth属性
      },
      // {
      //   path: 'ArticleClass',
      //   component: () => import('@/admin/ArticleClass'),
      //   name: 'ArticleClass',
      //   meta: { title: '积分管理', icon: 'el-icon-receiving', requireAuth: true }
      //   // 需要登录才能进入的页面可以增加一个requireAuth属性
      // },
            // {
      //   path: 'ArticleClass',
      //   component: () => import('@/admin/ArticleClass'),
      //   name: 'ArticleClass',
      //   meta: { title: '圈子设置', icon: 'el-icon-receiving', requireAuth: true }
      //   // 需要登录才能进入的页面可以增加一个requireAuth属性
      // }
    ]
  },
  {
    path: '/resource',
    component: Layout,
    redirect: '/resource/AllResource',
    name: 'resource',
    meta: {
      title: '资源管理',
      icon: 'el-icon-discover',
      requireAuth: true
      // 需要登录才能进入的页面可以增加一个requireAuth属性
    },
    children: [
      {
        path: 'edit/:id(\\d+)',
        component: () => import('@/admin/ResourceEdit'),
        name: 'EditResource',
        meta: { title: '编辑资源', noCache: true, activeMenu: '/resource/list', requireAuth: true },
        // 需要登录才能进入的页面可以增加一个requireAuth属性
        hidden: true
      },
      {
        path: 'AllResource',
        component: () => import('@/admin/ResourceList'),
        name: 'AllResource',
        meta: { title: '资源列表', icon: 'documentation', requireAuth: true }
        // 需要登录才能进入的页面可以增加一个requireAuth属性
      },
      {
        path: 'ResourceComment',
        component: () => import('@/admin/ResourceComment'),
        name: 'ResourceComment',
        meta: { title: '评论管理', icon: 'message', requireAuth: true }
        // 需要登录才能进入的页面可以增加一个requireAuth属性
      },
      {
        path: 'ResourceClass',
        component: () => import('@/admin/ResourceClass'),
        name: 'ResourceClass',
        meta: { title: '分类管理', icon: 'el-icon-receiving', requireAuth: true }
        // 需要登录才能进入的页面可以增加一个requireAuth属性
      }
    ]
  },
  {
    path: '/selfInfo',
    component: Layout,
    redirect: '/Manage/selfInfo',
    name: 'selfInfo',
    meta: {
      title: '用户管理',
      icon: 'user',
      requireAuth: true
      // 需要登录才能进入的页面可以增加一个requireAuth属性
    },
    children: [
      {
        path: 'AdminInfo',
        component: () => import('@/admin/AdminInfo'),
        name: '管理员信息',
        meta: { title: '管理员信息', icon: 'el-icon-s-custom' }
      },
      {
        path: 'RoleEdit',
        component: () => import('@/admin/RoleEdit'),
        name: '角色管理',
        meta: { title: '角色管理', icon: 'el-icon-s-check' }
      }
    ]
  },
  {
    path: '/StoreManage',
    component: Layout,
    redirect: '/Manage/StoreManage',
    name: 'StoreManage',
    meta: {
      title: '商城管理',
      icon: 'shopping',
      requireAuth: true
      // 需要登录才能进入的页面可以增加一个requireAuth属性
    },
    children: [
      {
        path: 'vipData',
        component: () => import('@/admin/StoreUser'),
        name: '商城总览',
        meta: { title: '商城总览', icon: 'el-icon-s-marketing' }
      },
      {
        path: 'vipUser',
        component: () => import('@/admin/StoreUser'),
        name: '会员管理',
        meta: { title: '会员管理', icon: 'el-icon-star-off' }
      },
      {
        path: 'OrderMent',
        component: () => import('@/admin/OrderMent'),
        name: '订单管理',
        meta: { title: '订单管理', icon: 'el-icon-s-shop' }
      },
      {
        path: 'PayMent',
        component: () => import('@/admin/PayMent'),
        name: '支付测试',
        meta: { title: '支付测试', icon: 'el-icon-s-promotion' }
      }
    ]
  },
  {
    path: '/sitting',
    component: Layout,
    redirect: '/article/AllArticle',
    name: 'sitting',
    meta: {
      title: '设置',
      icon: 'el-icon-s-tools',
      requireAuth: true
      // 需要登录才能进入的页面可以增加一个requireAuth属性
    },
    children: [
      {
        path: 'Webset',
        component: () => import('@/admin/WebSet'),
        name: '网站信息',
        meta: { title: '网站信息', icon: 'el-icon-info' }
      },
      {
        path: 'pictureUpload ',
        component: () => import('@/admin/PictureUpload'),
        name: '图片上传设置',
        meta: { title: '图片上传设置', icon: 'el-icon-upload' }
      }
    ]
  },
  // {
  //   path: '/swagger',
  //   component: Layout,
  //   redirect: '/admin/swagger',
  //   children: [{
  //     path: 'swagger',
  //     name: 'swagger',
  //     component: () => import('@/views/develop/swagger'),
  //     meta: { title: 'swagger', icon: 'dashboard', requireAuth: true }
  //     // 需要登录才能进入的页面可以增加一个requireAuth属性
  //   }]
  // },

  // {
  //   path: 'external-link',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'https://github.com/Thecosy/iceCMS',
  //       meta: { title: 'External Link', icon: 'link', requireAuth: true }
  //       // 需要登录才能进入的页面可以增加一个requireAuth属性
  //     }
  //   ]
  // },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  mode: 'history',
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
