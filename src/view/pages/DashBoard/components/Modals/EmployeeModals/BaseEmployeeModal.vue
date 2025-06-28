<template>
  <base-modal :title="modalLabel" open @update:open="$emit('close')">
    <template #right-action>
      <slot name="right-action" />
    </template>
    <Form
      @submit="(v) => emit('submit', v)"
      :initial-values="initialValues"
      :validation-schema="schema"
      class="mt-5"
    >
      <div class="flex flex-col gap-4">
        <base-input type="text" id="name" name="name" placeholder="Nome" />
        <base-input type="email" id="email" name="email" placeholder="Email" />
        <base-input
          type="text"
          id="commission"
          name="commission"
          placeholder="Porcentagem da comissão"
        />
        <base-input type="tel" id="phone" name="phone" placeholder="Whatsapp" />
        <base-input-select
          placeholder="Tipo"
          name="type"
          :options="options"
        />
        <colors-dropdown name="color" />
        <slot />
      </div>
    </Form>
  </base-modal>
</template>

<script setup lang="ts">
import * as Yup from 'yup'
import { Form, type GenericObject } from 'vee-validate'
import BaseModal from '@/view/components/BaseModal.vue'
import BaseInput from '@/view/components/BaseInput.vue'
import ColorsDropdown from '@/view/components/ColorsDropdown.vue'
import type { employeesResponse } from '@/app/services/EmployeeService'
import BaseInputSelect from '@/view/components/BaseInputSelect.vue'

type iProps = {
  modalLabel: string
  buttonLabel?: String
  initialValues?: employeesResponse
}

type tEmit = {
  close: []
  submit: [v: GenericObject]
}

const options = [
  { value: 'EMPLOYEE', label: 'Funcionário' },
  { value: 'OWNER', label: 'Administrador' }
]

defineProps<iProps>()

const emit = defineEmits<tEmit>()


const schema = Yup.object().shape({
  email: Yup.string().email('Informe um email válido').required('Email é obrigatório'),
  name: Yup.string().required('Nome é obrigatório'),
  commission: Yup.number()
    .typeError('Comissão é obrigatória e precisa ser apenas números')
    .required('Comissão é obrigatória')
    .integer("Porcentagem precisa ser um numero inteiro")
    .min(0, 'Comissão não pode ser negativa')
    .max(100, 'Comissão maxima de 100%'),
  phone: Yup.number()
    .required()
    .typeError('Valor precisa ser um número de telefone sem caracteres ex: 11912341234')
    .test('len', 'Telefone inválido', (val) => String(val).length === 11),
  color: Yup.string().required('Cor é obrigatória')
})
</script>
