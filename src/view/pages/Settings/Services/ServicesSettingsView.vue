<template>
  <section class=" md:h-full">
    <services-header />

    <categories-table
      :data="data as servicesResponse[]"
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
import { useServiceStore } from '@/app/store/useServiceStore'
import ServicesHeader from './components/ServicesHeader.vue'
import ConfirmDeleteModal from '@/view/components/ConfirmDeleteModal.vue'
import EditServiceModal from './Modals/EditServiceModal.vue'
import CategoriesTable from './components/ServicesTable.vue'
import type { servicesResponse } from '@/app/services/ServicesService'

const serviceStore = useServiceStore()
const { data, isRefetchingLoading, queryLoading, deleteLoading } = storeToRefs(serviceStore)

const selected = ref<servicesResponse | null>()

const handleToggleEdit = (service: servicesResponse | null) => {
  if (service && service.employees) {
    service.employee = service.employees[0]?.id
  }

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
  return serviceStore
    .deleteService(id)
    .then(() => toast.success('Categoria deletada com sucesso'))
    .then(closeDelete)
    .catch(() => toast.error('Não foi possivel deletar a sua Categoria'))
}
</script>
