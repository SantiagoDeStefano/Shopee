import type { User } from "./user.types"
import { type ResponseApi } from "./util.types"

export type AuthResponse = ResponseApi<{
  access_token: string
  expires: number
  refresh_token: string
  expires_in: number
  user: User
}>