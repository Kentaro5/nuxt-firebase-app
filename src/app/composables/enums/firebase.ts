/**
 * https://firebase.google.com/docs/reference/js/v8/firebase.auth.AuthError?hl=ja
 */
export const enum FirebaseAuthErrors {
    AccountExistsWithDifferentCredential = 'auth/account-exists-with-different-credential',
    CredentialAlreadyInUse = 'auth/credential-already-in-use',
    EmailAlredyInUse = 'auth/email-already-in-use',
}

/**
 * https://firebase.google.com/docs/reference/js/v8/firebase.auth.Auth?hl=ja#signinwithpopup
 */
export const enum FirebaseAuthSignInWithPopupErrors {
    CredentialAlreadyInUse = 'auth/credential-already-in-use',
    EmailAlreadyInUse = 'auth/email-already-in-use',
    DomainConfigRequired = 'auth/auth-domain-config-required',
    CancelledPopUpRequest = 'auth/cancelled-popup-request',
    OperationNotAllowed = 'auth/operation-not-allowed',
    PopUpBlocked = 'auth/popup-blocked',
    PopUpClosedByUser = 'auth/popup-closed-by-user',
    UnauthorizedDomain = 'auth/unauthorized-domain'
}
