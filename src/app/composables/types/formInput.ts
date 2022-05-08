export type EmailInput = {
    email: string
}

type PasswordInput = {
    password: string
}

type UserNameInput = {
    userName: string
}

export const SignUpInput = EmailInput & PasswordInput & UserNameInput

export const SignInInput = EmailInput & PasswordInput
