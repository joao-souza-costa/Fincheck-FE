<template>
  <div class="bg-gray-100 rounded-2xl w-full h-full p-10 flex flex-col max-sm:p-4">
    <template v-if="initialLoading">
      <div class="w-full h-full flex justify-center items-center">
        <base-spinner class="w-10 h-10" />
      </div>
    </template>

    <template v-else>
      <header>
        <div class="flex items-center justify-between">
          <TransactionsDropdown :selected="filters.type" @select="handleSelectTypeTransaction" />
          <button @click="toggleFiltersModal">
            <filter-icon />
          </button>
        </div>
        <TransactionDatesSlider
          :filter="filters.period"
          :value="filters.date"
          @slide-start="() => (slideLoading = true)"
          @change-value="handleSwiperChange"
        />
      </header>
      <div
        v-if="transactionsLoading"
        class="mt-4 flex space-y-2 flex-1 flex-col items-center justify-center"
      >
        <base-spinner class="w-10" />
      </div>

      <div v-else class="mt-4 space-y-2 flex-1 relative rounded-2xl">
        <template v-if="!data?.transactions.length">
          <div class="flex flex-col items-center justify-center h-full">
            <img :src="emptyState" alt="empty state" />
            <p class="text-gray-700 text-center">Não encontramos nenhuma transação</p>
          </div>
        </template>
        <template v-if="data?.transactions?.length">
          <div class="absolute w-full h-full">
            <base-scroll-bar>
              <div
                v-for="(transaction, index) in data.transactions"
                :key="index"
                class="bg-white mb-4 p-4 rounded-2xl w-[95%] flex items-center justify-between gap-4 cursor-pointer"
                @click.stop="toggleTransactionModal(transaction.type, transaction)"
              >
                <div class="flex-1 flex items-center gap-3 w-[50%]">
                  <CategoryIcon :type="transaction.type" />
                  <div class="w-[65%]">
                    <strong class="font-bold tracking-[-0.5px] block truncate">{{
                      transaction.name
                    }}</strong>
                    <span class="text-sm text-gray-600">{{
                      formatDate(new Date(transaction.date))
                    }}</span>
                  </div>
                </div>
                <div class="flex flex-col justify-between items-end gap-1">
                  <base-balance
                    class="tracking-[-0.5px] font-medium"
                    :class="[
                      transaction.type === TRANSACTION_TYPE.EXPENSE
                        ? 'text-red-800'
                        : 'text-green-800'
                    ]"
                    :balance="transaction.value"
                  />

                  <base-balance
                    v-if="transaction.type === TRANSACTION_TYPE.INCOME"
                    class="tracking-[-0.5px] font-medium text-yellow-700"
                    :balance="transaction.commissionedValue"
                  />
                </div>
              </div>
            </base-scroll-bar>
          </div>
        </template>
      </div>
    </template>
    <filters-modal
      :open="isOpenFiltersModal"
      @close="toggleFiltersModal"
      @apply-filters="handleApplyFilters"
      show-non-professional
      show-periods-filter
    />
  </div>
</template>

<script lang="ts" setup>
import { useTransactionsController } from './transactionsConstroller'
import BaseSpinner from '@/view/components/BaseSpinner.vue'
import FilterIcon from '@/view/components/icons/FilterIcon.vue'
import { TransactionDatesSlider } from './Transactions/TransactionDatesSlider'
import CategoryIcon from '@/view/components/icons/categories/CategoryIcon.vue'
import BaseBalance from '@/view/components/BaseBalance.vue'
import emptyState from '@/assets/empty-state.svg'
import TransactionsDropdown from './Transactions/TransactionsDropdown.vue'
import FiltersModal from './modals/FiltersModal.vue'
import { formatDate } from '@/app/utils/formatDate'
import { MODALS_PROVIDER, type modalsProviderProps } from '../providers/modalsProvider'
import { inject } from 'vue'
import { TRANSACTION_TYPE } from '@/app/config/constants/transaction'
import BaseScrollBar from '@/view/components/BaseScrollBar.vue'

const { toggleTransactionModal } = inject(MODALS_PROVIDER) as modalsProviderProps
const {
  filters,
  transactionsLoading,
  data,
  initialLoading,
  isOpenFiltersModal,
  slideLoading,
  toggleFiltersModal,
  handleSwiperChange,
  handleApplyFilters,
  handleSelectTypeTransaction
} = useTransactionsController()
</script>

<style>
#transaction-view .swiper-slide-active button {
  background-color: white;
}
</style>
