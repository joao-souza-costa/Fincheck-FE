<template>
  <base-service-modal
    v-if="isOpen"
    label="Editar Procedimento"
    @close="$emit('close')"
    @submit="(v) => onSubmit(v, service.id)"
    :initial-values="service"
  >
    <template #right-action>
      <trash-icon role="button" class="w-6 h-6 text-red-800" @click="$emit('open-delete')" />
    </template>
    <base-button type="submit" :is-loading="updateLoading" label="Editar" />
  </base-service-modal>
</template>

<script setup lang="ts">
import BaseButton from '@/view/components/BaseButton.vue'
import BaseServiceModal from './BaseServiceModal.vue'
import type { servicesResponse } from '@/app/services/ServicesService'
import TrashIcon from '@/view/components/icons/TrashIcon.vue'
import { toast } from '@/app/utils/toast'
import { useServiceStore } from '@/app/store/useServiceStore'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

const emit = defineEmits<{ close: []; 'open-delete': [] }>()

defineProps<{ isOpen: boolean; service: servicesResponse }>()

const serviceStore = useServiceStore()
const { updateLoading } = storeToRefs(serviceStore)

async function onSubmit(values: any, id: string) {
  return serviceStore
    .updateService(values, id)
    .then(() => toast.success('Procedimento editado com sucesso'))
    .then(() => emit("close"))
    .catch(() => toast.error('Não foi possivel editar a seu Procedimento'))
}
</script>
