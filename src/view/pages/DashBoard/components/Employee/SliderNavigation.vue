<template>
  <div>
    <button
      class="py-3 pl-2.5 pr-2.5 rounded-full enabled:hover:bg-black/10 transition-colors disabled:opacity-40"
      @click="swiper.slidePrev()"
      :disabled="swiper.isBeginning"
    >
      <chevron-left-icon class="text-white w-6 h-6" />
    </button>

    <button
      class="py-3 pl-2.5 pr-2.5 rounded-full enabled:hover:bg-black/10 transition-colors disabled:opacity-40"
      @click="swiper.slideNext()"
      :disabled="swiper.isEnd"
    >
      <chevron-right-icon class="text-white w-6 h-6" />
    </button>
  </div>
</template>

<script lang="ts" setup>
import ChevronLeftIcon from '@/view/components/icons/ChevronLeftIcon.vue'
import ChevronRightIcon from '@/view/components/icons/ChevronRightIcon.vue'

import { useSwiper } from 'swiper/vue'
const swiper = useSwiper()
</script>

