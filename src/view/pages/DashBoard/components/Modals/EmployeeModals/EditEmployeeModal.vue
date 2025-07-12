<template>
  <base-employee-modal
    v-if="isOpen"
    modal-label="Editar Profissional"
    button-label="Editar"
    :initial-values="employee"
    @close="$emit('close')"
    @submit="(v) => onSubmit(v, employee.id)"
  >
    <template #right-action>
      <trash-icon role="button" class="w-6 h-6 text-red-800" @click="handleDeleteModal" />
    </template>
    <base-button type="submit" :is-loading="updateLoading || queryLoading"> Salvar </base-button>
  </base-employee-modal>

  <confirm-delete-modal
    v-if="isOpenDeleteModal"
    title="Tem certeza que deseja excluir esse functionário ?"
    description="Ao excluir um profissional os serviços associados ficaram sem profissionais."
    :is-loading="deleteLoading || queryLoading"
    @confirm="onDelete(employee.id)"
    @cancel="isOpenDeleteModal = false"
    @close="isOpenDeleteModal = false"
  />
</template>

<script setup lang="ts">
import type { employeesResponse } from '@/app/services/EmployeeService'
import BaseEmployeeModal from './BaseEmployeeModal.vue'
import BaseButton from '@/view/components/BaseButton.vue'
import TrashIcon from '@/view/components/icons/TrashIcon.vue'
import ConfirmDeleteModal from '@/view/components/ConfirmDeleteModal.vue'
import { useEditAccountModalController } from './EditEmployeeModalController'

defineProps<{ isOpen: boolean; employee: employeesResponse }>()
const emit = defineEmits<{ close: [] }>()

const {
  isOpenDeleteModal,
  updateLoading,
  deleteLoading,
  queryLoading,
  handleDeleteModal,
  onSubmit,
  onDelete
} = useEditAccountModalController(emit)
</script>
