<template>
  <CreateEmployeeModal
    :is-open="isOpenEmployeeModal.CREATE"
    @close="toggleEmployeeModal('CREATE')"
  />

  <EditEmployeeModal
    v-if="isOpenEmployeeModal.EDIT_EMPLOYEE"
    :is-open="isOpenEmployeeModal.EDIT"
    :employee="isOpenEmployeeModal.EDIT_EMPLOYEE"
    @close="toggleEmployeeModal('EDIT')"
  />
</template>

<script setup lang="ts">
import { inject } from 'vue'
import CreateEmployeeModal from './EmployeeModals/CreateEmployeeModal.vue'
import EditEmployeeModal from './EmployeeModals/EditEmployeeModal.vue'
import { MODALS_PROVIDER, type modalsProviderProps } from '../../providers/modalsProvider'

const { isOpenEmployeeModal, toggleEmployeeModal } = inject(MODALS_PROVIDER) as modalsProviderProps
</script>
