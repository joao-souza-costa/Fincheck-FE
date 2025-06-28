import { PERIODS } from "../config/constants/dates";
import type { TRANSACTION_TYPE } from "../config/constants/transaction";
import { httpClient } from "./Client";
import type { PaymentTypes } from "../config/constants/paymentTypes";

export type GroupedEmployee = {
  _sum: {
    value: number,
    commission: number
  },
  employeeId: string
}

export type Transaction = {
  id: string;
  date: string | Date;
  name: string;
  value: number;
  commission: number;
  type: TRANSACTION_TYPE;
  paymentType: PaymentTypes;
  companyId?: string,
  employeeId?: string,
  serviceId?: string,
  appointmentId: string,
}

export interface CreateTransactionParams {
  id: string,
  employeeId?: string;
  appointmentId?: string;
  serviceId?: string;
  date: Date;
  name: string;
  value: number;
  paymentType: PaymentTypes;
  type: Transaction['type']
}

export type GetAllTransactionFilters = {
  date: string,
  period: PERIODS,
  employeeId?: string;
  type?: Transaction['type']
}

export default {
  create: async (params: Omit<CreateTransactionParams, 'id'>) => {
    const { data } = await httpClient.post('/transactions', params);
    return data;
  },
  getAll: async (filters: GetAllTransactionFilters) => {
    const { data } = await httpClient.get<{ groupedTransactions: GroupedEmployee[], transactions: Transaction[] }>('/transactions', {
      params: filters
    });
    return data;
  },
  update: async ({ id, ...params }: Omit<CreateTransactionParams, 'type'>) => {
    const { data } = await httpClient.patch<Transaction>(`/transactions/${id}`, params);
    return data;
  },
  delete: async (id: string) => {
    return httpClient.delete(`/transactions/${id}`);
  },
}