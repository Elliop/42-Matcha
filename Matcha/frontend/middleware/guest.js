/* const cookieValObject = { param1: 'value1', param2: 'value2' }
 
// server middleware
export default ({ app }) => {
  app.$cookies.set('cookie-name', 'cookie-value', {
    path: '/',
    maxAge: 60 * 60 * 24 * 7
  })
  app.$cookies.set('cookie-name', cookieValObject, {
    path: '/',
    maxAge: 60 * 60 * 24 * 7
  })
}
 
// client
this.$cookies.set('cookie-name', 'cookie-value', {
  path: '/',
  maxAge: 60 * 60 * 24 * 7
})
this.$cookies.set('cookie-name', cookieValObject, {
  path: '/',
  maxAge: 60 * 60 * 24 * 7
}) */