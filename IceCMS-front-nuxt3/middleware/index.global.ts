export default defineNuxtRouteMiddleware((to, from) => {
    console.log('路由守卫：', to, from)
  })
  