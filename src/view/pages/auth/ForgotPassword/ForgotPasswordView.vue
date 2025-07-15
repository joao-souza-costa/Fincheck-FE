<template>
  <header class="flex flex-col items-center gap-4">
    <h1 class="text-2xl text-bold text-gray-900 tracking-[-1px]">Redefina sua senha</h1>
    <p v-if="!successRequest" class="space-x-2 text-gray-700 text-center">
      Enviaremos uma mensagem no whatsapp com instruções sobre como redefinir sua senha.
    </p>

    <p v-if="successRequest" class="space-x-2 text-gray-700 text-center">
      Mensagem enviada com sucesso para o número com final: {{ numberSent }}.
      <span class="bg-teal-900 block w-fit rounded-full mx-auto">
        <check-icon class="text-white w-10 h-10 mt-3" />
      </span>
    </p>
  </header>

  <template v-if="!successRequest">
    <Form
      @submit="onSubmit"
      :validation-schema="schema"
      class="mt-[30px] flex flex-col items-center gap-4"
    >
      <base-input type="text" id="email" name="email" placeholder="Email" />
      <base-button :is-loading="isLoading" type="submit" class="w-full mt-2"> Enviar </base-button>
    </Form>
  </template>

  <template v-if="successRequest"> </template>
</template>

<script setup lang="ts">
import { Form } from 'vee-validate'
import CheckIcon from '@/view/components/icons/CheckIcon.vue'
import BaseInput from '@/view/components/BaseInput.vue'
import BaseButton from '@/view/components/BaseButton.vue'

import { useForgotPasswordController } from './useForgotPasswordController'

const { schema, onSubmit, isLoading, successRequest, numberSent } = useForgotPasswordController()
</script>

<style scoped></style>
