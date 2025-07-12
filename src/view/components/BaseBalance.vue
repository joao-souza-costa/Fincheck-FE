<template>
  <span :class="[areVisible && 'blur-md']">
    {{ formatCurrency(Number(balance)) }}
  </span>
</template>

<script setup lang="ts">
import { formatCurrency } from '@/app/utils/formatCurrency'
import { inject } from 'vue'
import { type balanceProviderProps } from '../pages/DashBoard/providers/balanceProvider'

type iProps = {
  balance: number | string | null
}

const { areVisible } = inject('balanceProvider') as balanceProviderProps

defineProps<iProps>()
</script>
