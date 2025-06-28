import AuthService from '@/app/services/AuthService'
import type { signInParams } from '@/app/services/AuthService'
import { useMutation } from '@tanstack/vue-query'
import * as Yup from 'yup'
import { useUserStore } from '@/app/store/useUserStore'

export function useLoginController() {
  const userStore = useUserStore()

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (values: signInParams) => {
      return AuthService.signIn(values)
    }
  })

  async function onSubmit(values: any) {
    try {
      const { token } = await mutateAsync(values)
      userStore.signin(token) 
    } catch (e) {
      console.error(e)
    }
  }

  const schema = Yup.object().shape({
    email: Yup.string().email('Informe um email válido').required('Email é obrigatório'),
    password: Yup.string()
      .min(8, 'Senha deve ter pelo menos 8 digitos').required('Senha é obrigatória')
  })

  return {
    schema,
    onSubmit,
    isLoading: isPending
  }
}