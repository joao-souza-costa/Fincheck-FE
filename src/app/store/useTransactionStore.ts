import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query"
import { defineStore, storeToRefs } from "pinia"
import transactionService, { type GetAllTransactionFilters } from "../services/TransactionService"
import { computed, ref, watch } from "vue"
import { useUserStore } from "./useUserProvider"

interface AccountsDictionary {
  [key: string]: number
}

export const useTransactionsStore = defineStore('transactions', () => {
  const queryClient = useQueryClient()
  const { accessToken } = storeToRefs(useUserStore())

  const filters = ref<GetAllTransactionFilters>({
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
    bankAccountId: undefined
  })

  const { data, isFetching: queryLoading, isInitialLoading: queryInitialLoading, refetch } = useQuery({
    queryKey: ['transactions'],
    queryFn: () => transactionService.getAll(filters.value),
    enabled: accessToken
  })

  function handleChangeFilters<TFilter extends keyof GetAllTransactionFilters>(filter: TFilter) {
    return (value: GetAllTransactionFilters[TFilter]) => {
      filters.value[filter] = value
    }
  }

  watch(filters.value, () => refetch(), { deep: true })

  const { mutateAsync: createMutation, isLoading: createLoading } = useMutation(transactionService.create)
  const { mutateAsync: updateMutation, isLoading: updateLoading } = useMutation(transactionService.update)
  const { mutateAsync: deleteMutation, isLoading: deleteLoading } = useMutation(transactionService.delete)

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

  const groupedTransactionByAccount = computed(() => {
    return data.value?.reduce((acc: {
      accounts: AccountsDictionary,
      totalIncome: number
      totalExpense: number
    }, item) => {
      const isExpense = item.type === "EXPENSE"
      isExpense ? acc.totalExpense += item.value : acc.totalIncome += item.value
      acc.accounts[item.bankAccountId] ?
        acc.accounts[item?.bankAccountId] += item.value :
        acc.accounts[item?.bankAccountId] = item.value

      return acc

    }, {
      accounts: {},
      totalExpense: 0,
      totalIncome: 0
    })
  })

  return {
    data,
    filters,
    groupedTransactionByAccount,
    queryLoading,
    queryInitialLoading,
    createLoading,
    updateLoading,
    deleteLoading,
    handleChangeFilters,
    invalidateTransactionsQuery,
    createTransaction,
    updateTransaction,
    deleteTransaction,
  }
})