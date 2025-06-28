<template>
  <div>
    <base-modal title="Filtros" :open="open" @update:open="$emit('close')">
      <div class="mt-5">
        <span class="text-lg tracking-[-1px] font-bold text-gray-800"> Contas </span>
      </div>
      <div class="h-44">
        <base-scroll-bar>
          <button
            v-for="employee in employees"
            :class="{ '!bg-gray-200': selectedAccountId === employee.id }"
            :key="employee.id"
            class="p-2 rounded-2xl w-full text-left text-gray-800 hover:bg-gray-50"
            @click="handleSelectedId(employee.id)"
          >
            {{ employee.name }}
          </button>

          <button
            :class="{ '!bg-gray-200': selectedAccountId === 'NON_PROFESSIONAL' }"
            class="p-2 rounded-2xl w-full text-left text-gray-800 hover:bg-gray-50"
            @click="handleSelectedId('NON_PROFESSIONAL')"
          >
            Profissional indefinido
          </button>
        </base-scroll-bar>
      </div>

      <div class="mt-3">
        <span class="text-lg tracking-[-1px] font-bold text-gray-800"> Período </span>
      </div>

      <div class="mt-3 w-60 flex items-center justify-between">
        <Swiper
          :initial-slide="selectedPeriodIndex"
          :slides-per-view="1"
          :loop="true"
          centered-slides
          @init="handlePERIODSwiper"
          @slide-change="handleSelectedPeriod"
        >
          <slider-navigation
            class="bg-white from-white"
            @slide-next="PERIODSwiper.slideNext()"
            @slide-prev="PERIODSwiper.slidePrev()"
          />
          <SwiperSlide v-for="(period, index) in PERIODS" :key="index" tag="p" class="text-center">
            {{ PERIODS_LABEL[period] }}
          </SwiperSlide>
        </Swiper>
      </div>

      <base-button class="w-full mt-10" @click="handleApplyFilters"> Aplicar filtros</base-button>
    </base-modal>
  </div>
</template>

<script setup lang="ts">
import BaseScrollBar from '@/view/components/BaseScrollBar.vue'
import BaseButton from '@/view/components/BaseButton.vue'
import BaseModal from '@/view/components/BaseModal.vue'
import { useFiltersModalController } from './FiltersModalController'
import { SwiperSlide, Swiper } from 'swiper/vue'
import SliderNavigation from '../Transactions/SliderNavigation.vue'
import { PERIODS, PERIODS_LABEL } from '@/app/config/constants/dates'

type tFilters = {
  employeeId: string | undefined
  period: PERIODS
}

type iProps = {
  open: boolean
}
type iEmits = {
  (e: 'close'): void
  (e: 'applyFilters', v: tFilters): void
}

defineProps<iProps>()
const emit = defineEmits<iEmits>()

const {
  employees,
  selectedAccountId,
  selectedPeriod,
  selectedPeriodIndex,
  PERIODSwiper,
  handleSelectedId,
  handleSelectedPeriod,
  handlePERIODSwiper
} = useFiltersModalController()

const handleApplyFilters = () => {
  emit('applyFilters', { employeeId: selectedAccountId.value, period: selectedPeriod.value })
}
</script>
