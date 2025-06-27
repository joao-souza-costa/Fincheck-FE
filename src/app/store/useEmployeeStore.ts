import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query"
import { defineStore, storeToRefs } from "pinia"
import employeeService from "../services/EmployeeService"
import { useTransactionsStore } from "./useTransactionStore"
import { useUserStore } from "./useUserStore"
import { computed } from "vue"

export const useEmployeeStore = defineStore('employee', () => {
  const transactionStore = useTransactionsStore()
  const { accessToken } = storeToRefs(useUserStore())

  const queryClient = useQueryClient()

  const { data: employees, isPending: queryLoading, isRefetching: isRefetchingLoading } = useQuery({
    queryKey: ['employees'],
    queryFn: employeeService.getAll,
    enabled: accessToken
  })

  const { mutateAsync: createMutation, isPending: createLoading } = useMutation({ mutationFn: employeeService.create })
  const { mutateAsync: updateMutation, isPending: updateLoading } = useMutation({ mutationFn: employeeService.update })
  const { mutateAsync: deleteMutation, isPending: deleteLoading } = useMutation({ mutationFn: employeeService.delete })

  const invalidateEmployeesQuery = () => {
    return queryClient.invalidateQueries({ queryKey: ['employees'] })
  }
  ''
  const createEmployee = (values: any) => {
    return createMutation({
      ...values,
      initialBalance: 0
    }).then(invalidateEmployeesQuery)
  }

  const updateEmployee = (values: any, id: string) => {
    return updateMutation({
      ...values,
      initialBalance: Number(values.initialBalance),
      id
    }).then(invalidateEmployeesQuery)
  }

  const deleteEmployee = (id: string) => {
    return deleteMutation(id)
      .then(transactionStore.invalidateTransactionsQuery)
      .then(invalidateEmployeesQuery)
  }

  const data = computed(() => {
    return []
  })

  const filteredEmployees = computed(() => {
    return []
  })

  const totalExpense = computed(() => {
    return 0
  })

  const totalIncome = computed(() => {
    return 0
  })

  return {
    data,
    employees,
    totalExpense,
    totalIncome,
    queryLoading,
    createLoading,
    updateLoading,
    deleteLoading,
    isRefetchingLoading,
    invalidateEmployeesQuery,
    createEmployee,
    updateEmployee,
    deleteEmployee,
  }
})