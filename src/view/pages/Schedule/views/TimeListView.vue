<template>
  <div class="bg-gray-100 rounded-2xl w-full h-full p-10 flex flex-col max-sm:p-4 !max-sm:pt-4">
    <template v-if="false">
      <div class="w-full h-full flex justify-center items-center">
        <base-spinner class="w-10 h-10" />
      </div>
    </template>

    <template v-else>
      <header>
        <div class="flex items-center justify-between">
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

      <div v-if="false" class="mt-4 flex space-y-2 flex-1 flex-col items-center justify-center">
        <base-spinner class="w-10" />
      </div>

      <div v-else class="mt-4 space-y-2 flex-1 relative rounded-2xl">
        <template v-if="data && !data.length">
          <div class="flex flex-col items-center justify-center h-full">
            <img :src="emptyState" alt="empty state" />
            <p class="text-gray-700 text-center">Nenhum horário reservado para este dia</p>
          </div>
        </template>
        <template v-else>
          <div class="absolute w-full h-full">
            <base-scroll-bar>
              <div
                v-for="(appointment, index) in data"
                :key="index"
                class="bg-white mb-4 p-4 rounded-2xl w-[95%] flex items-center justify-between gap-4 cursor-pointer"
              >
                <div class="w-full flex items-center gap-3">
                  <div>
                    <strong class="font-bold tracking-[-0.5px] block truncate">
                      {{ appointment.customer.name }}
                    </strong>
                    <span class="text-sm text-gray-600">
                      {{ format(appointment.start, dateFormat) }}
                      <span v-if="!filters.employeeId"> - {{ appointment.employee.name }} </span>
                    </span>
                  </div>
                </div>

                <div
                  class="flex flex-col justify-between items-end gap-1"
                  :class="getStatusColor(appointment.status)"
                >
                  {{ APPOINTMENT_TEXT[appointment.status] }}
                </div>
              </div>
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
import { format } from '@/app/utils/formatDate'
import { computed, ref } from 'vue'
import FilterIcon from '@/view/components/icons/FilterIcon.vue'
import BaseSpinner from '@/view/components/BaseSpinner.vue'
import { PERIODS } from '@/app/config/constants/dates'
import { APPOINTMENT_STATUS, APPOINTMENT_STATUS_LABEL } from '@/app/config/constants/appointment'
import FiltersModal from '../../DashBoard/components/modals/FiltersModal.vue'
import AppointmentStatusDropdown from '../components/AppointmentStatusDropdown.vue'
import { useAppointmentStore } from '@/app/store/useAppointmentStore'
import { storeToRefs } from 'pinia'
import emptyState from '@/assets/empty-state.svg'

const APPOINTMENT_TEXT = {
  [APPOINTMENT_STATUS.CONFIRMED]: APPOINTMENT_STATUS_LABEL.CONFIRMED,
  [APPOINTMENT_STATUS.RESERVED]: 'Aguardando aprovação',
  [APPOINTMENT_STATUS.CANCELLED]: APPOINTMENT_STATUS_LABEL.CANCELLED
}

const appointmentStore = useAppointmentStore()
const { filters, data } = storeToRefs(appointmentStore)

function getStatusColor(status) {
  return {
    'text-yellow-700': status === APPOINTMENT_STATUS.RESERVED,
    'text-teal-600': status === APPOINTMENT_STATUS.CONFIRMED,
    'text-red-900': status === APPOINTMENT_STATUS.CANCELLED
  }
}

/*const data = ref([ 
  {
    start: '2025-07-21T19:30:00.073Z',
    status: 'RESERVED',
    customer: {
      name: 'Maisa'
    }
  },
  {
    start: '2025-07-21T19:30:00.073Z',
    status: 'RESERVED',
    customer: {
      name: 'Janaina '
    }
  },
  {
    start: '2025-07-21T19:30:00.073Z',
    status: 'CONFIRMED',
    customer: {
      name: 'Joao Souza'
    }
  },
  {
    start: '2025-07-21T19:30:00.073Z',
    status: 'CONFIRMED',
    customer: {
      name: 'Joao Souza'
    }
  },
  {
    start: '2025-07-21T19:30:00.073Z',
    status: 'CONFIRMED',
    customer: {
      name: 'Joao Souza'
    }
  }
 ])*/

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
