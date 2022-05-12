import { navigateTo } from '#app'
import { useAuth, useCurrentUserState } from '~/composables/auth'

export default defineNuxtRouteMiddleware(async (to) => {
  const unAuthRoutes: Array<string> = ['sign-in']
  if (!unAuthRoutes.includes(to.name)) {
    const currentUser = useCurrentUserState()
    if (currentUser.value !== null) {
      return
    }
    // 無駄に処理をしないようにここに配置
    await useAuth()
    if (currentUser.value === null) {
      return navigateTo('/sign-in')
    }
  }
})
