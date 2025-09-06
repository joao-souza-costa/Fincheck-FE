<template>
  <div class="fixed right-4 bottom-4 z-10">
    <BaseDropdown.Root>
      <BaseDropdown.Trigger>
        <button
          class="text-white bg-teal-900 cursor-pointer w-12 h-12 rounded-full flex justify-center items-center outline-none"
        >
          <plus-icon class="w-6 h-6" />
        </button>
      </BaseDropdown.Trigger>

      <BaseDropdown.Content>
        <BaseDropdown.Item
          class="gap-2"
          @click="hasAccounts && toggleTransactionModal(TRANSACTION_TYPE.EXPENSE)"
        >
          <ExpenseCategory />
          <span :class="[!hasAccounts && 'opacity-50']">Nova Despesa</span>
        </BaseDropdown.Item>

        <BaseDropdown.Item
          class="gap-2"
          @click="hasAccounts && toggleTransactionModal(TRANSACTION_TYPE.INCOME)"
        >
          <IncomeIcon />
          <span :class="[!hasAccounts && 'opacity-50']"> Nova Receita </span>
        </BaseDropdown.Item>

        <BaseDropdown.Item @click="toggleEmployeeModal('CREATE')" class="gap-2">
          <BankAccountIcon />
          Novo profissional
        </BaseDropdown.Item>
      </BaseDropdown.Content>
    </BaseDropdown.Root>
  </div>
</template>

<script setup lang="ts">
import BaseDropdown from '@/view/components/Dropdown/BaseDropdown.js'
import BankAccountIcon from '@/view/components/icons/BankAccountIcon.vue'
import ExpenseCategory from '@/view/components/icons/categories/expense/ExpenseCategory'
import PlusIcon from '@/view/components/icons/PlusIcon.vue'
import IncomeIcon from '@/view/components/icons/categories/income/IncomeIcon'
import { computed, inject } from 'vue'
import {
  MODALS_PROVIDER,
  type modalsProviderProps
} from '@/view/pages/DashBoard/providers/modalsProvider'
import { useEmployeeStore } from '@/app/store/useEmployeeStore'
import { TRANSACTION_TYPE } from '@/app/config/constants/transaction'

const { toggleEmployeeModal, toggleTransactionModal } = inject(
  MODALS_PROVIDER
) as modalsProviderProps

const accountsStore = useEmployeeStore()

const hasAccounts = computed(() => {
  return accountsStore.employees?.length
})
</script>
