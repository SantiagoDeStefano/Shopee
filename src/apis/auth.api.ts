import type { AuthResponse } from '../types/auth.types'
import http from '../utils/http'

const authApi = {
  registerAccount: (body: { email: string; password: string }) => {
    return http.post<AuthResponse>('/register', body)
  },
  loginAccount: (body: { email: string; password: string }) => {
    return http.post<AuthResponse>('/login', body)
  },
  logout: () => {
    return http.post('/logout')
  }
}

export default authApi