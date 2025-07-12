<template>
  <div class="bg-teal-900 rounded-2xl h-full w-full md:p-10 px-4 py-8 flex flex-col">
    <template v-if="isLoading">
      <div class="w-full h-full flex justify-center items-center">
        <base-spinner class="w-10 h-10" />
      </div>
    </template>
    <template v-else>
      <div>
        <div>
          <div class="flex flex-row justify-between items-center gap-2">
            <span class="text-white block tracking-[-0.5px]">Saldo Total </span>
            <button
              class="w-8 h-8 flex items-center justify-center cursor-pointer"
              @click="toggleVisibility"
            >
              <eye-icon :open="!areVisible" />
            </button>
          </div>

          <base-balance
            class="text-2xl tracking-[-1px] text-white"
            :balance="employeeStore.total"
          />
        </div>
        <div class="mt-8">
          <span class="text-white block tracking-[-0.5px]">Comissões a pagar</span>
          <div>
            <base-balance
              class="text-2xl tracking-[-1px] text-white"
              :balance="employeeStore.totalCommission"
            />
          </div>
        </div>
      </div>

      <div class="flex flex-1 flex-col justify-end mt-10 md:mt-0">
        <div v-if="!employees?.length">
          <div class="mb-4">
            <strong class="text-white tracking-[-1px] text-lg"> Profissionais </strong>
          </div>
          <base-button
            @click="toggleEmployeeModal('CREATE')"
            class="w-full h-52 mt-4 rounded-2xl border-2 border-dashed border-teal-600 flex flex-col justify-center items-center gap-4 text-white"
          >
            <div
              class="w-11 h-11 rounded-full border-2 border-dashed border-white flex justify-center items-center"
            >
              <plus-icon class="w-6 h-6" />
            </div>
            <span class="tracking-[-0.5px] font-medium block w-32 text-center">
              Cadastrar um novo profissional
            </span>
          </base-button>
        </div>

        <div v-if="employees?.length">
          <swiper
            :space-between="16"
            :slides-per-view="1.5"
            :breakpoints="{
              [MEDIUM_SCREEN]: {
                slidesPerView: 2.1
              }
            }"
          >
            <template #container-start>
              <div class="flex items-center justify-between mb-4">
                <strong class="text-white tracking-[-1px] text-lg"> Profissionais </strong>
                <slider-navigation />
              </div>
            </template>

            <swiper-slide v-for="employee in employeeStore.filteredEmployees" :key="employee!.id">
              <employee-card
                :balance="employee.currentBalance"
                :commission="employee.currentCommission"
                :color="employee.color"
                :name="employee.name"
                :id="employee.id"
                @click="toggleEmployeeModal('EDIT', employee)"
              />
            </swiper-slide>
          </swiper>
        </div>
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { computed, inject, ref } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import BaseButton from '@/view/components/BaseButton.vue'
import BaseSpinner from '@/view/components/BaseSpinner.vue'
import EmployeeCard from './Employee/EmployeeCard.vue'
import SliderNavigation from './Employee/SliderNavigation.vue'
import EyeIcon from '@/view/components/icons/EyeIcon.vue'
import PlusIcon from '@/view/components/icons/PlusIcon.vue'
import BaseBalance from '@/view/components/BaseBalance.vue'

import { MEDIUM_SCREEN } from '@/app/config/constants/breakpoints'
import { type modalsProviderProps, MODALS_PROVIDER } from '../providers/modalsProvider'
import { useEmployeeStore } from '@/app/store/useEmployeeStore'
import type { balanceProviderProps } from '../providers/balanceProvider'

const { toggleEmployeeModal } = inject(MODALS_PROVIDER) as modalsProviderProps

const { areVisible, toggleVisibility } = inject('balanceProvider') as balanceProviderProps

const employeeStore = useEmployeeStore()

const employees = computed(() => employeeStore.employees)
const isLoading = computed(() => employeeStore.queryLoading)
</script>
