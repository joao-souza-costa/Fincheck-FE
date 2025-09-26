import type { EMPLOYEE_TYPE } from "../config/constants/employee";
import { httpClient } from "./Client";

interface User {
  name: string,
  email: string,
  type: EMPLOYEE_TYPE,
  id: string,
}

export default {
  me: async () => {
    const { data } = await httpClient.get<User>('/employee')
    return data
  },
}