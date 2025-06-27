<template>
  <header class="flex flex-col items-center gap-4">
    <h1 class="text-2xl text-bold text-gray-900 tracking-[-1px]">Crie sua conta</h1>
    <p class="space-x-2">
      <span class="tracking-[-0.5px] text-gray-700"> Já possui sua conta ? </span>
      <router-link :to="{ name: LOGIN.name }" class="tracking-[-1px] font-medium text-teal-900">
        Fazer login
      </router-link>
    </p>
  </header>

  <transition name="go" mode="out-in">
    <keep-alive>
      <component
        :is="component"
        :is-loading="isLoading"
        @next="handleNextStep"
        @create-account="handleCreateAccount"
      />
    </keep-alive>
  </transition>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { LOGIN } from '@/app/config/constants/route'
import CompanyForm from './components/CompanyForm.vue'
import UserForm from './components/UserForm.vue'
import { useRegisterController } from './useRegisterController'
import { shallowRef, type Component } from 'vue'

const component = shallowRef<Component>(UserForm)

const { onSubmit, isLoading, payload } = useRegisterController()

function handleNextStep(v: any) {
  payload.value = v
  component.value = CompanyForm
}

function handleCreateAccount(v: any) {
  if (!v) {
    return
  }
  payload.value!.company = v
  onSubmit()
}
</script>

<style scoped></style>
