import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query"
import { defineStore, storeToRefs } from "pinia"
import employeeService from "../services/EmployeeService"
import { useTransactionsStore } from "./useTransactionStore"
import { useUserStore } from "./useUserStore"
import { computed, ref } from "vue"
import { EMPLOYEE_TYPE } from "../config/constants/employee"

export const useEmployeeStore = defineStore('employee', () => {
  const transactionStore = useTransactionsStore();
  const { data = [] } = storeToRefs(transactionStore)
  const { accessToken, user } = storeToRefs(useUserStore())


  const queryClient = useQueryClient()

  const { data: employeesData, isFetching: queryLoading, isRefetching: isRefetchingLoading } = useQuery({
    queryKey: ['employees'],
    queryFn: employeeService.getAll,
    enabled: accessToken.value && user.value?.type === EMPLOYEE_TYPE.OWNER,
  })

  const { mutateAsync: createMutation, isPending: createLoading } = useMutation({ mutationFn: employeeService.create })
  const { mutateAsync: updateMutation, isPending: updateLoading } = useMutation({ mutationFn: employeeService.update })
  const { mutateAsync: deleteMutation, isPending: deleteLoading } = useMutation({ mutationFn: employeeService.delete })

  const invalidateEmployeesQuery = () => {
    return queryClient.invalidateQueries({ queryKey: ['employees'] })
  }

  const employees = computed(() => {
    if (user.value?.type !== EMPLOYEE_TYPE.OWNER) {
      return []
    }
    return employeesData.value
  })

  const employeesAsObject = computed(() => employees.value?.reduce((acc, item) => {
    acc[item.id] = item
    return acc
  }, {}))

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

  const openingHours = computed(() => {
    return employees.value?.reduce((acc, employee) => {
      return acc.concat(employee.OpeningHours)
    }, [] as any)
  })
  return {
    employees,
    total,
    employeesAsObject,
    openingHours,
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