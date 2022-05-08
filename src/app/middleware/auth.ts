import {getApps, initializeApp} from "firebase/app";
import {getAuth, onAuthStateChanged} from "@firebase/auth";

if (getApps().length === 0) {
    const runtimeConfig = useRuntimeConfig()
// Your web app's Firebase configuration
    const firebaseConfig = {
        apiKey: runtimeConfig.FIREBASE_API_KEY,
        authDomain: runtimeConfig.FIREBASE_AUTH_DOMAIN,
        projectId: runtimeConfig.FIREBASE_PROJECT_ID,
        storageBucket: runtimeConfig.FIREBASE_STORAGE_BUCKET,
        messagingSenderId: runtimeConfig.FIREBASE_MESSAGING_SENDER_ID,
        appId: runtimeConfig.FIREBASE_APP_ID,
    };
    initializeApp(firebaseConfig);
}

export default defineNuxtRouteMiddleware((to, from) => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
        if (user === null) {
            return navigateTo('/signIn')
        }
    });
})
