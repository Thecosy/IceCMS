import router from './router'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { checkToken, CheckAdmin } from '@/api/checkToken'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

// const whiteList = ['/login', '/404', '/']  no redirect whitelist

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requireAuth)) { // 判断该路由是否需要登录权限
    // console.log('need 登陆')
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (to.path.startsWith('/login')) {
      window.localStorage.removeItem('access-admin')
      next()
    } else {
      const admin = JSON.parse(window.localStorage.getItem('access-admin'))
      if (!admin) {
        next({ path: '/login' })
      } else {
        // console.log('检验token合法')
        const admin = JSON.parse(window.localStorage.getItem('access-admin'))
        // 检验token合法性
        checkToken(admin.data.token).then(respose => {
          if (respose.data !== true) {
            // console.log('检验token合法失败')
            next({ path: '/error' })
          }
        })
        //检测登录用户的权限
        // console.log(admin.data.userid)
        CheckAdmin(admin.data.userid).then(respose => {
          // console.log(respose,2)
          if (respose.data.code !== 200) {
            console.log('权限检验失败')
            next({ path: '/error' })
          }
        })
        next()
      }
    }

    // if (to.matched.length === 0) {
    //   next({name: '404'}) // 判断此跳转路由的来源路由是否存在，存在的情况跳转到来源路由，否则跳转到404页面
    // }
  } else {
    next() // 主页面通过的路口
  }
})
router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
