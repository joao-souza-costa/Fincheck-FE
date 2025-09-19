<template>
  <div class="fixed right-4 bottom-4 z-10">
    <button
      v-if="appointmentStore.selectedItemType === APPOINTMENT_STATUS.RESERVED"
      type="button"
      class="text-white bg-teal-900 cursor-pointer w-12 h-12 rounded-full flex justify-center items-center outline-none"
      @click="$emit('confirmAppointments')"
    >
      <check-icon class="w-6 h-6" />
    </button>
    <button
      v-if="appointmentStore.selectedItemType === APPOINTMENT_STATUS.CONFIRMED"
      class="text-white bg-red-900 cursor-pointer w-12 h-12 rounded-full flex justify-center items-center outline-none"
      @click="$emit('cancelAppointments')"
    >
      <cross-icon class="w-6 h-6" />
    </button>
    <BaseDropdown.Root>
      <BaseDropdown.Trigger>
        <button
          v-show="appointmentStore.selectedItemType === 'NONE'"
          class="text-white bg-teal-900 cursor-pointer w-12 h-12 rounded-full flex justify-center items-center outline-none  md:hidden"
        >
          <plus-icon class="w-6 h-6" />
        </button>
      </BaseDropdown.Trigger>
      <BaseDropdown.Content>
        <BaseDropdown.Item @click="scheduleProvider.toggleModal('CREATE')" class="gap-2">
          <ScheduleRect />
          Novo Atendimento
        </BaseDropdown.Item>
      </BaseDropdown.Content>
    </BaseDropdown.Root>
  </div>
</template>

<script setup>
import BaseDropdown from '@/view/components/Dropdown/BaseDropdown.js'
import BankAccountIcon from '@/view/components/icons/BankAccountIcon.vue'
import ExpenseCategory from '@/view/components/icons/categories/expense/ExpenseCategory'
import PlusIcon from '@/view/components/icons/PlusIcon.vue'
import IncomeIcon from '@/view/components/icons/categories/income/IncomeIcon'
import { computed, inject } from 'vue'

import { useEmployeeStore } from '@/app/store/useEmployeeStore'
import { TRANSACTION_TYPE } from '@/app/config/constants/transaction'
import ScheduleRect from '@/view/components/icons/ScheduleRect.vue'
import { useAppointmentStore } from '@/app/store/useAppointmentStore'
import { APPOINTMENT_STATUS } from '@/app/config/constants/appointment'
import CheckIcon from '@/view/components/icons/CheckIcon.vue'
import CrossIcon from '@/view/components/icons/CrossIcon.vue'

const scheduleProvider = inject('scheduleProvider')
const appointmentStore = useAppointmentStore()

defineEmits(['confirmAppointments', 'cancelAppointments'])
</script>
