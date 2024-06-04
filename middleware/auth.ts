function isAuthorized() {
  // to be implemented
  return true
}

export default defineNuxtRouteMiddleware((to) => {
  if (!isAuthorized()) {
    return navigateTo({ name: 'sign-in', query: { redirect: encodeURIComponent(to.fullPath) } })
  }
})
