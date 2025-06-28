<template>
  <base-modal :title="label" open @update:open="$emit('close')">
    <template #right-action>
      <slot name="right-action" />
    </template>
    <form @submit.prevent="onSubmit" class="mt-5 flex flex-col gap-4">
      <base-input name="name" type="text" id="name" placeholder="Nome" />

      <base-input-select name="type" :options="options" placeholder="Tipo" />

      <category-icon-dropdown :type="values.type" name="icon" />

      <slot />
    </form>
  </base-modal>
</template>

<script setup lang="ts">
import { type GenericObject, useForm } from 'vee-validate'

import BaseModal from '@/view/components/BaseModal.vue'
import CategoryIconDropdown from '@/view/components/CategoryIconDropdown.vue'
import BaseButton from '@/view/components/BaseButton.vue'
import BaseInput from '@/view/components/BaseInput.vue'
import BaseInputSelect from '@/view/components/BaseInputSelect.vue'
import { useCategoryModalController } from './BaseCategoryModalController'
import { TRANSACTION_LABELS, TRANSACTION_TYPE } from '@/app/config/constants/transaction'
import type { categoriesResponse } from '@/app/services/ServicesService'

type iProps = {
  label: string
  buttonLabel?: String
  initialValues?: Omit<categoriesResponse, 'id'>
}

type tEmit = {
  close: []
  submit: [v: GenericObject]
}

const props = defineProps<iProps>()

const emit = defineEmits<tEmit>()

const { schema } = useCategoryModalController()

const { values, handleSubmit } = useForm({
  validationSchema: schema,
  initialValues: {
    type: TRANSACTION_TYPE.INCOME,
    ...props.initialValues
  }
})

const options = [
  {
    value: TRANSACTION_TYPE.INCOME,
    label: TRANSACTION_LABELS.INCOME
  },
  {
    value: TRANSACTION_TYPE.EXPENSE,
    label: TRANSACTION_LABELS.EXPENSE
  }
]

const onSubmit = handleSubmit((values) => emit('submit', values))
</script>
