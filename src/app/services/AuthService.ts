import { httpClient } from "./Client";

export interface signUpParams {
  email: string,
  name: string,
  password: string,
  company: {
    name: string
    address: string
    description: string
    phone: string
    pixKey: string
  }
}

export interface signInParams {
  email: string,
  password: string
}

export interface updateNewPasswordParams {
  password: string,
  token: string
}


export default {
  signUp: async (params: signUpParams) => {
    const { data } = await httpClient.post<{ token: string }>('/auth/signup', params)
    return data
  },

  signIn: async (params: signInParams) => {
    const { data } = await httpClient.post<{ token: string }>('/auth/signin', params)
    return data
  },
  forgotPassword: async (params: Pick<signInParams, "email">,) => {
    const { data } = await httpClient.post('/auth/reset-password', params)
    return data
  },
  updateNewPassword: async ({ token, ...params }: updateNewPasswordParams) => {
    const { data } = await httpClient.put(`/auth/reset-password/${token}`, params)
    return data
  }
}