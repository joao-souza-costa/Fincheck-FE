import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query"
import { defineStore, storeToRefs } from "pinia"
import employeeService from "../services/EmployeeService"
import { useTransactionsStore } from "./useTransactionStore"
import { useUserStore } from "./useUserStore"
import { computed, ref } from "vue"

export const useEmployeeStore = defineStore('employee', () => {
  const transactionStore = useTransactionsStore();
  const { data = [] } = storeToRefs(transactionStore)
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
      .then()
      .then(invalidateEmployeesQuery)
      .then(transactionStore.invalidateTransactionsQuery)
  }

  const filteredEmployees = computed(() => {

    return employees.value?.map((employee) => {
      const values = data.value?.groupedEmployee?.find((employeeGrouped) => employeeGrouped.employeeId === employee.id)
      return Object.assign(employee, {
        currentBalance: values?._sum.value || 0,
        currentCommission: values?._sum.commission || 0,
      })
    })
  })

  const total = computed(() => {
    return data.value?.transactions.reduce((acc, item) => {
      return acc + item.value
    }, 0)
  })

  const totalCommission = computed(() => {
    return data.value?.groupedEmployee.reduce((acc, item) => {
      return acc + item._sum.commission
    }, 0)
  })

  return {
    employees,
    total,
    totalCommission,
    queryLoading,
    createLoading,
    updateLoading,
    deleteLoading,
    isRefetchingLoading,
    filteredEmployees,
    invalidateEmployeesQuery,
    createEmployee,
    updateEmployee,
    deleteEmployee,
  }
})