<template>
  <div class="mb-4">
    <div class="flex items-center justify-between">
      <p class="text-3xl font-bold">Procedimentos</p>
      <base-button :disabled="disabled" variant="PRIMARY" label="Adicionar" @click="toggleModal" />
    </div>
    <p class="mt-2 text-1xl font-normal relative">
      Nesta página você vai poder gerenciar os procedimentos do seu salão
    </p>
  </div>

  <create-service-modal v-if="isOpen" :is-open="isOpen" @close="toggleModal" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CreateServiceModal from '../Modals/CreateServiceModal.vue'
import BaseButton from '@/view/components/BaseButton.vue'

defineProps<{ disabled?: boolean }>()

const isOpen = ref<boolean>(false)
const toggleModal = () => {
  isOpen.value = !isOpen.value
}
</script>
