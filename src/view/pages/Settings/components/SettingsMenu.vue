<template>
  <div class="p-5 flex justify-start flex-col gap-3">
    <!-- <div
      class="min-h-[40x] outline-none flex items-center py-2 px-3 text-gray-800 text-base hover:bg-gray-100 rounded-2xl transition-colors cursor-pointer disabled:opacity-75 disabled:text-opacity-20 disabled:cursor-not-allowed"
      :class="[$route.name === CATEGORY_SETTINGS.name && '!bg-gray-100']"
    >
      <button
        class="cursor-pointer w-full md:text-start text-center"
        @click="router.push(CATEGORY_SETTINGS)"
      >
        Categorias
      </button>
    </div> -->

    <div
      class="min-h-[40x] outline-none flex items-center py-2 px-3 text-gray-800 text-base hover:bg-gray-100 rounded-2xl transition-colors cursor-pointer disabled:opacity-75 disabled:text-opacity-20 disabled:cursor-not-allowed"
      :class="[$route.name === SERVICES_SETTINGS.name && '!bg-gray-100']"
    >
      <button
        class="cursor-pointer w-full md:text-start text-center"
        @click="router.push(SERVICES_SETTINGS)"
      >
        Procedimentos
      </button>
    </div>

    <div
      class="min-h-[40x] outline-none flex items-center py-2 px-3 text-gray-800 text-base hover:bg-gray-100 rounded-2xl transition-colors cursor-pointer disabled:opacity-75 disabled:text-opacity-20 disabled:cursor-not-allowed"
      :class="[$route.name === OPENING_HOURS_SETTINGS.name && '!bg-gray-100']"
    >
      <button class="cursor-pointer w-full md:text-start text-center" @click="router.push(OPENING_HOURS_SETTINGS)">
        Funcionamento do salão
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  CATEGORY_SETTINGS,
  SERVICES_SETTINGS,
  OPENING_HOURS_SETTINGS
} from '@/app/config/constants/route'
import { useRouter } from 'vue-router'

const router = useRouter()
</script>
