<template>
  <section class="p-5 h-full">
    <services-header />

    <categories-table
      :data="openingHours"
      :is-loading="isRefetchingLoading || queryLoading"
      @select="handleToggleEdit"
    />

    <edit-service-modal
      v-if="selected"
      is-open 
      :service="selected"
      @open-delete="handleDelete"
      @close="handleToggleEdit(null)"
    />

    <confirm-delete-modal
      v-if="isOpenDeleteModal && deleteId"
      title="Excluir procedimento"
      description="Tem certeza que deseja excluir esse procedimento ?"
      :isLoading="deleteLoading || isRefetchingLoading"
      @confirm="onDelete(deleteId)"
      @cancel="closeDelete"
      @close="closeDelete"
    />
  </section>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import { toast } from '@/app/utils/toast'
import { useEmployeeStore } from '@/app/store/useEmployeeStore'
import ServicesHeader from './components/OpeningHeader.vue'
import ConfirmDeleteModal from '@/view/components/ConfirmDeleteModal.vue'
import EditServiceModal from './Modals/EditOpeningModal.vue'
import CategoriesTable from './components/OpeningTable.vue'
import type { servicesResponse } from '@/app/services/ServicesService'
import { userOpeningHoursStore } from '@/app/store/openingHoursStore'
import type { openingHoursResponse } from '@/app/services/OpeningHoursService'

const employeeStore = useEmployeeStore()
const openingStore = userOpeningHoursStore()

const { openingHours } = storeToRefs(employeeStore)
const { deleteLoading, isRefetchingLoading, queryLoading } = storeToRefs(openingStore)

const selected = ref<openingHoursResponse | null>()

const handleToggleEdit = (service: openingHoursResponse | null) => {
  selected.value = service
}

const isOpenDeleteModal = ref(false)
const deleteId = ref('')

const handleDelete = () => {
  isOpenDeleteModal.value = true
  deleteId.value = selected.value!.id
  selected.value = null
}

const closeDelete = () => {
  isOpenDeleteModal.value = false
  deleteId.value = ''
}

async function onDelete(id: string) {
  return openingStore
    .deleteOpeningHour(id)
    .then(() => toast.success('Horario deletado com sucesso'))
    .then(closeDelete)
    .catch(() => toast.error('Não foi possivel deletar o seu Horario'))
}
</script>
