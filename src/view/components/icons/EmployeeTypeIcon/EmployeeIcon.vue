<template>
  <component :is="current" />
</template>

<script setup lang="ts">
import { markRaw } from 'vue'
import { iconsMap } from './iconsMap'

type EmployeeTypeIconProps = {
  type: keyof typeof iconsMap
}
const props = defineProps<EmployeeTypeIconProps>()

const current = markRaw(iconsMap[props.type])
</script>

