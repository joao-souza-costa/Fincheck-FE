<template>
  <base-service-modal
    v-if="isOpen"
    label="Adicionar Procedimento"
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
import BaseServiceModal from './BaseServiceModal.vue'
import { useServiceStore } from '@/app/store/useServiceStore'
import { storeToRefs } from 'pinia'

const servicesStore = useServiceStore()
const { createLoading, isRefetchingLoading } = storeToRefs(servicesStore)

defineProps<{ isOpen: boolean }>()
const emit = defineEmits<{ close: [] }>()

async function onSubmit(values: any) {
  return servicesStore
    .createService(values)
    .then(() => toast.success('Procedimento criado com sucesso'))
    .then(() => emit('close'))
    .catch(() => toast.error('Erro durante a criação do Procedimento'))
}
</script>
