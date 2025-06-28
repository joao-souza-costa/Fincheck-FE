<template>
  <base-category-modal
    v-if="isOpen"
    label="Criar Categoria"
    @close="$emit('close')"
    @submit="onSubmit"
  >
    <base-button type="submit" :is-loading="createLoading || isRefetchingLoading">
      Criar
    </base-button>
  </base-category-modal>
</template>

<script setup lang="ts">
import { toast } from '@/app/utils/toast'
import BaseButton from '@/view/components/BaseButton.vue'
import BaseCategoryModal from './BaseCategoryModal.vue'
import { useServiceStore } from '@/app/store/useServiceStore'
import { storeToRefs } from 'pinia'

const categoriesStore = useServiceStore()
const { createLoading, isRefetchingLoading } = storeToRefs(categoriesStore)

defineProps<{ isOpen: boolean }>()
const emit = defineEmits<{ close: [] }>()

async function onSubmit(values: any) {
  return categoriesStore
    .createCategory(values)
    .then(() => toast.success('Categoria criada com sucesso'))
    .then(() => emit('close'))
    .catch(() => toast.error('Erro durante a criação da categoria'))
}
</script>
