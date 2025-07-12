<template>
  <base-service-modal
    v-if="isOpen"
    label="Adicionar horário"
    @close="$emit('close')"
    @submit="onSubmit"
  >
    <base-button type="submit" :is-loading="createLoading || isRefetchingLoading">
      Adicionar
    </base-button>
  </base-service-modal>
</template>

<script setup lang="ts">
import { toast } from '@/app/utils/toast'
import BaseButton from '@/view/components/BaseButton.vue'
import BaseServiceModal from './BaseOpeningModal.vue'
import { storeToRefs } from 'pinia'
import { userOpeningHoursStore } from '@/app/store/openingHoursStore'

const openingStore = userOpeningHoursStore()
const { createLoading, isRefetchingLoading } = storeToRefs(openingStore)

defineProps<{ isOpen: boolean }>()
const emit = defineEmits<{ close: [] }>()

async function onSubmit(values: any) {
  values.interval = Number(values.interval)

  return openingStore
    .createOpeningHour({...values, ...values.opening})
    .then(() => toast.success('Horário criado com sucesso'))
    .then(() => emit('close'))
    .catch(() => toast.error('Erro durante a criação do Horário'))
}
</script>
