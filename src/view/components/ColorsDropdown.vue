<template>
  <div>
    <BaseDropdown.Root>
      <BaseDropdown.Trigger>
        <button
          class="relative cursor-pointer bg-white w-full rounded-lg border text-start border-gray-500 px-3 h-[55px] text-gray-800 outline-none focus:border-gray-800 transition-all"
          :class="[errorMessage && '!border-red-900 text-red-900']"
        >
          Cor

          <div class="absolute right-3 bottom-3">
            <ChevronDownIcon v-if="!selected" class="w-6 h-6 text-gray-800" />
            <color-icon v-if="selected" :bg="selected.bg" :color="selected.color" />
          </div>
        </button>
      </BaseDropdown.Trigger>

      <BaseDropdown.Content class="grid grid-cols-4">
        <BaseDropdown.Item v-for="color in colors" :key="color.bg" @select="handleSelect(color)">
          <color-icon :bg="color.bg" :color="color.color" />
        </BaseDropdown.Item>
      </BaseDropdown.Content>
    </BaseDropdown.Root>

    <div v-if="errorMessage" class="flex gap-1 items-center mt-2 text-red-900">
      <CrossCircle />
      <span class="text-xs"> {{ errorMessage }} </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import CrossCircle from '@/assets/CrossCircle.vue'
import BaseDropdown from '@/view/components/Dropdown/BaseDropdown'
import ChevronDownIcon from '@/view/components/icons/ChevronDownIcon.vue'
import ColorIcon from '@/view/components/icons/ColorIcon.vue'
import { useField } from 'vee-validate'
import { ref, toRef } from 'vue'

type iProps = {
  initialValue?: string
  name: string
}

const props = withDefaults(defineProps<iProps>(), {
  initialValue: ''
})

interface ColorsDictionary {
  [key: Color['color']]: Color
}

type Color = {
  color: string
  bg: string
}

const colors: ColorsDictionary = {
  '#868E96': { color: '#868E96', bg: '#F8F9FA' },
  '#FA5252': { color: '#FA5252', bg: '#FFF5F5' },
  '#E64980': { color: '#E64980', bg: '#FFF0F6' },
  '#BE4BDB': { color: '#BE4BDB', bg: '#F8F0FC' },
  '#7950F2': { color: '#7950F2', bg: '#F3F0FF' },
  '#4C6EF5': { color: '#4C6EF5', bg: '#EDF2FF' },
  '#228BE6': { color: '#228BE6', bg: '#E7F5FF' },
  '#15AABF': { color: '#15AABF', bg: '#E3FAFC' },
  '#12B886': { color: '#12B886', bg: '#E6FCF5' },
  '#40C057': { color: '#40C057', bg: '#EBFBEE' },
  '#82C91E': { color: '#82C91E', bg: '#F4FCE3' },
  '#FAB005': { color: '#FAB005', bg: '#FFF9DB' },
  '#FD7E14': { color: '#FD7E14', bg: '#FFF4E6' },
  '#212529': { color: '#212529', bg: '#F8F9FA' }
}

const name = toRef(props, 'name')
const { errorMessage, setValue, value } = useField(name, undefined)

const selected = ref<null | Color>(colors[String(value.value)])

const handleSelect = (value: Color) => {
  selected.value = value
  setValue(value.color)
}
</script>

<style scoped></style>
