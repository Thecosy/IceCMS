import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)


const routes = [
    {
        path: '/',
        redirect: '/home',
    },
    {
        path: '/ProductDetail/:id',
        name: 'ProductDetail',
        component: () => import('@/views/front/components/ProductDetail.vue'),
        props: true
    },
    {
        path: '/login',
        component: () => import('@/views/login/login.vue'),
        meta: {
            title: '登录'
        }
    },
    {
        path: '/register',
        component: () => import('@/views/login/register.vue'),
        meta: {
            title: '注册'
        }
    },
    {
        path: '/home',
        name: 'Home',
        component: () => import('@/views/front/Home.vue'),
        meta: {
            title: '首页'
        }
    },
    {
        path: '/productService',
        name: 'ProductService',
        component: () => import('@/views/front/ProductService.vue'),
        meta: {
            title: '产品与服务'
        }
    },
    {
        path: '/business',
        name: 'Business',
        component: () => import('@/views/front/Business.vue'),
        meta: {
            title: '招商'
        }
    },
    {
        path: '/about',
        name: 'About',
        component: () => import('@/views/front/About.vue'),
        meta: {
            title: '关于我们'
        }
    },
    {
        path: '/admin',
        name: 'Admin',
        component: () => import('@/views/admin/Index.vue'),
        meta: {
            title: '后台首页'
        },
        children: [
            {
                path: '/info',
                name: 'Info',
                component: () => import('@/views/admin/Info.vue'),
                meta: {
                    title: '基本信息'
                }
            },
            {
                path: '/Brands',
                name: 'Brands',
                component: () => import('@/views/admin/Brands.vue'),
                meta: {
                    title: '品牌配置'
                }
            },
            {
                path: '/Products',
                name: 'Products',
                component: () => import('@/views/admin/Products.vue'),
                meta: {
                    title: '商品配置'
                }
            },
            {
                path: '/Carousel',
                name: 'Carousel',
                component: () => import('@/views/admin/Carousel.vue'),
                meta: {
                    title: '轮播图配置'
                }
            },
            {
                path: '/ProductsCarousels',
                name: 'ProductsCarousels',
                component: () => import('@/views/admin/ProductsCarousels.vue'),
                meta: {
                    title: '轮播图配置'
                }
            },
            {
                path: '/ProductsWaterfall',
                name: 'ProductsWaterfall',
                component: () => import('@/views/admin/ProductsWaterfall.vue'),
                meta: {
                    title: '瀑布流商品配置'
                }
            },
            {
                path: '/BrandAuthorizationCertificate',
                name: 'BrandAuthorizationCertificate',
                component: () => import('@/views/admin/BrandAuthorizationCertificate.vue'),
                meta: {
                    title: '品牌授权证书配置'
                }
            },
        ]
    },
]

const router = new VueRouter({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes
})

export default router

export function resetRouter() {
    router.push({ path: '/login' })
}
