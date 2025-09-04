<template>
  <BaseDropdown.Root>
    <BaseDropdown.Trigger>
      <div
        class="bg-teal-0 rounded-full w-12 h-12 flex items-center justify-center border-teal-100 cursor-pointer"
      >
        <span class="text-sm font-medium text-teal-900 tracking-[-0.5px]">{{ name }}</span>
      </div>
    </BaseDropdown.Trigger>

    <BaseDropdown.Content class="w-32">
      <BaseDropdown.Item
        class="flex items-center justify-between"
        @select="router.push(SCHEDULE_VIEW)"
      >
        Agendamento
      </BaseDropdown.Item>
      <BaseDropdown.Item
        v-if="userStore.isOwner"
        class="flex items-center justify-between"
        @select="router.push(SERVICES_SETTINGS)"
      >
        Configurações
      </BaseDropdown.Item>
      <BaseDropdown.Item class="flex items-center justify-between" @select="router.push(DASHBOARD)">
        Dashboard
      </BaseDropdown.Item>

      <BaseDropdown.Item class="flex items-center justify-between" @select="handleSignout">
        Sair
        <ExitIcon class="w-4 h-4" />
      </BaseDropdown.Item>
    </BaseDropdown.Content>
  </BaseDropdown.Root>
</template>

<script lang="ts" setup>
import { useUserStore } from '@/app/store/useUserStore'
import BaseDropdown from './Dropdown/BaseDropdown'
import ExitIcon from './icons/ExitIcon.vue'
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { DASHBOARD, SERVICES_SETTINGS, SCHEDULE_VIEW } from '@/app/config/constants/route'

const userStore = useUserStore()
const router = useRouter()

const handleSignout = () => {
  userStore.signout()
}

const name = computed(() => {
  if (!userStore.user) return ''

  const [firstName, secondName] = userStore.user!.name.split(' ')
  const value = secondName
    ? firstName.charAt(0).concat(secondName.charAt(0))
    : firstName.slice(0, 2)

  return value.toUpperCase()
})
</script>
