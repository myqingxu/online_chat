module.exports = router => {
  router.beforeEach((to,from, next) => {
    document.title = to.meta.title || '聊天'

    const needToLogin = to.meta.needLogin

    const token = window.localStorage.getItem('token')

    if (!needToLogin) next()

    if (needToLogin && token) next()
    
    else next({ path: '/login' })
  })
}