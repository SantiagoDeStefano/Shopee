import type { AuthResponse } from '../types/auth.types'
import http from '../utils/http'

export const registerAccount = (body: { email: string; password: string }) => http.post<AuthResponse>('/registerr', body)
