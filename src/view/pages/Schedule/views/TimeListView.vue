<template>
  <div class="bg-gray-100 roundsed-2xl w-full h-full p-10 flex flex-col max-sm:p-4 !max-sm:pt-4">
    <template v-if="queryInitialLoading">
      <div class="w-full h-full flex justify-center items-center">
        <base-spinner class="w-10 h-10" />
      </div>
    </template>

    <template v-else>
      <header>
        <div class="mb-2 flex items-center justify-between">
          <AppointmentStatusDropdown
            :selected="filters.type"
            @select="handleSelectTypeTransaction"
          />

          <button type="button" class="cursor-pointer" @click="toggleFiltersModal">
            <filter-icon />
          </button>
        </div>
        <TransactionDatesSlider
          ref="test"
          class="!mt-0"
          :filter="filters.period"
          :value="filters.date"
          @slide-start="() => (slideLoading = true)"
          @change-value="handleSwiperChange"
        />
      </header>

      <div
        v-if="queryLoading"
        class="mt-4 flex space-y-2 flex-1 flex-col items-center justify-center"
      >
        <base-spinner class="w-10" />
      </div>

      <div v-else class="mt-4 space-y-2 flex-1 relative rounded-2xl">
        <template v-if="data && !data.length">
          <div class="flex flex-col items-center justify-center h-full">
            <img :src="emptyState" alt="empty state" />
            <p class="text-gray-700 text-center">Nenhum horário reservado</p>
          </div>
        </template>
        <template v-else>
          <div class="absolute w-full h-full">
            <base-scroll-bar>
              <TimeListItem
                v-for="(appointment, index) in data"
                :name="appointment.customer.name"
                :id="appointment.id"
                :start="appointment.start"
                :employee-name="appointment.employee.name"
                :status="appointment.status"
                :employee-id="!filters.employeeId"
                :date-format="dateFormat"
                :services="appointment.service"
                :key="index"
              />
            </base-scroll-bar>
          </div>
        </template>
      </div>
    </template>
    <FiltersModal
      :open="isOpenFiltersModal"
      :showNonProfessional="false"
      @close="toggleFiltersModal"
      @apply-filters="handleApplyFilters"
    />
  </div>
</template>

<script setup>
import { TransactionDatesSlider } from '../../DashBoard/components/Transactions/TransactionDatesSlider'
import BaseScrollBar from '@/view/components/BaseScrollBar.vue'
import { computed, ref } from 'vue'
import FilterIcon from '@/view/components/icons/FilterIcon.vue'
import BaseSpinner from '@/view/components/BaseSpinner.vue'
import { PERIODS } from '@/app/config/constants/dates'
import FiltersModal from '../../DashBoard/components/modals/FiltersModal.vue'
import AppointmentStatusDropdown from '../components/AppointmentStatusDropdown.vue'
import { useAppointmentStore } from '@/app/store/useAppointmentStore'
import { storeToRefs } from 'pinia'
import emptyState from '@/assets/empty-state.svg'
import TimeListItem from '../components/TimeListItem.vue'

const appointmentStore = useAppointmentStore()
const { filters, data, queryInitialLoading, queryLoading } = storeToRefs(appointmentStore)

const dateFormat = computed(() => {
  return filters.value.period !== PERIODS.diary ? 'dd/MM - pp' : 'pp'
})

const isOpenFiltersModal = ref(false)

const toggleFiltersModal = () => {
  return (isOpenFiltersModal.value = !isOpenFiltersModal.value)
}
const handleSelectTypeTransaction = (v) => {
  appointmentStore.handleChangeFilters('type', v)
}

const handleApplyFilters = ({ employeeId, period }) => {
  appointmentStore.handleChangeFilters('employeeId', employeeId)
  appointmentStore.handleChangeFilters('period', period)
  toggleFiltersModal()
}

const handleSwiperChange = (value) => {
  appointmentStore.handleChangeFilters('date', value)
}
</script>

<style lang="scss" scoped></style>
