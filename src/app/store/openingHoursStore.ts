import { defineStore, storeToRefs } from "pinia"
import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query"
import openingHoursService from "../services/OpeningHoursService"
import { useUserStore } from "./useUserStore"
import { useEmployeeStore } from "./useEmployeeStore"

export const userOpeningHoursStore = defineStore('openingHours', () => {

  const employeeStore = useEmployeeStore()
  const { queryLoading, isRefetchingLoading } = storeToRefs(employeeStore)

  const { mutateAsync: createMutation, isPending: createLoading } = useMutation({ mutationFn: openingHoursService.create })
  const { mutateAsync: updateMutation, isPending: updateLoading } = useMutation({ mutationFn: openingHoursService.update })
  const { mutateAsync: deleteMutation, isPending: deleteLoading } = useMutation({ mutationFn: openingHoursService.delete })

  const invalidateOpeningHoursQuery = () => {
    return employeeStore.invalidateEmployeesQuery()
  }

  const createOpeningHour = (payload: any) => {
    return createMutation(payload)
      .then(invalidateOpeningHoursQuery)
  }

  const updateOpeningHour = (payload: any, id: string) => {
    payload.id = id
    return updateMutation(payload).then(invalidateOpeningHoursQuery)
  }

  const deleteOpeningHour = (id: string) => {
    return deleteMutation(id)
      .then(invalidateOpeningHoursQuery)
  }

  return {
    queryLoading,
    isRefetchingLoading,
    createLoading,
    updateLoading,
    deleteLoading,
    createOpeningHour,
    updateOpeningHour,
    deleteOpeningHour,
  }
})