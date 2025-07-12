<template>
  <p class="text-end">max: {{ data?.length }}/20</p>

  <BaseTable.Root
    :headers="headers"
    :is-loading="isLoading"
    :list="data"
    not-found-description="Não encontramos nenhum serviço"
    @select="handleSelect"
  >
    <template #[`body.employeeId`]="{ item }">
      {{ employeeStore?.employeesAsObject?.[item.employeeId.value].name }}
    </template>

    <template #[`body.weekday`]="{ item }">
      {{ DAYS_OF_WEEK_LABEL[item.weekday.value] }}
    </template>

    <template #[`body.openHourInMinutes`]="{ item }">
      {{ formatHours(item.openHourInMinutes.value) }}
    </template>

    <template #[`body.closeHourInMinutes`]="{ item }">
      {{ formatHours(item.closeHourInMinutes.value) }}
    </template>
  </BaseTable.Root>
</template>

<script setup lang="ts">
import BaseTable from '@/view/components/Table/TableRoot'
import { useEmployeeStore } from '@/app/store/useEmployeeStore'
import { DAYS_OF_WEEK_LABEL } from '../../../../../app/config/constants/dates'
import type { openingHoursResponse } from '@/app/services/OpeningHoursService';

const emit = defineEmits<{ select: [v: openingHoursResponse] }>()
const props = defineProps<tProps>()

const employeeStore = useEmployeeStore()

const headers = [
  { key: 'employeeId', title: 'Profissional', class: 'text-right md:text-center' },
  { key: 'weekday', title: 'Dia da semana', class: 'text-center' },
  { key: 'openHourInMinutes', title: 'Começa a atender', class: 'text-center md:text-center' },
  {
    key: 'closeHourInMinutes',
    title: 'Termina o atendimentos',
    class: 'text-right md:text-center'
  },
  { key: 'interval', title: 'Intervalo entre atendimentos', class: 'text-right md:text-center' }
]

function formatHours(minutes: number) {
  const date = new Date(0, 0, 0, 0).setMinutes(minutes)
  return `${addPad(new Date(date).getHours())}:${addPad(new Date(date).getMinutes())}`
}

function addPad(v: number) {
  return String(v).padStart(2, '0')
}

type tProps = {
  data?: openingHoursResponse[]
  isLoading: boolean
}

function handleSelect(item: openingHoursResponse) {
  item.value = item.baseValue
  emit('select', item)
}
</script>
