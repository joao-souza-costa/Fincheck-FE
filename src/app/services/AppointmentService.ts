import { PERIODS } from "../config/constants/dates";
import type { TRANSACTION_TYPE } from "../config/constants/transaction";
import { httpClient } from "./Client";
import type { PaymentTypes } from "../config/constants/paymentTypes";
import type { APPOINTMENT_STATUS } from "../config/constants/appointment";

export type EmployeeServicesAppointmentDto = {
  start: Date
  servicesId: string[]
  employeeId: string
  employeeName: string
}

export interface CreateAppointmentParams {
  id: string
  name: string;
  email: string
  phone: string;
  employees: EmployeeServicesAppointmentDto[]
  status: APPOINTMENT_STATUS;
}

export type GetAllAppointmentFilters = {
  date: string,
  period: PERIODS,
  employeeId?: string;
  status?: APPOINTMENT_STATUS
}

export default {
  create: async (params: Omit<CreateAppointmentParams, 'id'>) => {
    const { data } = await httpClient.post('/appointment', params);
    return data;
  },
  getAll: async (filters: GetAllAppointmentFilters) => {
    const { data } = await httpClient.get('/appointment/private', {
      params: filters
    });
    return data;
  },
  update: async ({ id, ...params }: CreateAppointmentParams) => {
    const { data } = await httpClient.patch(`/appointment/${id}`, params);
    return data;
  },
  delete: async (id: string) => {
    return httpClient.delete(`/appointment/${id}`);
  },
  confirmAppointment: async (id: string) => {
    return httpClient.get(`/appointment/${id}/confirm`);
  },
  cancelAppointment: async (id: string) => {
    return httpClient.get(`/appointment/${id}/cancel`);
  },
}