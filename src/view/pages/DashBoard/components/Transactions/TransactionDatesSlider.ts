import { defineComponent, ref, h, computed, watch, type PropType } from "vue";
import { renderToString } from "vue/server-renderer";
import SliderNavigation from './SliderNavigation.vue'

import Swiper from "swiper";
import { Manipulation } from "swiper/modules";
import type { ManipulationMethods } from "swiper/types";

import dateFilters from "@/app/utils/dateFilters";

import { MEDIUM_SCREEN } from "@/app/config/constants/breakpoints";

import debounce from '@/app/utils/debounce'
import { PERIODS } from "@/app/config/constants/dates";
type iSwiperProperties = Swiper & ManipulationMethods

interface iSliderOptions {
  label: string, value: string
}

const createSliderOption = ({ label, value }: iSliderOptions) => renderToString(h('div', {
  class: "swiper-slide",
  'data-value': value,
}, h('button', {
  class: 'md:w-full w-[175px] block h-full mx-auto  rounded-full text-sm text-gray-800 tracking-[-0.5px] font-medium tracking-wide',
  innerHTML: label,
})))

export const TransactionDatesSlider = defineComponent({
  name: 'TransactionDatesSlider',
  props: {
    filter: {
      type: String as PropType<PERIODS>,
      default: PERIODS.monthly
    },
    value: {
      type: String,
      default: new Date(Date.now()).toISOString()
    }
  },
  emits: ['change-value', 'slide-start'],
  components: {
    SliderNavigation
  },
  setup(props, ctx) {
    const filters = dateFilters
    const swiper_test = ref()
    const current = ref(props.value)
    const swiper = computed<iSwiperProperties>(() => swiper_test.value.swiper)

    const prependSlider = async (params: iSliderOptions) => {
      const slider = await createSliderOption(params)
      swiper.value.prependSlide(slider)
      swiper.value.update()
    }

    const appendSlide = async (params: iSliderOptions) => {
      const slider = await createSliderOption(params)
      swiper.value.appendSlide(slider)
      swiper.value.update()
    }

    const handlePrev = async () => {
      ctx.emit('slide-start')
      swiper.value.slidePrev(200)
    }

    const handleNext = async () => {
      ctx.emit('slide-start')
      swiper.value.slideNext(200)
    }

    const handleSelectedValue = () => {
      const item = swiper.value.wrapperEl.children.item(swiper.value.activeIndex)
      if (item) {
        current.value = item.getAttribute('data-value') as string
      }
    }

    const initValues = async (date: Date) => {
      Promise.all([await prependSlider(filters[props.filter](date, 'PREV', 1)),
      await prependSlider(filters[props.filter](date, 'PREV',)),
      await appendSlide(filters[props.filter](date)),
      await appendSlide(filters[props.filter](date, 'NEXT', 1)),
      ])
    }

    const emitCurrentValue = debounce(() => {
      ctx.emit('change-value', current.value)
    }, 700)

    watch(current, async (value: Date | string) => {
      const isSecondLast = swiper.value.realIndex === (swiper.value.wrapperEl.children.length - 2)
      const isSecondItemInArray = swiper.value.realIndex === 1

      const currentAsDate = new Date(value)
      if (isSecondLast) await appendSlide(filters[props.filter](currentAsDate, 'NEXT'))

      if (isSecondItemInArray) await prependSlider(filters[props.filter](currentAsDate, 'PREV'))

      emitCurrentValue()
    })

    watch(() => props.filter, async () => {
      swiper.value.removeAllSlides()
      await initValues(new Date(current.value))
    })


    return {
      handleNext,
      handlePrev,
      prependSlider,
      appendSlide,
      initValues,
      handleSelectedValue,
      current,
      swiper_test
    }
  },
  async mounted() {

    new Swiper(this.swiper_test, {
      modules: [Manipulation],
      breakpoints: {
        [MEDIUM_SCREEN]: {
          slidesPerView: 3
        }
      },
      initialSlide: 1,
      slidesPerView: 1.1, //it bugs the date inital if put 1
      centeredSlides: true,
      slideToClickedSlide: true,
      loop: true,
      on: {
        click: () => this.$emit('slide-start'),
        slideChangeTransitionEnd: () => this.handleSelectedValue(),
        beforeInit: async () => {
          await this.initValues(new Date(this.current))
        }
      }
    })
  },
  template: /*html*/ `<div class="mt-6 relative overflow-hidden">
    <div ref="swiper_test" class="swipe h-12">
      <div class="swiper-wrapper">
      </div>
    </div>
    <slider-navigation @slide-next="handleNext" @slide-prev="handlePrev" />
  </div>
  `,
})