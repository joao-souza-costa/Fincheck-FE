<template>
  <base-modal
    class="min-h-[600px] transition-all duration-700"
    :title="labels.title"
    :open="isOpen"
    @update:open="tabs[currentTab].closeFn"
  >
    <template #right-action>
      <trash-icon
        v-if="transaction && !isCategoriesListTab"
        role="button"
        class="w-6 h-6 text-red-800"
        @click="$emit('delete', transaction.id)"
      />
      <settings-icon
        v-if="isCategoriesListTab"
        role="button"
        class="w-6 h-6 text-teal-800"
        @click="handleAddCategories"
      />
    </template>

    <transition :name="transition" mode="out-in">
      <keep-alive>
        <component
          :is="tabs[currentTab].component"
          :type="type"
          :initial-values="transaction"
          :category="category"
          :is-loading="loading"
          v-bind="labels"
          @submit="tabs[currentTab].submitFn"
          @open-categories="setCategories"
          @add-category="handleAddCategories"
        />
      </keep-alive>
    </transition>
  </base-modal>
</template>

<script lang="ts" setup>
import TrashIcon from '@/view/components/icons/TrashIcon.vue'
import SettingsIcon from '@/view/components/icons/SettingsIcon.vue'
import type { Transaction } from '@/app/services/TransactionService'
import BaseModal from '@/view/components/BaseModal.vue'

import { type tProps, useBaseTransactionModalController } from './BaseTransactionModalController'

const props = defineProps<tProps>()

const emit = defineEmits<{
  close: []
  delete: [id: string]
  create: [values: Transaction]
  update: [id: string, values: Transaction]
}>()

const {
  tabs,
  isCategoriesListTab,
  setCategories,
  currentTab,
  transition,
  category,
  handleAddCategories
} = useBaseTransactionModalController(props, emit)
</script>