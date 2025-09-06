import { provide, reactive, ref } from 'vue'

export function useScheduleModalProvider() {
  const modal = reactive({
    CREATE: false,
    EDIT: false,
    EDIT_ITEM: undefined
  })

  const toggleModal = (type: string, item: any) => {
    if (type === 'EDIT' && item) {
      modal.EDIT_ITEM = item
    }
    modal[type] = !modal[type]
  }

  provide('scheduleProvider', {
    modal,
    toggleModal
  })
}
