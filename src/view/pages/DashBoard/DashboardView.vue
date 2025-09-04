<template>
  <div class="h-full">
    <main class="flex-1 h-full flex flex-col md:flex-row gap-4">
      <div class="w-full md:max-w-[49.5%]">
        <employees-view />
      </div>
      <div class="w-full md:max-w-[49.5%] max-sm:min-h-[600px]">
        <transactions-view id="transaction-view" />
      </div>
    </main>

    <base-fab v-if="userStore.isOwner" />
    <employee-modals />
    <transaction-modals />
  </div>
</template>

<script setup lang="ts">
import EmployeesView from './components/EmployeesView.vue'
import TransactionsView from './components/TransactionsView.vue'
import BaseFab from '@/view/components/BaseFab.vue'
import EmployeeModals from './components/Modals/EmployeeModals.vue'
import { useBalanceProvider } from './providers/balanceProvider'
import { useModalsProvider } from './providers/modalsProvider'
import TransactionModals from './components/Modals/TransactionModals/TransactionModals.vue'
import { useUserStore } from '@/app/store/useUserStore'

const userStore = useUserStore()

useBalanceProvider()
useModalsProvider()
</script>

<style scoped></style>
