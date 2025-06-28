import { defineStore, storeToRefs } from "pinia"
import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query"
import servicesService from "../services/ServicesService"
import { useUserStore } from "./useUserStore"

export const useServiceStore = defineStore('services', () => {

  const { accessToken } = storeToRefs(useUserStore())
  const queryClient = useQueryClient()

  const { data = [], isLoading: queryLoading, isRefetching: isRefetchingLoading } = useQuery({
    queryKey: ['services'],
    queryFn: servicesService.getAll,
    enabled: accessToken
  })

  const { mutateAsync: createMutation, isPending: createLoading } = useMutation({ mutationFn: servicesService.create })
  const { mutateAsync: updateMutation, isPending: updateLoading } = useMutation({ mutationFn: servicesService.update })
  const { mutateAsync: deleteMutation, isPending: deleteLoading } = useMutation({ mutationFn: servicesService.delete })

  const invalidateCategoriesQuery = () => {
    return queryClient.invalidateQueries({ queryKey: ['services'] })
  }

  const createService = (values: any) => {
    return createMutation(values).then(invalidateCategoriesQuery)
  }

  const updateService = (values: any, id: string) => {
    return updateMutation({
      ...values,
      initialBalance: Number(values.initialBalance),
      id
    }).then(invalidateCategoriesQuery)
  }

  const deleteService = (id: string) => {
    return deleteMutation(id)
      .then(invalidateCategoriesQuery)
  }

  return {
    data,
    queryLoading,
    isRefetchingLoading,
    createLoading,
    updateLoading,
    deleteLoading,
    createService,
    updateService,
    deleteService,
  }
})