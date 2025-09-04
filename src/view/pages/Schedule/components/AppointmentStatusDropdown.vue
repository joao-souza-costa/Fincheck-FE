<template>
  <BaseDropdown.Root>
    <BaseDropdown.Trigger>
      <button class="flex items-center gap-2 cursor-pointer" type="button">
        <template v-if="selected === APPOINTMENT_STATUS.CONFIRMED"> <CheckIcon /> </template>
        <template v-else-if="selected === APPOINTMENT_STATUS.RESERVED"> <ClockIcon /> </template>
        <template v-else-if="selected === APPOINTMENT_STATUS.CANCELLED"> <CrossCircle /> </template>

        <template v-else> <ScheduleIcon /> </template>

        <span class="text-sm text-gray-800 tracking-[-0.5px] font-medium">
          <template v-if="selected === APPOINTMENT_STATUS.CONFIRMED"> Confirmados </template>
          <template v-else-if="selected === APPOINTMENT_STATUS.RESERVED"> Reservados </template>
          <template v-else-if="selected === APPOINTMENT_STATUS.CANCELLED"> Cancelados </template>
          <template v-else> Todos </template>
        </span>
        <chevron-down-icon />
      </button>
    </BaseDropdown.Trigger>

    <BaseDropdown.Content class="w-[279px]">
      <BaseDropdown.Item class="gap-2" @select="$emit('select', APPOINTMENT_STATUS.CONFIRMED)">
        <CheckIcon />
        Confirmados
      </BaseDropdown.Item>

      <BaseDropdown.Item class="gap-2" @select="$emit('select', APPOINTMENT_STATUS.RESERVED)">
        <ClockIcon />
        Reservados
      </BaseDropdown.Item>

      <BaseDropdown.Item class="gap-2" @select="$emit('select', APPOINTMENT_STATUS.CANCELLED)">
        <CrossCircle />
        Cancelados
      </BaseDropdown.Item>

      <BaseDropdown.Item class="gap-2" @select="$emit('select', undefined)">
        <ScheduleIcon />
        Todos
      </BaseDropdown.Item>
    </BaseDropdown.Content>
  </BaseDropdown.Root>
</template>

<script setup lang="ts">
import { APPOINTMENT_STATUS } from '@/app/config/constants/appointment'
import CrossCircle from '@/assets/CrossCircle.vue'
import BaseDropdown from '@/view/components/Dropdown/BaseDropdown.js'
import CheckIcon from '@/view/components/icons/CheckIcon.vue'
import ChevronDownIcon from '@/view/components/icons/ChevronDownIcon.vue'
import ClockIcon from '@/view/components/icons/ClockIcon.vue'
import ScheduleIcon from '@/view/components/icons/ScheduleIcon.vue'

type tEmits = {
  select: [v: APPOINTMENT_STATUS | undefined]
}

defineEmits<tEmits>()
defineProps<{
  selected?: APPOINTMENT_STATUS | undefined
}>()
</script>

<style scoped></style>
