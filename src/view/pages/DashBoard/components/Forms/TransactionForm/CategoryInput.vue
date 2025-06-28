<template>
  <category-option
    v-if="category"
    class="!border-gray-500 flex-row-reverse justify-between"
    :icon="category.icon"
    :name="category.name"
    :type="category.type"
    @click.prevent="$emit('open-categories')"
  />

  <base-button
    v-else
    class="w-full !justify-between !px-3 rounded-lg !border h-[55px]"
    :class="[errorMessage ? '!border-red-900 text-red-900' : '!border-gray-500 !text-gray-700']"
    variant="GHOST"
    @click.prevent="$emit('open-categories')"
  >
    <span> Categoria </span>
    <span>
      <ChevronRightIcon class="w-6 h-6 text-gray-700" :class="[errorMessage && ' text-red-900']" />
    </span>
  </base-button>

  <base-input-error :error-message="errorMessage" />
</template>

<script setup lang="ts">
import type { categoriesResponse } from '@/app/services/ServicesService'
import ChevronRightIcon from '@/view/components/icons/ChevronRightIcon.vue'
import BaseInputError from '@/view/components/BaseInputError.vue'
import CategoryOption from '../../modals/CategoryModals/CategoryOption.vue'
import BaseButton from '@/view/components/BaseButton.vue'

defineProps<{
  category?: categoriesResponse
  errorMessage?: string
}>()

defineEmits<{
  (e: 'open-categories'): void
}>()
</script>

<style scoped></style>
