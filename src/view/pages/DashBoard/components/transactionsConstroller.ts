import type { PERIODS } from "@/app/config/constants/dates"
import type { TRANSACTION_TYPE } from "@/app/config/constants/transaction"
import { useTransactionsStore } from "@/app/store/useTransactionStore"
import { storeToRefs } from "pinia"
import { ref, watch } from "vue"

export function useTransactionsController() {

  const isOpenFiltersModal = ref(false)
  const slideLoading = ref(true)

  const store = useTransactionsStore()
  const { data, queryLoading, queryInitialLoading, filters } = storeToRefs(store)

  const toggleFiltersModal = (): boolean => {
    return isOpenFiltersModal.value = !isOpenFiltersModal.value
  }
  const handleSelectTypeTransaction = (value: TRANSACTION_TYPE | undefined) => {
    store.handleChangeFilters("type")(value)
  }

  const handleSwiperChange = (value: string) => {
    store.handleChangeFilters("date")(value)
  }

  const handleApplyFilters = ({ employeeId, period }: {
    employeeId: string | undefined
    period: PERIODS
  }) => {
    store.handleChangeFilters("employeeId")(employeeId)
    store.handleChangeFilters("period")(period)
    toggleFiltersModal()
  }

  watch(queryLoading, (value) => slideLoading.value = value)

  return {
    filters,
    data,
    transactionsLoading: slideLoading,
    initialLoading: queryInitialLoading,
    slideLoading,
    isOpenFiltersModal,
    toggleFiltersModal,
    handleSelectTypeTransaction,
    handleSwiperChange,
    handleApplyFilters,
  }
}