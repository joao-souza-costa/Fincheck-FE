<template>
  <Form
    @submit="(v) => $emit('submit', v)"
    :validation-schema="schema"
    :initialValues="initialValues"
  >
    <base-currency-input name="value" :placeholder="balanceLabel" />

    <div class="mt-4 flex flex-col gap-4">
      <base-input
        name="name"
        type="text"
        id="transactionName"
        :placeholder="transactionNameLabel"
      />

      <base-input-select
        v-if="props.type === TRANSACTION_TYPE.INCOME"
        name="serviceId"
        :options="serviceOptions"
        :placeholder="serviceLabel"
      />

      <base-input-select
        name="paymentType"
        :options="paymentTypeOptions"
        :placeholder="paymentTypeLabel"
      />

      <base-input-select
        v-if="props.type === TRANSACTION_TYPE.INCOME"
        name="employeeId"
        :options="employeesOptions"
        :placeholder="professionalLabel"
      />

      <base-date-picker-input name="date" />

      <base-button type="submit" :is-loading="isLoading"> Salvar </base-button>
    </div>
  </Form>
</template>

<script setup lang="ts">
import type { Transaction } from '@/app/services/TransactionService'
import { Field, Form, type GenericObject } from 'vee-validate'
import BaseCurrencyInput from '@/view/components/BaseCurrencyInput.vue'
import BaseInput from '@/view/components/BaseInput.vue'
import BaseInputSelect from '@/view/components/BaseInputSelect.vue'
import BaseDatePickerInput from '@/view/components/BaseDatePickerInput.vue'
import { useBaseTransactionFormController } from './TransactionFormController'
import BaseButton from '@/view/components/BaseButton.vue'
import { TRANSACTION_TYPE } from '@/app/config/constants/transaction'

type tProps = {
  isLoading: boolean
  initialValues?: Omit<Partial<Transaction>, 'categoryId'>
  type: TRANSACTION_TYPE
  balanceLabel: string
  transactionNameLabel: string
  paymentTypeLabel: string
  professionalLabel: string
  serviceLabel: string
}

type tEmit = {
  (e: 'submit', v: GenericObject): void
  (e: 'open-categories'): void
}

const props = withDefaults(defineProps<tProps>(), {
  initialValues: () => ({
    date: new Date()
  })
})

defineEmits<tEmit>()

const { schema, employeesOptions, paymentTypeOptions, serviceOptions } =
  useBaseTransactionFormController(props.type)
</script>
