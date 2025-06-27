<template>
  <div>
    <BasePopover.Root :open="isOpen">
      <BasePopover.Trigger>
        <button
          type="button"
          class="relative bg-white w-full rounded-lg border text-start border-gray-500 px-3 pt-4 h-[55px] text-gray-800 outline-none focus:border-gray-800 transition-all"
          :class="[errorMessage && '!border-red-900 text-red-900']"
          @click="toggleOpen"
        >
          <label class="absolute left-[13px] top-1 pointer-events-none text-xs text-gray-700">
            Data
          </label>
          <span>{{ formatDate(internalValue) }}</span>
        </button>
      </BasePopover.Trigger>

      <BasePopover.Content class="w-80 text-red-400">
        <VueDatePicker
          week-start="0"
          :model-value="internalValue"
          inline
          auto-apply
          :hide-navigation="['time', 'year', 'month']"
          month-name-format="long"
          menu-class-name="dp-custom-menu"
          calendar-cell-class-name="dp-custom-cell"
          locale="pt-BR"
          format="MM"
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
import { formatDate } from '@/app/utils/formatDate'
import CrossCircle from '@/assets/CrossCircle.vue'
import { computed, ref, toRef, watch } from 'vue'
import { useField } from 'vee-validate'

type iProps = {
  name: string
}

const props = defineProps<iProps>()

const isOpen = ref<boolean>(false)

const toggleOpen = (v: any): void => {
  if (isOpen.value) internalValue.value = v
  isOpen.value = !isOpen.value
}

const name = toRef(props, 'name')

const internalValue = computed<Date>({
  get() {
    return value.value as Date
  },
  set(v) {
    v instanceof Date && setValue(v)
  }
})

const { errorMessage, value, setValue } = useField(name, undefined)
</script>

<style>
.dp__theme_light {
  --dp-primary-color: rgb(8 127 91 / var(--tw-bg-opacity));
  --dp-icon-color: rgb(8 127 91 / var(--tw-bg-opacity));
  --dp-menu-border-color: #fff;

  .dp__outer_menu_wrap {
    width: 100%;
  }
}

.dp-custom-menu {
  border-radius: 16px;
}

.dp-custom-cell {
  border-radius: 50%;
}
</style>
