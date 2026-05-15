export const SIGNUP_SUCCESS_FLAG = 'baycast_just_signed_up'

interface AuthResultError {
  message?: string
}

export function updateSignupSuccessFlag(error: AuthResultError | null | undefined): boolean {
  if (error) {
    localStorage.removeItem(SIGNUP_SUCCESS_FLAG)
    return false
  }

  localStorage.setItem(SIGNUP_SUCCESS_FLAG, 'true')
  return true
}
