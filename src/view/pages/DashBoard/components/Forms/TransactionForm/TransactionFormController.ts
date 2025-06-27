
import * as Yup from 'yup'
import { useEmployeeStore } from "@/app/store/useEmployeeStore"
import { storeToRefs } from 'pinia'
import { computed, ref } from 'vue'
import { PaymentTypes } from '@/app/config/constants/paymentTypes'

export function useBaseTransactionFormController(type: string) {
  const { data: accounts, queryLoading: accountLoading } = storeToRefs(useEmployeeStore())

  const accountsOptions = computed(() => {
    if (!accounts.value) return []

    return accounts.value?.map((acc) => ({ value: acc.id, label: acc.name }))
  })

  const paymentTypeOptions = ref([
    {
      value: PaymentTypes.BILLET,
      label: 'Boleto'
    },
    {
      value: PaymentTypes.CREDIT,
      label: 'Cartão de crédito'
    },
    {
      value: PaymentTypes.DEBIT,
      label: 'Cartão de débito'
    },

    {
      value: PaymentTypes.CASH,
      label: 'Dinheiro'
    },
    {
      value: PaymentTypes.PIX,
      label: 'PIX'
    },
  ])


  const schema = Yup.object().shape({
    value: Yup.string().required('Saldo  é obrigatório')
      .test('value', 'Saldo precisa ser maior que zero', val => Number(val) > 0),
    name: Yup.string().required('Nome da transação é obrigatório'),
    categoryId: Yup.mixed().required('Categoria é obrigatória'),
    bankAccountId: Yup.string().required('Destino do pagamento é obrigatória'),
    date: Yup.date().required('Data é obrigatório'),
    paymentType: Yup.string().required('Método de pagamento é obrigatório')
  })

  return {
    schema,
    accountsOptions,
    accountLoading,
    paymentTypeOptions,
  }
}