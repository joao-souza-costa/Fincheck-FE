import { httpClient } from "./Client";

interface User {
  name: string,
  email: string
}

export default {
  me: async () => {
    const { data } = await httpClient.get<User>('/employee')
    return data
  },
}