<template>
  <p class="text-end">max: {{ data?.length }}/20</p>

  <BaseTable.Root
    :headers="headers"
    :is-loading="isLoading"
    :list="data"
    not-found-description="Não encontramos nenhum serviço"
    @select="handleSelect"
  >
    <template #[`body.pricingMode`]="{ item }">
      {{ SERVICES_MODE_LABELS[item.pricingMode.value as SERVICES_PRICING_MODE] }}
    </template>

    <template #[`body.baseValue`]="{ item }">
      {{ formatCurrency(Number(item.baseValue.value)) }}
    </template>
    
    <template #[`body.employees`]="{ item }">
      {{ employeeStore?.employeesAsObject?.[item.employees.value[0]?.id]?.name }}
    </template>
  </BaseTable.Root>
</template>

<script setup lang="ts">
import BaseTable from '@/view/components/Table/TableRoot'
import type { servicesResponse } from '@/app/services/ServicesService'
import { SERVICES_MODE_LABELS, SERVICES_PRICING_MODE } from '@/app/config/constants/services'
import { useEmployeeStore } from '@/app/store/useEmployeeStore'
import { formatCurrency } from '@/app/utils/formatCurrency'

const emit = defineEmits<{ select: [v: servicesResponse] }>()
const props = defineProps<tProps>()

const employeeStore = useEmployeeStore()

const headers = [
  { key: 'name', title: 'Procedimento', class: 'text-start' },
  { key: 'pricingMode', title: 'Precificação', class: 'text-center md:text-center !hidden md:!inline-block' },
  { key: 'baseValue', title: 'Valor', class: 'text-center md:text-center ' },
  { key: 'duration', title: 'Duração', class: 'text-start md:text-center !hidden md:!inline-block' },
  { key: 'employees', title: 'Profissional', class: 'text-right md:text-center' }
]

type tProps = {
  data?: servicesResponse[]
  isLoading: boolean
}

function handleSelect(item: servicesResponse) {
  item.value = item.baseValue
  emit('select', item)
}
</script>
