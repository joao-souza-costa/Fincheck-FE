import { toast } from '@/app/utils/toast'
import { ref } from 'vue'
import { useServiceStore } from '@/app/store/useServiceStore'
import { storeToRefs } from 'pinia'


export function useEditCategoryModalController(emit: Function) {
  const category = useServiceStore()
  const { updateLoading, deleteLoading, isRefetchingLoading } = storeToRefs(category)
  const isOpenDeleteModal = ref<boolean>(false)

  async function onSubmit(values: any, id: string) {
    return category.updateCategory(values, id)
      .then(() => toast.success('Categoria editada com sucesso'))
      .then(() => emit('close'))
      .catch(() => toast.error('Não foi possivel editar a sua Categoria'))
  }


  return {
    isOpenDeleteModal,
    updateLoading,
    deleteLoading,
    queryLoading: isRefetchingLoading,
    onSubmit,
  }
}