<!-- //TOOD REATIVAR A LISTA DE CATEGORIAS MAIS PRA FRENTE  -->

<template>
  <section class="h-[511px]">
    <div
      class="flex flex-col items-center justify-center h-full"
      v-if="!categoriesFiltered?.length"
    >
      <img :src="emptyState" alt="empty state" />
      <p class="text-gray-700 text-center">Não encontramos nenhuma categoria</p>
      <base-button class="w-full mt-5" variant="PRIMARY" @click="$emit('add-category')"
        >Adicionar!</base-button
      >
    </div>

    <base-scroll-bar v-if="categoriesFiltered?.length" class="px-4">
      <category-option
        class="mt-2"
        v-for="category in categoriesFiltered"
        :key="category.id"
        :icon="category.icon"
        :name="category.name"
        :type="category.type"
        @click="$emit('submit', category)"
      />
    </base-scroll-bar>
  </section>
</template>

<script setup lang="ts">
import BaseScrollBar from '@/view/components/BaseScrollBar.vue'
import CategoryOption from './CategoryOption.vue'
import emptyState from '@/assets/empty-state.svg'
import { useCategoriesListController } from './CategoriesListController'
import type { categoriesResponse } from '@/app/services/ServicesService'
import type { TRANSACTION_TYPE } from '@/app/config/constants/transaction'

import BaseButton from '@/view/components/BaseButton.vue'

type tEmit = {
  (e: 'submit', category: categoriesResponse): void
  (e: 'add-category'): void
}

const props = defineProps<{
  type: TRANSACTION_TYPE
}>()

const { categoriesFiltered } = useCategoriesListController(props.type)

defineEmits<tEmit>()
</script>
