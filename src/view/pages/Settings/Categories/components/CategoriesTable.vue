<template>
  <p class="text-end">max: {{ data?.length }}/20</p>

  <BaseTable.Root
    :headers="headers"
    :is-loading="isLoading"
    :list="data"
    not-found-description="Não encontramos nenhuma categoria"
    @select="(item: categoriesResponse) => $emit('select', item)"
  >
    <template #[`body.type`]="{ item }">
      {{ TRANSACTION_LABELS[item.type.value as TRANSACTION_TYPE] }}
    </template>

    <template #[`body.icon`]="{ item }">
<!--       <category-icon :type="item.type.value" :category="item.icon.value" class="h-10 w-10" />
 -->    </template>
  </BaseTable.Root>
</template>

<script setup lang="ts">
import BaseTable from '@/view/components/Table/TableRoot'
import CategoryIcon from '@/view/components/icons/categories/CategoryIcon.vue'
import { TRANSACTION_LABELS, TRANSACTION_TYPE } from '@/app/config/constants/transaction'
import type { categoriesResponse } from '@/app/services/ServicesService'

const headers = [
  { key: 'name', title: 'Nome', class: 'text-start' },
  { key: 'type', title: 'Tipo', class: 'text-center md:text-start' },
  { key: 'icon', title: 'Icone', class: 'text-right md:text-start' }
]

type tProps = {
  data?: categoriesResponse[]
  isLoading: boolean
}

defineProps<tProps>()
defineEmits<{ select: [v: categoriesResponse] }>()
</script>
