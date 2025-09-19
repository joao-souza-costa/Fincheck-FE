<template>
  <div class="h-full">
    <main class="flex-1 h-full flex flex-col md:flex-row gap-4">
      <CreateSchedule />

      <div class="w-full md:max-w-[59.5%] max-sm:h-full">
        <time-list-view />
      </div>
    </main>
    <base-fab @confirm-appointments="toggleConfirmModal" @cancel-appointments="toggleCancelModal" />
    <ScheduleForm />

    <ConfirmModal
      v-if="openConfirmModal"
      title="Confirmar agendametos"
      description="Tem certeza que deseja confirmar os itens selecionados"
      confirmButtonVariant="PRIMARY"
      confirmText="Concluir agendamento"
      @cancel="toggleConfirmModal"
      @close="toggleConfirmModal"
      @confirm="handleConfirmAppointment"
    >
      <div class="w-[52px] h-[52px] rounded-full bg-green-0 flex items-center justify-center">
        <CheckIcon />
      </div>
    </ConfirmModal>

    <ConfirmModal
      v-if="openCancelModal"
      title="Cancelar agendametos"
      description="Tem certeza que deseja cancelar os itens selecionados"
      confirmButtonVariant="DANGER"
      confirmText="Sim, desejo cancelar"
      @cancel="toggleCancelModal"
      @close="toggleCancelModal"
      @confirm="handleCancelledAppointment"
    />
  </div>
</template>

<script setup lang="ts">
import TimeListView from './views/TimeListView.vue'
import CreateSchedule from './views/CreateSchedule.vue'
import BaseFab from './components/BaseFab.vue'
import { useUserStore } from '@/app/store/useUserStore'
import { useScheduleModalProvider } from './providers/modalsProvider'
import ScheduleForm from './components/Form/ScheduleForm.vue'
import ConfirmModal from '@/view/components/ConfirmModal.vue'
import { ref } from 'vue'
import CheckIcon from '@/view/components/icons/CheckIcon.vue'
import { useAppointmentStore } from '@/app/store/useAppointmentStore'

const appointmentStore = useAppointmentStore()

useScheduleModalProvider()

const openConfirmModal = ref(false)
const openCancelModal = ref(false)

function toggleConfirmModal() {
  return (openConfirmModal.value = !openConfirmModal.value)
}

function toggleCancelModal() {
  return (openCancelModal.value = !openCancelModal.value)
}

function handleConfirmAppointment() {
  appointmentStore.confirmSelectedItems()
  toggleConfirmModal()
}

function handleCancelledAppointment() {
  appointmentStore.cancelSelectedItems()
  toggleCancelModal()
}
</script>

<style scoped></style>
