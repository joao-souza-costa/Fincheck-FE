<template>
  <Form
    @submit="handleSubmit"
    :validation-schema="schema"
    class="mt-[60px] flex flex-col items-center gap-4"
  >
    <base-input type="text" id="name" name="name" placeholder="Nome" />
    <base-input type="email" id="email" name="email" placeholder="Email" />
    <base-input type="password" id="password" name="password" placeholder="Senha" />
    <base-input
      type="password"
      id="password"
      name="confirmPassword"
      placeholder="Confirmar senha"
    />

    <base-button type="submit" class="w-full"> Proximo </base-button>
  </Form>
</template>

<script setup lang="ts">
import * as Yup from 'yup'
import { Form } from 'vee-validate'
import BaseInput from '@/view/components/BaseInput.vue'
import BaseButton from '@/view/components/BaseButton.vue'

type iEmits = {
  (e: 'next', v: any): void
}

const emit = defineEmits<iEmits>()

function handleSubmit(v: any) {
  emit('next', v)
}

const schema = Yup.object().shape({
  name: Yup.string(),
  email: Yup.string().email('Informe um email válido').required('Email é obrigatório'),
  password: Yup.string()
    .min(8, 'Senha deve ter pelo menos 8 digitos')
    .required('Senha é obrigatória'),
  confirmPassword: Yup.string().oneOf([Yup.ref('password')], 'As senhas precisam ser iguais')
})
</script>
