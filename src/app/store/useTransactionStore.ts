import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query"
import { defineStore, storeToRefs } from "pinia"
import transactionService, { type GetAllTransactionFilters } from "../services/TransactionService"
import { computed, ref, watch } from "vue"
import { useUserStore } from "./useUserStore"
import { PERIODS } from "../config/constants/dates"
import { startOfDay } from "date-fns"

interface AccountsDictionary {
  [key: string]: number
}

export const useTransactionsStore = defineStore('transactions', () => {
  const queryClient = useQueryClient()
  const { accessToken } = storeToRefs(useUserStore())

  const filters = ref<GetAllTransactionFilters>({
    date: startOfDay(Date.now()).toISOString(),
    period: PERIODS.diary,
    employeeId: undefined
  })

  const { data, isFetching: queryLoading, isInitialLoading: queryInitialLoading, isRefetching, refetch } = useQuery({
    queryKey: ['transactions'],
    queryFn: () => transactionService.getAll(filters.value),
    enabled: accessToken
  })

  function handleChangeFilters<TFilter extends keyof GetAllTransactionFilters>(filter: TFilter) {
    return (value: GetAllTransactionFilters[TFilter]) => {
      filters.value[filter] = value
      refetch()
    }
  }

  const { mutateAsync: createMutation, isPending: createLoading } = useMutation({ mutationFn: transactionService.create })
  const { mutateAsync: updateMutation, isPending: updateLoading } = useMutation({ mutationFn: transactionService.update })
  const { mutateAsync: deleteMutation, isPending: deleteLoading } = useMutation({ mutationFn: transactionService.delete })

  const invalidateTransactionsQuery = async () => {
    return queryClient.invalidateQueries({ queryKey: ['transactions'] })
  }

  const createTransaction = (values: any) => {
    return createMutation({
      ...values,
      value: Number(values.value)
    }).then(invalidateTransactionsQuery)
  }

  const updateTransaction = (id: string, { category, ...values }: any,) => {
    return updateMutation({
      ...values,
      id,
      value: Number(values.value),
    }).then(invalidateTransactionsQuery)
  }

  const deleteTransaction = (id: string) => {
    return deleteMutation(id).then(invalidateTransactionsQuery)
  }

  return {
    data,
    filters,
    queryLoading,
    queryInitialLoading,
    createLoading,
    updateLoading,
    deleteLoading,
    refetchingLoading: isRefetching,
    handleChangeFilters,
    invalidateTransactionsQuery,
    createTransaction,
    updateTransaction,
    deleteTransaction,
  }
})