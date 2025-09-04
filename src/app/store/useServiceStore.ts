import { defineStore, storeToRefs } from "pinia"
import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query"
import servicesService from "../services/ServicesService"
import { useUserStore } from "./useUserStore"
import { computed } from "vue"

export const useServiceStore = defineStore('services', () => {

  const { accessToken } = storeToRefs(useUserStore())
  const queryClient = useQueryClient()

  const { data, isLoading: queryLoading, isRefetching: isRefetchingLoading } = useQuery({
    queryKey: ['services'],
    queryFn: servicesService.getAll,
    enabled: accessToken.value
  })

  const { mutateAsync: createMutation, isPending: createLoading } = useMutation({ mutationFn: servicesService.create })
  const { mutateAsync: updateMutation, isPending: updateLoading } = useMutation({ mutationFn: servicesService.update })
  const { mutateAsync: deleteMutation, isPending: deleteLoading } = useMutation({ mutationFn: servicesService.delete })

  const invalidateCategoriesQuery = () => {
    return queryClient.invalidateQueries({ queryKey: ['services'] })
  }

  const createService = (payload: any) => {
    return createMutation(Object.assign(payload, { value: parseFloat(payload.value), duration: parseInt(payload.duration) }))
      .then(invalidateCategoriesQuery)
  }

  const updateService = (values: any, id: string) => {
    delete values.baseValue
    return updateMutation({
      ...values,
      value: parseFloat(values.value),
      id
    }).then(invalidateCategoriesQuery)
  }

  const deleteService = (id: string) => {
    return deleteMutation(id)
      .then(invalidateCategoriesQuery)
  }
  const servicesAsOptions = computed(() => {

    if (!data.value) {
      return []
    }
    return data.value?.map((v) => ({
      label: v.name,
      value: v.id
    }))
  })

  return {
    data,
    queryLoading,
    isRefetchingLoading,
    createLoading,
    updateLoading,
    deleteLoading,
    servicesAsOptions,
    createService,
    updateService,
    deleteService,
  }
})