import { defineStore } from "pinia"
import { useRouter } from "vue-router"
import { ref, readonly, computed } from "vue"
import { accessTokenKey } from "../config/constants/localStorageKeys"
import { DASHBOARD, LOGIN } from "@/app/config/constants/route"
import { useQuery, useQueryClient } from "@tanstack/vue-query"
import userService from "../services/UserService"
import { EMPLOYEE_TYPE } from "../config/constants/employee"

export const useUserStore = defineStore('user', () => {
  const router = useRouter()
  const accessToken = ref<boolean>(Boolean(localStorage.getItem(accessTokenKey)))
  const queryClient = useQueryClient()

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
    accessToken.value = false
    queryClient.removeQueries()
    router.push(LOGIN)
  }

  const isOwner = computed(() => user.value?.type === EMPLOYEE_TYPE.OWNER)
  
  return {
    user: readonly(user),
    isOwner,
    accessToken,
    isFetching,
    isSuccess,
    signin,
    signout
  }
})