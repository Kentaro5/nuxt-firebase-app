import { getApps, initializeApp } from 'firebase/app'
import { getAuth, onAuthStateChanged, Unsubscribe, User } from '@firebase/auth'
import { navigateTo, useState } from '#app'

export default defineNuxtRouteMiddleware(async (to, from) => {
  const unAuthRoutes: Array<string> = ['signIn']
  console.log('unAuthRoutes')
  if (!unAuthRoutes.includes(to.name)) {
    //const { provide, currentUser } = await useCurrentUser()
    console.log('StartUseCurrentUser')
    const currentUser = useState<User>('CurrentUser', null)
    await new Promise<Unsubscribe>((resolve) => {
      const unsubscribe = onAuthStateChanged(getAuth(), (user) => {
        currentUser.value = user
        console.log('FFFFFFFF')
        console.log(currentUser.value)
        if (currentUser.value === null) {
          console.log('currentUser')
          return navigateTo('/signIn')
        }
        resolve(unsubscribe)
      })
    })
  }
  console.log('EnduseCurrentUser')
})

export const useCurrentUser = () => {
  const currentUser = useState<User>('CurrentUser', null)
  const provideCurrentUser = async () => {
    return new Promise<Unsubscribe>((resolve) => {
      const unsubscribe = onAuthStateChanged(getAuth(), (user) => {
        currentUser.value = user
        resolve(unsubscribe)
      })
    })
  }
  return { currentUser, provide: provideCurrentUser }
}
