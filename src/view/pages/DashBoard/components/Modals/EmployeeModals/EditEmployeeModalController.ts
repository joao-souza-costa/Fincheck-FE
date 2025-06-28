import { toast } from '@/app/utils/toast'
import { ref } from 'vue'
import { useEmployeeStore } from '@/app/store/useEmployeeStore'
import { storeToRefs } from 'pinia'


export function useEditAccountModalController(emit: Function) {
  const employees = useEmployeeStore()
  const { updateLoading, deleteLoading, isRefetchingLoading } = storeToRefs(employees)
  const isOpenDeleteModal = ref<boolean>(false)

  const handleDeleteModal = () => {
    isOpenDeleteModal.value = true
    emit('close')
  }

  async function onSubmit(values: any, id: string) {
    values.commission = parseInt(values.commission)
    return employees.updateEmployee(values, id)
      .then(() => toast.success('Conta editada com sucesso'))
      .then(() => emit('close'))
      .catch((e) => toast.error(e.response.data.message || 'Não foi possivel editar a sua conta'))
  }

  async function onDelete(id: string) {
    return employees.deleteEmployee(id)
      .then(() => toast.success('Conta deletada com sucesso'))
      .then(() => (isOpenDeleteModal.value = false))
      .catch((e) => toast.error(e.response.data.message || 'Não foi possivel deletar a sua conta'))
  }

  return {
    isOpenDeleteModal,
    updateLoading,
    deleteLoading,
    queryLoading: isRefetchingLoading,
    handleDeleteModal,
    onSubmit,
    onDelete,

  }
}