import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query"
import { defineStore, storeToRefs } from "pinia"
import appointmentService, { type GetAllAppointmentFilters } from "../services/AppointmentService"
import { computed, ref, watch } from "vue"
import { useUserStore } from "./useUserStore"
import { PERIODS } from "../config/constants/dates"
import { startOfDay } from "date-fns"

export const useAppointmentStore = defineStore('appointment', () => {
  const queryClient = useQueryClient()
  const { accessToken } = storeToRefs(useUserStore())

  const filters = ref({
    date: startOfDay(Date.now()).toISOString(),
    period: PERIODS.diary,
    type: undefined,
    employeeId: undefined
  })

  const { data, isFetching: queryLoading, isInitialLoading: queryInitialLoading, isRefetching, refetch } = useQuery({
    queryKey: ['appointment'],
    queryFn: () => appointmentService.getAll(filters.value),
    retry: false,
    enabled: accessToken.value
  })

  function handleChangeFilters(filter: any, value: any) {
    filters.value[filter] = value
    refetch()
  }

  const { mutateAsync: createMutation, isPending: createLoading } = useMutation({ mutationFn: appointmentService.create })
  const { mutateAsync: updateMutation, isPending: updateLoading } = useMutation({ mutationFn: appointmentService.update })
  const { mutateAsync: deleteMutation, isPending: deleteLoading } = useMutation({ mutationFn: appointmentService.delete })

  const invalidateAppointmentQuery = () => {
    return queryClient.invalidateQueries({ queryKey: ['appointment'] })
  }

  const createAppointment = (values: any) => {
    return createMutation(values).then(invalidateAppointmentQuery)
  }

  const updateAppointment = (id: string, { category, ...values }: any,) => {
    return updateMutation({
      ...values,
      serviceId: values.serviceId || undefined,
      employeeId: values.employeeId || undefined,
      id,
      value: Number(values.value),
    }).then(invalidateAppointmentQuery)
  }

  const deleteAppointment = (id: string) => {
    return deleteMutation(id).then(invalidateAppointmentQuery)
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
    invalidateAppointmentQuery,
    createAppointment,
    updateAppointment,
    deleteAppointment,
  }
})