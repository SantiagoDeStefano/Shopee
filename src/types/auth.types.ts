import type { User } from "./user.types"
import { type SuccessResponse } from "./util.types"

export type AuthResponse = SuccessResponse<{
  access_token: string
  refresh_token: string
  user: User
}>