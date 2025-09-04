<template>
  <div class="h-full">
    <main class="flex-1 h-full flex flex-col md:flex-row gap-4">
      <div class="w-full hidden md:flex md:max-w-40.5%]">
        <CreateSchedule />
      </div>
      <div class="w-full md:max-w-[59.5%] max-sm:h-full">
        <time-list-view />
      </div>
    </main>
    <base-fab v-if="userStore.isOwner" />
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/app/store/useUserStore'
import TimeListView from './views/TimeListView.vue'
import CreateSchedule from './views/CreateSchedule.vue'
const userStore = useUserStore()
  
</script>

<style scoped></style>
