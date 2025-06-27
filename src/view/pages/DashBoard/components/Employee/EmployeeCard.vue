<template>
  <div
    class="p-4 bg-white rounded-2xl h-[200px] flex flex-col justify-between border-b-4 border-teal-950 cursor-pointer"
    :style="{ borderColor: color }"
    role="button"
  >
    <div>
      <employee-icon type="CASH" />
      <span class="text-gray-800 font-medium tracking-[-0.5px] block mt-4"> {{ name }} </span>
    </div>
    <div class="flex flex-row justify-between gap-4">
      <div class="text-teal-600">
        <base-balance class="font-medium tracking-[-0.5px] block" :balance="balance" />
        <small class=" text-sm">Saldo atual</small>
      </div>
      <div class="text-yellow-700">
        <base-balance class="font-medium tracking-[-0.5px] block" :balance="commission" />
        <small class="text-sm">Comissão atual</small>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import BaseBalance from '@/view/components/BaseBalance.vue'; 
import EmployeeIcon from '@/view/components/icons/EmployeeTypeIcon/EmployeeIcon.vue'

type employeeCardProps = {
  color: string
  name: string
  balance: number
  commission: number
}

defineProps<employeeCardProps>()
</script>
