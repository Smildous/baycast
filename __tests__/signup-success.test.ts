import { beforeEach, describe, expect, it } from 'vitest'
import {
  SIGNUP_SUCCESS_FLAG,
  updateSignupSuccessFlag,
} from '@/lib/auth/signup-success'

describe('signup success flag', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('is not set before a successful auth result', () => {
    expect(localStorage.getItem(SIGNUP_SUCCESS_FLAG)).toBeNull()
  })

  it('sets the flag only when signup succeeds', () => {
    expect(updateSignupSuccessFlag(null)).toBe(true)
    expect(localStorage.getItem(SIGNUP_SUCCESS_FLAG)).toBe('true')
  })

  it('clears the flag and returns false when signup returns an auth error', () => {
    localStorage.setItem(SIGNUP_SUCCESS_FLAG, 'true')

    expect(updateSignupSuccessFlag({ message: 'Email already registered' })).toBe(false)
    expect(localStorage.getItem(SIGNUP_SUCCESS_FLAG)).toBeNull()
  })
})
