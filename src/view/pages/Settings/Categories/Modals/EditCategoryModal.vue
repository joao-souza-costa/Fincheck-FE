<template>
  <base-category-modal
    v-if="isOpen"
    label="Editar Categoria"
    @close="$emit('close')"
    @submit="(v) => onSubmit(v, category.id)"
    :initial-values="category"
  >
    <template #right-action>
      <trash-icon role="button" class="w-6 h-6 text-red-800" @click="$emit('open-delete')" />
    </template>
    <base-button type="submit" :is-loading="queryLoading || updateLoading" label="Editar" />
  </base-category-modal>
</template>

<script setup lang="ts">
import BaseButton from '@/view/components/BaseButton.vue'
import BaseCategoryModal from './BaseCategoryModal.vue'
import { useEditCategoryModalController } from './EditCategoryModalController'
import type { categoriesResponse } from '@/app/services/ServicesService'
import TrashIcon from '@/view/components/icons/TrashIcon.vue'

const emit = defineEmits<{ close: []; 'open-delete': [] }>()

defineProps<{ isOpen: boolean; category: categoriesResponse }>()

const { queryLoading, onSubmit, updateLoading } = useEditCategoryModalController(emit)
</script>
