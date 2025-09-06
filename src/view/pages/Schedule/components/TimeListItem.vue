<template>
  <div
    id="time-item"
    class="bg-white mb-4 p-4 rounded-2xl w-[95%] flex items-center gap-0.5 flex-col justify-between cursor-pointer border-2 border-solid border-transparent"
    :class="{ '!opacity-50': disableItemBasedInStatus }"
    @click="handleClick"
  >
    <div class="w-full flex justify-between items-center">
      <strong class="font-bold tracking-[-0.5px] block truncate w-3/5">
        {{ services }}
      </strong>

      <strong class="font-bold tracking-[-0.5px] block truncate w-1/3 text-end">
        {{ name }}
      </strong>
    </div>

    <div class="w-full flex justify-between items-center">
      <span class="text-sm text-gray-600">
        {{ format(start, dateFormat) }}
      </span>
      <span class="text-end" :class="getStatusColor(status)">
        {{ APPOINTMENT_TEXT[status] }}
      </span>
    </div>

    <div class="flex justify-between w-full items-center">
      <span class="text-sm text-gray-600">{{ employeeName }} </span>
    </div>
  </div>
</template>

<script setup>
import { format } from '@/app/utils/formatDate'
import { APPOINTMENT_STATUS, APPOINTMENT_STATUS_LABEL } from '@/app/config/constants/appointment'
import { useAppointmentStore } from '@/app/store/useAppointmentStore'
import { computed } from 'vue'

const appointmentStore = useAppointmentStore()

const APPOINTMENT_TEXT = {
  [APPOINTMENT_STATUS.CONFIRMED]: APPOINTMENT_STATUS_LABEL.CONFIRMED,
  [APPOINTMENT_STATUS.RESERVED]: 'Reservado',
  [APPOINTMENT_STATUS.CANCELLED]: APPOINTMENT_STATUS_LABEL.CANCELLED
}

function getStatusColor(status) {
  return {
    'text-yellow-700': status === APPOINTMENT_STATUS.RESERVED,
    'text-teal-600': status === APPOINTMENT_STATUS.CONFIRMED,
    'text-red-900': status === APPOINTMENT_STATUS.CANCELLED
  }
}

const props = defineProps({
  employeeId: Boolean,
  employeeName: String,
  name: String,
  start: String,
  status: String,
  dateFormat: String,
  id: String,
  services: Array
})

const disableItemBasedInStatus = computed(() => {
  return (
    appointmentStore.selectedItems.findIndex((item) => item.status === props.status) === -1 &&
    appointmentStore.selectedItems.length !== 0
  )
})

const services = computed(() => {
  return props.services.map((item) => item.name).join(', ')
})

function handleClick(e) {
  if (disableItemBasedInStatus.value) {
    return
  }

  e.currentTarget.classList.toggle('selected')
  appointmentStore.toggleSelectedItems({ status: props.status, id: props.id })
}
</script>

<style>
#time-item.selected {
  border-color: #087f5b;
}
</style>
