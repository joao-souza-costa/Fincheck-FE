import type { SERVICES_PRICING_MODE } from "../config/constants/services";
import { httpClient } from "./Client";

export interface servicesResponse {
  id: string
  name: string,
  pricingMode: SERVICES_PRICING_MODE
  baseValue: number,
  duration: number
  value?: number,
  employees: {
    name: any; id: string 
}[]
  employee: string
}

interface servicesParams extends Omit<servicesResponse, "id"> { }

export default {
  getAll: async () => {
    const { data } = await httpClient.get<servicesResponse[]>('/services')
    return data.reverse()
  },
  create: async (params: servicesParams) => {
    const { data } = await httpClient.post<servicesResponse>('/services', params)
    return data
  },
  update: async ({ id, ...params }: servicesResponse) => {
    const { data } = await httpClient.patch<servicesResponse>(`/services/${id}`, params)
    return data
  },
  delete: async (id: string) => {
    const { data } = await httpClient.delete(`/services/${id}`)
    return data
  },
}