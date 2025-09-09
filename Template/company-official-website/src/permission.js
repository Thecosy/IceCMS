import router from './router'
import store from './store'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import {getToken} from '@/utils/auth' // get token from cookie

function getPageTitle(pageTitle) {
    const title = '官网'
    if (pageTitle) {
        return `${title} - ${pageTitle}`
    }
    return `${title}`
}

NProgress.configure({showSpinner: false}) // NProgress Configuration

const whiteList = ['/login', '/register'] // no redirect whitelist

router.beforeEach(async (to, from, next) => {
    NProgress.start()
    document.title = getPageTitle(to.meta.title)
    next()
    // const hasToken = getToken()
    // if (hasToken) {
    //     if (to.path === '/login') {
    //         next({path: '/home'})
    //         NProgress.done()
    //     } else {
    //         const hasRoles = store.getters.roles && store.getters.roles.length > 0
    //         if (hasRoles) {
    //             next()
    //         } else {
    //             try {
    //                 const {roles} = await store.dispatch('user/getInfo')
    //                 // const accessRoutes = await store.dispatch('permission/generateRoutes', roles)
    //                 // router.addRoutes(accessRoutes)
    //                 next({...to, replace: true})
    //             } catch (error) {
    //                 await store.dispatch('user/resetToken')
    //                 console.log(error, '错误信息~')
    //                 next('/login')
    //                 NProgress.done()
    //             }
    //         }
    //     }
    // } else {
    //     if (whiteList.indexOf(to.path) !== -1) {
    //         next()
    //     } else {
    //         next('/login')
    //         NProgress.done()
    //     }
    // }
})

router.afterEach(() => {
    NProgress.done()
})
