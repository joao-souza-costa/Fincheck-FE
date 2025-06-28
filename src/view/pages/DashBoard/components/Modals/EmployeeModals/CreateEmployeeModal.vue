<template>
  <base-employee-modal
    v-if="isOpen"
    modal-label="Criar Funcionário"
    @close="$emit('close')"
    @submit="onSubmit"
  >
    <base-button type="submit" :is-loading="employeeStore.createLoading"> Criar </base-button>
  </base-employee-modal>
</template>

<script setup lang="ts">
import { toast } from '@/app/utils/toast'
import BaseButton from '@/view/components/BaseButton.vue'
import BaseEmployeeModal from './BaseEmployeeModal.vue'
import { useEmployeeStore } from '@/app/store/useEmployeeStore'

const employeeStore = useEmployeeStore()

defineProps<{ isOpen: boolean }>()
const emit = defineEmits<{ close: [] }>()

function onSubmit(values: any) {
  values.commission = parseInt(values.commission)
  return employeeStore
    .createEmployee(values)
    .then(() => toast.success('Funcionário criado com sucesso'))
    .then(() => emit('close'))
    .catch(() => toast.error('Erro durante a criação do funcionário'))
}
</script>
