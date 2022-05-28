import { reactive, toRefs } from 'vue'
import {EmailInput, SignUpInput, SignInInput, NewPasswordInput} from '~/composables/types/formInput'
import {FirebaseAuthError} from '~/composables/types/firebase'
import {
  getAuth,
  sendSignInLinkToEmail,
  signInWithEmailLink,
  updateProfile,
  updatePassword,
  User,
  signInWithEmailAndPassword,
  signOut,
  Unsubscribe,
  onAuthStateChanged,
  sendPasswordResetEmail,
  verifyPasswordResetCode,
  confirmPasswordReset,
  TwitterAuthProvider,
  signInWithPopup,
} from '@firebase/auth'
import { useState } from '#app'

// 状態
export const useCurrentUserState = () => useState<User | null>('CurrentUser', () => null)
// default callback
const defaultSuccessCallback: () => void = () => console.debug('succeeded')
const defaultErrorCallback: (error: Error) => void = (error) => console.debug(JSON.stringify(error))

export const useAuth = async () => {
  const currentUser = useCurrentUserState()
  await new Promise<Unsubscribe>((resolve) => {
    const unsubscribe = onAuthStateChanged(getAuth(), (user) => {
      currentUser.value = user
      resolve(unsubscribe)
    })
  })
}

export const useSendSignLink = (onSuccess = defaultSuccessCallback, onError = defaultErrorCallback) => {
  const formInput = reactive<EmailInput>({
    email: '',
  })

  const sendSignInLink = async () => {
    const auth = getAuth()
    const url = new URL(window.location.origin)
    url.pathname = '/auth/action'
    try {
      await sendSignInLinkToEmail(auth, formInput.email, {
        url: url.toString(),
        handleCodeInApp: true,
      })
      // The link was successfully sent. Inform the user.
      // Save the email locally so you don't need to ask the user for it again
      // if they open the link on the same device.
      // ...
      onSuccess()
    } catch (error) {
      console.log(error)
      onError({
        ...(error as Error),
        message: 'エラーが起きました',
      })
    }
  }

  return { ...toRefs(formInput), sendSignInLink }
}

export const useTwitterSignUp = (onSuccess: (user: User) => void = defaultSuccessCallback, onError = defaultErrorCallback) => {
  const twitterSignUp = async () => {
    const provider = new TwitterAuthProvider()
    const auth = getAuth()
    try {
      const result = await signInWithPopup(auth, provider)
      //const credential = TwitterAuthProvider.credentialFromResult(result);
      const user = result.user;
      onSuccess(user)
      // The signed-in user info.
    } catch (e) {
      onError({
        ...(e as Error)
      })
    }
  }

  return {twitterSignUp}
}

export const useSignUp = (onSuccess: (user: User) => void = defaultSuccessCallback, onError = defaultErrorCallback) => {
  const formInputs = reactive<SignUpInput>({
    email: '',
    password: '',
    userName: '',
  })

  const signUp = async () => {
    try {
      const auth = getAuth()
      const { user } = await signInWithEmailLink(auth, formInputs.email)
      await updateProfile(user, {
        displayName: formInputs.userName,
      })
      // パスワードを設定する
      await updatePassword(user, formInputs.password)
      await user.getIdToken(true)
      onSuccess(user)
    } catch (error) {
      console.log(error)
      onError({
        ...(error as Error),
        message: 'エラーが起きました',
      })
    }
  }

  return { ...toRefs(formInputs), signUp }
}

export const useSignIn = (onSuccess: (user: User) => void = defaultSuccessCallback, onError = defaultErrorCallback) => {
  const formInputs = reactive<SignInInput>({
    email: '',
    password: '',
  })

  const signIn = async () => {
    const auth = getAuth()
    try {
      const { user } = await signInWithEmailAndPassword(auth, formInputs.email, formInputs.password)
      onSuccess(user)
    } catch (error) {
      console.debug(JSON.stringify(error))
      onError({ ...(error as Error), message: 'メールアドレスまたはパスワードが間違っています。' })
    }
  }

  return {
    ...toRefs(formInputs),
    signIn,
  }
}

export const useSignOut = (onSuccess = defaultSuccessCallback, onError = defaultErrorCallback) => {
  return {
    signOut: async () => {
      const auth = getAuth()
      const currentUser = useCurrentUserState()
      try {
        await signOut(auth)
        currentUser.value = null
        onSuccess()
      } catch (error) {
        console.debug(JSON.stringify(error))
        onError({ ...(error as Error), message: '予期しないエラーが発生しました。' })
      }
    },
  }
}

export const useResetPasswordLink = (onSuccess = defaultSuccessCallback, onError = defaultErrorCallback) => {
  const formInput = reactive<EmailInput>({
    email: '',
  })
  const sendResetPasswordLink = async () => {
    const auth = getAuth()
    try {
      await sendPasswordResetEmail(auth, formInput.email)
      onSuccess()
    } catch (error) {
      console.debug(JSON.stringify(error))
      onError({
        ...(error as Error),
        message: 'エラーが起きました',
      })
    }
  }

  return {...toRefs(formInput), sendResetPasswordLink};
}

export const useResetPassword = (oobCode:string, onSuccess = defaultSuccessCallback, onError = defaultErrorCallback) => {
  const formInputs = reactive<NewPasswordInput>({
    email: '',
    password: '',
    confirm: '',
  })
  const resetPassword = async () => {
    if (formInputs.password != formInputs.confirm) {
      onError(new Error('パスワードが確認用パスワードと一致していません。'))
      return
    }
    const auth = getAuth()
    try {
      const verifiedEmail = await verifyPasswordResetCode(auth, oobCode);
      // 入力されたメールアドレスが正しいものかどうか検証する。
      if (verifiedEmail != formInputs.email) {
        onError(new Error('メールアドレスが不正です。'))
        return
      }
    } catch(e) {
      onError(new Error('パスワード変更の有効期限が切れています。ログイン画面に戻って、もう一度パスワードを設定を行ってください。'))
    }

    try {
      await confirmPasswordReset(auth, oobCode, formInputs.password)
      onSuccess()
    } catch(e) {
      onError(new Error('エラーが起きました。ログイン画面に戻って、もう一度パスワードを設定を行ってください。'))
    }
  }

  return {...toRefs(formInputs), resetPassword}
}
