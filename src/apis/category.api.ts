import { type Category } from "../types/category.types"
import { type SuccessResponse } from "../types/util.types"
import http from "../utils/http"

const URL = '/categories'

const categoryApi = {
  getCategories() {
    return http.get<SuccessResponse<Category[]>>(URL)
  }
}

export default categoryApi