import type { User } from "./user.types"
import { type ResponseApi } from "./util.types"

export type AuthResponse = ResponseApi<{
  access_token: string
  refresh_token: string
  user: User
}>