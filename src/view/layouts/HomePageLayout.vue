<template>
  <div class="h-full w-full p-4 md:p-8 md:pt-6 flex flex-col gap-y-4">
    <header class="h-10 flex flex-row items-center justify-between">
      <fincheck-logo class="h-6 text-teal-900" />
      <user-menu />
    </header>

    <router-view #="{ Component, route }">
      <transition :name="String(route.meta.transition)" mode="out-in">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </transition>
    </router-view>
  </div>
</template>

<script setup lang="ts">
import FincheckLogo from '@/view/components/FincheckLogo.vue'
import UserMenu from '@/view/components/UserMenu.vue'
import { RouterView } from 'vue-router'
</script>

<style>
.go-enter-active,
.go-leave-active {
  transition: all 0.25s ease-out;
}

.go-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.go-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

.back-enter-active,
.back-leave-active {
  transition: all 0.25s ease-out;
}

.back-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}

.back-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
