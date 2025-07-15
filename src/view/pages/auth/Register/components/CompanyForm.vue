<template>
  <Form
    @submit="handleSubmit"
    :validation-schema="schema"
    class="mt-[60px] flex flex-col items-center gap-4"
  >
    <base-input type="text" id="name" name="name" placeholder="Nome da empresa *" />
    <base-input type="text" id="description" name="description" placeholder="descrição" />
    <base-input type="text" id="address" name="address" placeholder="Endereço completo *" />
    <base-input type="tel" id="phone" name="phone" placeholder="Whatsapp*" />
    <base-input type="text" id="pixKey" name="pixKey" placeholder="Chave Pix*" />

    <base-button type="submit" class="w-full"> Criar conta </base-button>
  </Form>
</template>

<script setup lang="ts">
import * as Yup from 'yup'
import { Form } from 'vee-validate'
import BaseInput from '@/view/components/BaseInput.vue'
import BaseButton from '@/view/components/BaseButton.vue'

type iEmits = {
  (e: 'create-account', v: any): void
}

defineProps<{ isLoading: boolean }>()

const emit = defineEmits<iEmits>()

const schema = Yup.object().shape({
  name: Yup.string().required(),
  description: Yup.string(),
  address: Yup.string().required(),
  phone: Yup.number()
    .required()
    .typeError('Valor precisa ser um número sem caracteres ex: 11912345678')
    .test('len', 'Telefone inválido', (val) => String(val).length === 11),
  pixKey: Yup.string().required()
})

function handleSubmit(v: any) {
  emit('create-account', v)
}
</script>
