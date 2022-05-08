import {reactive, toRefs} from "vue";
import {EmailInput, SignUpInput} from "~/composables/types/formInput";
import {getAuth, sendSignInLinkToEmail, signInWithEmailLink, updateProfile, updatePassword, User} from "@firebase/auth";

// default callback
const defaultSuccessCallback: () => void = () => console.debug('succeeded')
const defaultErrorCallback: (error: Error) => void = (error) => console.debug(JSON.stringify(error))

export const useSendSignLink = (onSuccess = defaultSuccessCallback, onError = defaultErrorCallback) => {
    const formInput = reactive<EmailInput>({
        email: ''
    })

    const sendSignInLink = async() => {
        const auth = getAuth()
        const url = new URL(window.location.origin)
        url.pathname = '/auth/action'
        console.log('url.toString()');
        console.log(url.toString());
        try {
            await sendSignInLinkToEmail(auth, formInput.email, {
                url: url.toString(),
                handleCodeInApp: true
            })
            // The link was successfully sent. Inform the user.
            // Save the email locally so you don't need to ask the user for it again
            // if they open the link on the same device.
            // ...
            onSuccess()
        } catch(error) {
            console.log(error);
            onError({
                ...(error as Error),
                message: 'エラーが起きました'
            })
        }
    }

    return {...toRefs(formInput), sendSignInLink}
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
            // ユーザにプロフィールを設定する（この処理が終わったらcurrentUserのプロフィールを参照してよい）
            await updateProfile(user, {
                displayName: formInputs.userName,
                photoURL: '/img/mypage/user_icon.gif',
            })
            // パスワードを設定する（この処理が終わったらメール+パスワードでログインできるようになる）
            await updatePassword(user, formInputs.password)
            await user.getIdToken(true)
            onSuccess(user)
        } catch (error) {
            console.log(error);
            onError({
                ...(error as Error),
                message: 'エラーが起きました'
            })
        }
    }

    return {...toRefs(formInputs), signUp}
}

export const validateAuth = () => {
    const auth = getAuth()
    console.log('auth');
    console.log(auth);
    console.log(auth.currentUser);
    if (auth.currentUser === null) {
        return false;
    }

    return true;
}