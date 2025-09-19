<template>
  <base-modal title="Agendamentos" open @update:open="!isLoading && $emit('close')">
    <div class="flex flex-col items-center text-center gap-6">
      <slot>
        <div class="w-[52px] h-[52px] rounded-full bg-red-0 flex items-center justify-center">
          <trash-icon class="w-6 h-6 text-red-900" />
        </div>
      </slot>
      <p class="w-[180px] text-gray-800 font-bold tracking-[-0.5px]">
        {{ title }}
      </p>
      <p v-if="description" class="tracking-[-0.5px]">
        {{ description }}
      </p>
    </div>

    <div class="mt-10 space-y-4">
      <base-button
        class="w-full"
        :variant="confirmButtonVariant"
        @click="$emit('confirm')"
        :is-loading="isLoading"
      >
        {{ confirmText }}
      </base-button>

      <base-button class="w-full" :disabled="isLoading" variant="GHOST" @click="$emit('cancel')">
        Cancelar
      </base-button>
    </div>
  </base-modal>
</template>

<script setup lang="ts">
import { boolean } from 'yup'
import BaseButton from './BaseButton.vue'
import BaseModal from './BaseModal.vue'
import TrashIcon from './icons/TrashIcon.vue'

defineProps({
  title: String,
  description: String,
  isLoading: Boolean,
  confirmButtonVariant: {
    type: String,
    default: 'DANGER'
  },
  confirmText: {
    type: String,
    default: 'Sim, desejo excluir'
  },
  showIcon: { default: true }
})
defineEmits(['close', 'confirm', 'cancel'])
</script>

<style scoped></style>
