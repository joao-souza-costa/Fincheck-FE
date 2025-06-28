import type { TRANSACTION_TYPE } from "@/app/config/constants/transaction"
import { useServiceStore } from "@/app/store/useServiceStore"
import { computed } from "vue"

export function useCategoriesListController(categoryType: TRANSACTION_TYPE) {

  const serviceStore = useServiceStore()

  const categoriesFiltered = computed(() => serviceStore.data.value?.filter(({ type }) => type === categoryType))

  return {
    categoriesFiltered,
    queryLoading: serviceStore.queryLoading
  }
}