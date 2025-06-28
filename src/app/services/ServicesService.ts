import type { TRANSACTION_TYPE } from "../config/constants/transaction";
import { httpClient } from "./Client";

export interface servicesResponse {
  id: string
  name: string,
  icon: string
  type: TRANSACTION_TYPE
}

interface categoryParams extends Omit<servicesResponse, "id"> { }

export default {
  getAll: async () => {
    const { data } = await httpClient.get<servicesResponse[]>('/services')
    return data.reverse()
  },
  create: async (params: categoryParams) => {
    const { data } = await httpClient.post<servicesResponse>('/services', params)
    return data
  },
  update: async ({ id, ...params }: servicesResponse) => {
    const { data } = await httpClient.put<servicesResponse>(`/services/${id}`, params)
    return data
  },
  delete: async (id: string) => {
    const { data } = await httpClient.delete(`/services/${id}`)
    return data
  },
}