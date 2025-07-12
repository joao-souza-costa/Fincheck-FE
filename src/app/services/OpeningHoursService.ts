import type { DAYS_OF_WEEK } from "../config/constants/dates";
import { httpClient } from "./Client";

export interface openingHoursResponse {
  id: string,
  employeeId: string;
  weekday: DAYS_OF_WEEK;
  openHourInMinutes: number;
  closeHourInMinutes: number;
  interval: number
}

interface openingHoursParams extends Omit<openingHoursResponse, "id"> { }

export default {
  getAll: async () => {
    const { data } = await httpClient.get<openingHoursResponse[]>('company/opening-hours')
    return data.reverse()
  },
  create: async (params: openingHoursParams) => {
    const { data } = await httpClient.post<openingHoursResponse>('company/opening-hours', params)
    return data
  },
  update: async ({ id, ...params }: openingHoursResponse) => {
    const { data } = await httpClient.patch<openingHoursResponse>(`company/opening-hours/${id}`, params)
    return data
  },
  delete: async (id: string) => {
    const { data } = await httpClient.delete(`company/opening-hours/${id}`)
    return data
  },
}