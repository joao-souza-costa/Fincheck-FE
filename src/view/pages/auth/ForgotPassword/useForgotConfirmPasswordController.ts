import { LOGIN } from '@/app/config/constants/route'
import AuthService, { type updateNewPasswordParams } from '@/app/services/AuthService'
import { toast } from '@/app/utils/toast'
import { useMutation } from '@tanstack/vue-query'
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import * as Yup from 'yup'

export function useForgotConfirmPasswordController() {

  const route = useRoute()
  const router = useRouter()
  const successRequest = ref<boolean>(false)

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (values: updateNewPasswordParams) => {
      return AuthService.updateNewPassword(values)
    }
  })

  async function onSubmit(values: any) {
    const params = {
      token: route.params.token as string,
      password: values.password
    }

    return await mutateAsync(params)
      .then(() => {
        toast.success('Senha resetada com sucesso!')
        router.push(LOGIN)
      })
      .catch((e) => console.error(e))
  }

  const schema = Yup.object().shape({
    password: Yup.string()
      .min(8, 'Senha deve ter pelo menos 8 digitos').required('Senha é obrigatória'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], 'As senhas precisam ser iguais')
  })

  return {
    schema,
    onSubmit,
    isLoading: isPending,
    successRequest
  }
}