import { useMutation } from '@tanstack/vue-query'
import AuthService, { type signUpParams } from '@/app/services/AuthService'
import { useUserStore } from '@/app/store/useUserStore'
import { useRouter } from 'vue-router'
import { DASHBOARD } from '@/app/config/constants/route'
import { toast } from '@/app/utils/toast'
import { ref } from 'vue'

export function useRegisterController() {
  const userStore = useUserStore()
  const payload = ref<signUpParams | null>(null)
  const isLoading = ref(false)

  function onSubmit() {
    if (payload.value === null) {
      throw "Payload mal formed"
    }

    isLoading.value = true

    return AuthService.signUp(payload.value)
      .then(({ token }) => userStore.signin(token))
      .catch((e) => toast.error('Credenciais inválidas'))
      .finally(() => isLoading.value = false)
  }

  return {
    onSubmit,
    isLoading,
    payload
  }

}