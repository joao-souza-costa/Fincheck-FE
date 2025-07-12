<template>
  <div class="mb-4">
    <div class="flex items-center justify-between">
      <p class="text-3xl font-bold">Horário de funcionamento</p>
      <base-button :disabled="disabled" variant="PRIMARY" label="Adicionar" @click="toggleModal" />
    </div>
    <p class="mt-2 text-1xl font-normal relative">
      Nesta página você vai poder gerenciar os horários dos funcionarios do salão
    </p>
  </div>

  <create-opening-modal v-if="isOpen" :is-open="isOpen" @close="toggleModal" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CreateOpeningModal from '../Modals/CreateOpeningModal.vue'
import BaseButton from '@/view/components/BaseButton.vue'

defineProps<{ disabled?: boolean }>()

const isOpen = ref<boolean>(false)
const toggleModal = () => {
  isOpen.value = !isOpen.value
}
</script>
