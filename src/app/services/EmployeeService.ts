//Reformular banck accounts to employee

import type { EMPLOYEE_STATUS, EMPLOYEE_TYPE } from "../config/constants/employee";
import { httpClient } from "./Client";
import { type Transaction } from "./TransactionService";
export interface employeeParams {
  name: string,
  initialBalance: string,
  color: string
  type: 'CHECKING' | 'INVESTMENT' | 'CASH'
}

export interface UpdateEmployeeParams extends employeeParams {
  id: string
}

export type employeesResponse = {
  id: string
  name: string
  commission: number
  companyId: string
  color: string
  phone: string,
  OpeningHours: Record<string, string>[]
  status: EMPLOYEE_STATUS,
  type: EMPLOYEE_TYPE
}

export default {
  create: async (params: employeeParams) => {
    const { data } = await httpClient.post('/employee', params)
    return data
  },
  getAll: async () => {
    const { data } = await httpClient.get<employeesResponse[]>('/employee/all')
    return data
  },
  update: async ({ id, ...params }: UpdateEmployeeParams) => {
    const { data } = await httpClient.patch(`/employee/${id}`, params)
    return data
  },
  delete: async (id: string) => {
    const { data } = await httpClient.delete(`/employee/${id}`)
    return data
  },

}