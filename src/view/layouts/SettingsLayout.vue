<template>
  <section class="h-[95%] w-full flex md:flex-row flex-col">
    <div class="md:w-1/4 w-full">
      <settings-menu />
    </div>
    <div class="md:w-3/4 w-full h-full">
      <RouterView />
    </div>
  </section>
</template>

<script setup lang="ts">
import SettingsMenu from '@/view/pages/Settings/components/SettingsMenu.vue'
</script>
