<template>
  <div class="time-picker">
    <BasePopover.Root :open="isOpen">
      <BasePopover.Trigger>
        <button
          type="button"
          class="relative bg-white w-full rounded-lg border text-start border-gray-500 px-3 pt-4 h-[55px] text-gray-800 outline-none focus:border-gray-800 transition-all"
          :class="[errorMessage && '!border-red-900 text-red-900']"
          @click="toggleOpen"
        >
          <label class="absolute left-[13px] top-1 pointer-events-none text-xs text-gray-700">
            Horário de atendimento
          </label>
          <span>{{ formattedValue }}</span>
        </button>
      </BasePopover.Trigger>

      <BasePopover.Content class="w-80 text-red-400">
        <VueDatePicker
          v-model="value"
          :start-time
          time-picker
          minutes-increment="5"
          inline
          :range="{ disableTimeRangeValidation: true }"
          placeholder="Select Time"
          locale="pt-BR"
          @update:model-value="toggleOpen"
        />
      </BasePopover.Content>
    </BasePopover.Root>

    <div v-if="errorMessage" class="flex gap-1 items-center mt-2 text-red-900">
      <CrossCircle />
      <span class="text-xs"> {{ errorMessage }} </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import VueDatePicker from '@vuepic/vue-datepicker'
import BasePopover from '@/view/components/Popover/BasePopover'
import CrossCircle from '@/assets/CrossCircle.vue'
import { computed, onMounted, ref, toRef, watch } from 'vue'
import { useField } from 'vee-validate'

type iProps = {
  name: string
  startTime?: Record<string, any>[]
}

const props = defineProps<iProps>()

const isOpen = ref<boolean>(false)
const value = ref(props.startTime)

const toggleOpen = (v: any): void => {
  if (isOpen.value) value.value = v
  isOpen.value = !isOpen.value
}

const name = toRef(props, 'name')

const formattedValue = computed(() => {
  if (!Array.isArray(value.value)) {
    return ''
  }
  const [start, end] = value.value

  return `${addPad(start.hours)}:${addPad(start.minutes)} até ${addPad(end.hours)}:${addPad(end.minutes)}`
})

function addPad(v: number) {
  return String(v).padStart(2, '0')
}

function setValueInField(v: any) {
  if (v.length === 0) {
    return
  }

  const [start, end] = v

  const time = {
    openHourInMinutes: start.hours * 60 + start.minutes,
    closeHourInMinutes: end.hours * 60 + end.minutes
  }

  setValue(time)
}

watch(value, setValueInField)

const { errorMessage, setValue } = useField(name)

onMounted(() => {
  console.log(props.startTime)
  if (props.startTime) setValueInField(props.startTime)
})
</script>

<style>
.time-picker {
  .dp__theme_light {
    --dp-menu-border-color: #fff;
  }
}
</style>
