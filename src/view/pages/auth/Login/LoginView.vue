<template>
  <header class="flex flex-col items-center gap-4">
    <h1 class="text-2xl text-bold text-gray-900 tracking-[-1px]">Entre em sua conta</h1>
    <p class="space-x-2">
      <span class="tracking-[-0.5px] text-gray-700"> Novo por aqui ? </span>
      <router-link :to="{ name: REGISTER.name }" class="tracking-[-1px] font-medium text-teal-900">
        Crie sua conta
      </router-link>
    </p>
  </header>

  <Form
    @submit="onSubmit"
    :validation-schema="schema"
    class="mt-[60px] flex flex-col items-center gap-4"
  >
    <base-input type="text" id="email" name="email" placeholder="Email" />
    <base-input type="password" id="password" name="password" placeholder="Senha" />
    <base-button :is-loading="isLoading" type="submit" class="w-full mt-2"> Entrar </base-button>
  </Form>

  <router-link
    :to="FORGOT_PASSWORD"
    class="text-center mt-2 hover:text-teal-900 block cursor-pointer text-gray-700 decoration-solid underline underline-offset-4"
  >
    Esqueceu a sua senha ?
  </router-link>
</template>

<script setup lang="ts">
import { Form } from 'vee-validate'
import { RouterLink } from 'vue-router'
import { ACTIVE_USER_REGISTER } from '@/app/config/constants/envConstants'
import { REGISTER, FORGOT_PASSWORD } from '@/app/config/constants/route'
import BaseInput from '@/view/components/BaseInput.vue'
import BaseButton from '@/view/components/BaseButton.vue'

import { useLoginController } from './useLoginController.ts'

const { schema, onSubmit, isLoading } = useLoginController()
</script>

<style scoped></style>
