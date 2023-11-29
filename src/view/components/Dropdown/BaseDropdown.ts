import { defineComponent } from 'vue'

import {
  DropdownMenuRoot,
  DropdownMenuTrigger,
  DropdownMenuPortal,
  DropdownMenuContent,
  DropdownMenuItem
} from 'radix-vue'

const BaseDropdownRoot = defineComponent({
  components: {
    DropdownMenuRoot,
  },
  template: `
  <DropdownMenuRoot>
    <slot/>
  </DropdownMenuRoot>`
})
const BaseDropdownTrigger = defineComponent({
  components: {
    DropdownMenuTrigger
  },
  template: `
  <DropdownMenuTrigger class="outline-none" asChild>
    <slot/>
  </DropdownMenuTrigger>`
})
const BaseDropdownContent = defineComponent({
  components: {
    DropdownMenuPortal,
    DropdownMenuContent,
  },
  template: `
  <DropdownMenuPortal>
    <DropdownMenuContent 
    :class="$attrs.class"
    class="data-[side=bottom]:animate-slide-up-and-fade 
    data-[side=top]:animate-slide-down-and-fade 
    rounded-2xl p-2 bg-white space-y-2 
    shadow-[0px_11px_20px_0px_rgba(0,0,0,0.10)] z-50"
    >
      <slot/>
    </DropdownMenuContent>
  </DropdownMenuPortal>
  `
})
const BaseDropdownItem = defineComponent({
  components: {
    DropdownMenuItem
  },
  template: `
  <DropdownMenuItem class="min-h-[40x] outline-none flex items-center py-2 px-4
   text-gray-800 text-sm data-[highlighted]:bg-gray-50 rounded-2xl transition-colors cursor-pointer">
    <slot/>
  </DropdownMenuItem>`
})

export default {
  Root: BaseDropdownRoot,
  Trigger: BaseDropdownTrigger,
  Content: BaseDropdownContent,
  Item: BaseDropdownItem,
}