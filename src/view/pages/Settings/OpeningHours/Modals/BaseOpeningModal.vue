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
      <base-input-select name="employeeId" :options="employeesOptions" placeholder="Profissional" />

      <base-input-select
        v-if="!props.initialValues"
        name="weekday"
        :options="optionsDays"
        placeholder="Dia da semana"
      />

      <base-input-select
        name="interval"
        :options="intervalOptions"
        placeholder="Intervalo entre atendimentos (Minutos)"
      />

      <base-time-picker-input name="opening" :start-time="opening" />

      <slot />
    </Form>
  </base-modal>
</template>

<script setup lang="ts">
import { type GenericObject, Form } from 'vee-validate'
import * as Yup from 'yup'

import BaseModal from '@/view/components/BaseModal.vue'
import BaseTimePickerInput from '@/view/components/BaseTimePickerInput.vue'
import BaseInputSelect from '@/view/components/BaseInputSelect.vue'
import { useEmployeeStore } from '@/app/store/useEmployeeStore'
import { computed } from 'vue'

import { DAYS_OF_WEEK, DAYS_OF_WEEK_LABEL } from '@/app/config/constants/dates'
import type { openingHoursResponse } from '@/app/services/OpeningHoursService'

type iProps = {
  label: string
  buttonLabel?: String
  initialValues?: Omit<openingHoursResponse, 'id'>
}

type tEmit = {
  close: []
  submit: [v: GenericObject]
}

const weekdays = Object.values(DAYS_OF_WEEK)

const schema = Yup.object().shape({
  employeeId: Yup.mixed(),
  weekday: Yup.string().oneOf(weekdays).required('Dia da semana é obrigatório'),
  opening: Yup.object()
    .shape({
      closeTime: Yup.number(),
      openTime: Yup.number()
    })
    .required('É obrigatório definir um horário')
})

const employeeStore = useEmployeeStore()

const props = defineProps<iProps>()

const emit = defineEmits<tEmit>()

const initialValues = props.initialValues && {
  ...props.initialValues,
  interval: String(props.initialValues.interval)
}

function formatInitalValues() {
  if (!props.initialValues) {
    return [
      { hours: 8, minutes: 0 },
      { hours: 18, minutes: 0 }
    ]
  }

  const startHour = new Date(0, 0, 0, 0, 0).setMinutes(props.initialValues.openHourInMinutes)
  const closeHour = new Date(0, 0, 0, 0, 0).setMinutes(props.initialValues.closeHourInMinutes)

  return [
    { hours: new Date(startHour).getHours(), minutes: new Date(startHour).getMinutes() },
    { hours: new Date(closeHour).getHours(), minutes: new Date(closeHour).getMinutes() }
  ]
}

const opening = formatInitalValues()

const optionsDays = computed(() => {
  return Object.entries(DAYS_OF_WEEK_LABEL).map(([key, value]) => ({ value: key, label: value }))
})

const employeesOptions = computed(() => {
  if (!employeeStore.employees) return []

  return employeeStore.employees?.map((acc) => ({ value: acc.id, label: acc.name }))
})

const intervalOptions = [
  {
    label: '15',
    value: '15'
  },
  {
    label: '30',
    value: '30'
  },
  {
    label: '45',
    value: '45'
  },
  {
    label: '60',
    value: '60'
  }
]
</script>
