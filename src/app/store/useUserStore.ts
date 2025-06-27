import { defineStore } from "pinia"
import { useRouter } from "vue-router"
import { ref, readonly } from "vue"
import { accessTokenKey } from "../config/constants/localStorageKeys"
import { DASHBOARD, LOGIN } from "@/app/config/constants/route"
import { useQuery } from "@tanstack/vue-query"
import userService from "../services/UserService"

export const useUserStore = defineStore('user', () => {
  const router = useRouter()
  const accessToken = ref<boolean>(Boolean(localStorage.getItem(accessTokenKey)))

  const { data: user, isFetching, isSuccess } = useQuery({
    queryKey: ['users', 'me'],
    queryFn: async () => userService.me(),
    enabled: accessToken,
    staleTime: Infinity
  })

  const signin = (token: string): void => {
    localStorage.setItem(accessTokenKey, token)
    accessToken.value = Boolean(token)
    router.push(DASHBOARD)
  }

  const signout = (): void => {
    localStorage.removeItem(accessTokenKey)
    accessToken.value = Boolean(false)
    router.push(LOGIN)
  }

  return {
    user: readonly(user),
    accessToken,
    isFetching,
    isSuccess,
    signin,
    signout
  }
})