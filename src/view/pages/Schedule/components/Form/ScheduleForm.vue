<template>
  <BaseModal
    title="Agendamento do cliente"
    :open="scheduleProvider.modal.CREATE"
    @update:open="scheduleProvider.toggleModal('CREATE')"
  >
    <form class="mt-5 flex flex-col gap-4">
      <base-input name="name" type="text" id="name" placeholder="Nome *" />
      <base-input name="email" type="text" id="email" placeholder="Email *" />
      <base-input name="phone" type="text" id="phone" placeholder="Whatsapp *" />

      <base-input-select
        name="service"
        :options="serviceStore.servicesAsOptions"
        placeholder="Procedimento"
      />

      <base-input-select
        name="employee"
        :disabled="!values.service"
        :options="employeeOptions"
        placeholder="Profissional responsável"
      />

      <base-date-picker-input name="date" :disabled="!values.employee" />

      <BaseTimePickerInput name="time" :disabled="!values.date" />
    </form>

    <BaseButton class="w-full mt-3" label="Confirmar" @click="handleFormSubmit" />
  </BaseModal>
</template>

<script lang="ts" setup>
import { computed, inject, watch } from 'vue'
import BaseInput from '@/view/components/BaseInput.vue'
import BaseInputSelect from '@/view/components/BaseInputSelect.vue'
import BaseDatePickerInput from '@/view/components/BaseDatePickerInput.vue'

import { useForm } from 'vee-validate'
import BaseButton from '@/view/components/BaseButton.vue'
import { useServiceStore } from '@/app/store/useServiceStore'
import * as Yup from 'yup'
import BaseTimePickerInput from '@/view/components/BaseTimePickerInput.vue'
import { useAppointmentStore } from '@/app/store/useAppointmentStore'
import { PERIODS } from '@/app/config/constants/dates'
import BaseModal from '@/view/components/BaseModal.vue'

const scheduleProvider = inject('scheduleProvider')

defineProps({
  type: {
    type: String
  },
  open: Boolean
})

const serviceStore = useServiceStore()
const appointmentStore = useAppointmentStore()

const schema = Yup.object().shape({
  name: Yup.string().required('Nome é obrigatório'),
  email: Yup.string().email('Informe um email válido').required('Email é obrigatório'),
  service: Yup.mixed().required('É necessário definir um serviço'),
  employee: Yup.mixed().required('É necessário definir um funcionário para o serviço'),
  date: Yup.string().required('É necessário definir uma data'),
  phone: Yup.number()
    .required()
    .typeError('Valor precisa ser um número de telefone sem caracteres ex: 11912341234')
    .test('len', 'Telefone inválido', (val) => String(val).length === 11),
  time: Yup.object()
    .shape({
      start: Yup.number()
    })
    .required('É obrigatório definir um horário')
})

const { values, validate } = useForm({
  validationSchema: schema
})

const employeeOptions = computed(() => {
  if (!serviceStore.data) {
    return []
  }

  for (const element of serviceStore.data) {
    if (element.id === values?.service) {
      return element.employees.map((v) => ({ label: v.name, value: v.id }))
    }
  }

  return []
})

function handleFormSubmit() {
  validate().then((e) => {
    if (e.valid) {
      //Aqui ele retorna um validate boleano
      appointmentStore.createAppointment(values)
    }
  })
}

watch(
  () => values.employee,
  (a) => {
    appointmentStore.handleChangeFilters('employeeId', values.employee)
  }
)
</script>
