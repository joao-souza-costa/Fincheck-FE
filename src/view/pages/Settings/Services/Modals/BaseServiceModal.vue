<template>
  <base-modal :title="label" open @update:open="$emit('close')">
    <template #right-action>
      <slot name="right-action" />
    </template>
    <Form
      :validation-schema="schema"
      :initial-values="initialValues"
      class="mt-5 flex flex-col gap-4"
      @submit="(v) => emit('submit', v)"
    >
      <base-input name="name" type="text" id="name" placeholder="Nome" />

      <base-input-select name="pricingMode" :options="options" placeholder="Tipo de precificação" />

      <base-input-select
        name="employee"
        :options="employeesOptions"
        placeholder="Profissional responsável"
      />

      <base-input name="value" type="text" id="value" placeholder="Valor" />
      <base-input name="duration" type="text" id="duration" placeholder="Duração (Em minutos)" />
      <base-time-picker-input name="opening" />
      <slot />
    </Form>
  </base-modal>
</template>

<script setup lang="ts">
import { type GenericObject, Form } from 'vee-validate'
import * as Yup from 'yup'

import BaseModal from '@/view/components/BaseModal.vue'
import BaseInput from '@/view/components/BaseInput.vue'
import BaseInputSelect from '@/view/components/BaseInputSelect.vue'
import BaseTimePickerInput from '@/view/components/BaseTimePickerInput.vue'
import { SERVICES_MODE_LABELS, SERVICES_PRICING_MODE } from '@/app/config/constants/services'
import type { servicesResponse } from '@/app/services/ServicesService'
import { useEmployeeStore } from '@/app/store/useEmployeeStore'
import { computed } from 'vue'

type iProps = {
  label: string
  buttonLabel?: String
  initialValues?: Omit<servicesResponse, 'id'>
}

type tEmit = {
  close: []
  submit: [v: GenericObject]
}

const schema = Yup.object().shape({
  name: Yup.string().required('Nome do procedimento é obrigatório.'),
  value: Yup.number().required('O valor do procedimento é obrigatório.'),
  duration: Yup.number()
    .typeError('Duração não precisa ter virgula ou caracteres especiais')
    .integer('Duração precisa ser em minutos.')
    .required('Duração é obrigatória'),
  pricingMode: Yup.mixed()
    .required('Precificação é obrigatória')
    .oneOf([SERVICES_PRICING_MODE.FIXED, SERVICES_PRICING_MODE.VARIABLE]),
  employee: Yup.mixed()
})

const employeeStore = useEmployeeStore()

const props = defineProps<iProps>()

const emit = defineEmits<tEmit>()

const initialValues = Object.assign({ type: SERVICES_PRICING_MODE.FIXED }, props.initialValues)

const options = [
  {
    value: SERVICES_PRICING_MODE.FIXED,
    label: SERVICES_MODE_LABELS.FIXED
  },
  {
    value: SERVICES_PRICING_MODE.VARIABLE,
    label: SERVICES_MODE_LABELS.VARIABLE
  }
]

const employeesOptions = computed(() => {
  if (!employeeStore.employees) return []

  return employeeStore.employees?.map((acc) => ({ value: acc.id, label: acc.name }))
})
</script>
