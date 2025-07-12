<template>
  <base-opening-modal
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
  </base-opening-modal>
</template>

<script setup lang="ts">
import BaseButton from '@/view/components/BaseButton.vue'
import BaseOpeningModal from './BaseOpeningModal.vue'
import TrashIcon from '@/view/components/icons/TrashIcon.vue'
import { toast } from '@/app/utils/toast'
import { storeToRefs } from 'pinia'
import type { openingHoursResponse } from '@/app/services/OpeningHoursService'
import { userOpeningHoursStore } from '@/app/store/openingHoursStore'

const emit = defineEmits<{ close: []; 'open-delete': [] }>()

defineProps<{ isOpen: boolean; service: openingHoursResponse }>()

const openingStore = userOpeningHoursStore()
const { updateLoading } = storeToRefs(openingStore)

async function onSubmit(values: any, id: string) {
  values.interval = Number(values.interval)
  return openingStore
    .updateOpeningHour({ ...values, ...values.opening }, id)
    .then(() => toast.success('Horário editado com sucesso'))
    .then(() => emit('close'))
    .catch(() => toast.error('Não foi possivel editar a seu Horário'))
}
</script>
