<template>
  <div class="day-list">
    <div
      v-for="(day, i) in getNextDaysOpen"
      :key="i"
      :class="isSelected(day.value)"
      @click="setSelectedDate(day.value)"
    >
      <span class="weekday">{{ day.weekday }}</span>
      <span class="day">{{ day.day }}</span>
    </div>
    <div class="item">
      <VueDatePicker
        ref="datepicker"
        :model-value="selectedDate"
        :disabled-week-days="disabledDays"
        :action-row="hideActionRow"
        :enable-time-picker="false"
        :format-locale="ptBR"
        model-type="iso"
        utc="preserve"
        no-today
        auto-apply
        disable-year-select
        hide-offset-dates
        @update:model-value="setSelectedDate"
        @date-update="getDay"
      >
        <template #trigger>
          <span class="icon-container">
            <CalendarIcon class="icon" />
          </span>
        </template>
      </VueDatePicker>
    </div>
  </div>
</template>

<script setup>
import { addDays } from 'date-fns'
import { computed, onMounted, ref, watch } from 'vue'
import { ptBR } from 'date-fns/locale'
//import CalendarIcon from '@/views/components/icons/CalendarIcon.vue'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import { format } from '@/app/utils/formatDate'
import { useEmployeeStore } from '@/app/store/useEmployeeStore'
import CalendarIcon from '@/view/components/icons/CalendarIcon.vue'

const hideActionRow = { showSelect: false, showCancel: false }
const MAX_DAYS_TO_DISPLAY = 4

const DAYS_OF_WEEK_AS_NUMBER = {
  SUNDAY: 0,
  MONDAY: 1,
  TUESDAY: 2,
  WEDNESDAY: 3,
  THURSDAY: 4,
  FRIDAY: 5,
  SATURDAY: 6
}

const emloyeesStore = useEmployeeStore()

const emit = defineEmits(['selected'])

const props = defineProps({
  employeeId: { type: String }
})

const selectedDay = ref(new Date().setHours(0, 0, 0, 0))

const employeeDaysWork = computed(() => {
  if (props.employeeId) {
    return emloyeesStore.openingHours.filter((opening) => opening.employeeId === props.employeeId)
  }
  return emloyeesStore.openingHours || []
})

const disabledDays = computed(() => {
  const dDays = []
  for (let count = 0; count <= 6; count++) {
    const hasday = employeeDaysWork.value.findIndex(
      (openingHour) => DAYS_OF_WEEK_AS_NUMBER[openingHour.weekday] === count
    )
    if (hasday === -1) {
      dDays.push(count)
    }
  }

  return dDays
})

const getNextDaysOpen = computed(() => {
  const days = []
  let count = 0

  while (count <= 6) {
    const nextDay = addDays(selectedDay.value, count)
    const day = employeeDaysWork.value.findIndex(
      (openingHour) => DAYS_OF_WEEK_AS_NUMBER[openingHour.weekday] === nextDay.getUTCDay()
    )

    if (day !== -1) {
      days.push({
        value: nextDay.toISOString(),
        weekday: format(nextDay, 'iiiiii'),
        day: format(nextDay, 'MMM') + ' ' + nextDay.getUTCDate()
      })
    }
    count++
  }

  return days
})

const selectedDate = ref(null)

function isSelected(value) {
  return {
    item: true,
    selected: value === selectedDate.value
  }
}

function setSelectedDate(value) {
  selectedDate.value = value
  emit('selected', value)
}

function getDay(v) {
  selectedDay.value = new Date(v).setHours(0, 0, 0, 0)
}

watch(
  () => props.employeeId,
  () => {
    setSelectedDate(getNextDaysOpen.value[0]?.value)
  }
)

onMounted(() => {
  setSelectedDate(getNextDaysOpen.value[0]?.value)
})
</script>

<style lang="scss">
.icon-container {
  display: flex !important;
  align-items: center;
  justify-content: center;
}

:root {
  --dp-font-family: 'DM Sans', sans-serif;
  --dp-font-size: 16px; /*Default font-size*/
  --dp-preview-font-size: 13px; /*Font size of the date preview in the action row*/
  --dp-time-font-size: 13px; /*Font size in the time picker*/
}

.day-list {
  display: flex;
  flex-direction: row;
  gap: 6px;

  .item {
    cursor: pointer;
    border: 1px solid #c7c9d9;
    background-color: white;
    border-radius: 8px;
    padding: 6px 0;
    display: flex;
    flex-direction: column;
    gap: 4px;
    justify-content: center;
    align-items: center;
    flex: 1;

    & > span:first-letter {
      text-transform: uppercase;
    }

    .day,
    .weekday {
      font-weight: 500;
    }
    .icon-container {
      text-align: center;
      display: block;
      .icon {
        color: black;
        width: 24px;
        height: 24px;
      }
    }
  }

  @media (pointer: fine) {
    .item:hover {
      transition: all 1s;
      border-color: #12b886;

      .weekday,
      .icon,
      .day {
        transition: all 1s;

        color: #12b886;
      }
    }
  }

  .item.selected {
    transition: all 1s;
    border-color: #12b886;

    .weekday,
    .icon,
    .day {
      transition: all 1s;

      color: #12b886;
    }
  }
}
</style>
