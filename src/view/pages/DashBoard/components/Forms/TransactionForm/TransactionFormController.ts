
import * as Yup from 'yup'
import { useEmployeeStore } from "@/app/store/useEmployeeStore"
import { computed, ref } from 'vue'
import { PaymentTypes } from '@/app/config/constants/paymentTypes'
import { useServiceStore } from '@/app/store/useServiceStore'

export function useBaseTransactionFormController(type: string) {
  const serviceStore = useServiceStore()
  const employeeStore = useEmployeeStore()

  const employeesOptions = computed(() => {
    if (!employeeStore.employees) return []

    return employeeStore.employees?.map((acc) => ({ value: acc.id, label: acc.name }))
  })

  const serviceOptions = computed(() => {
    if (!serviceStore.data) return []

    return serviceStore.data?.map((acc) => ({ value: acc.id, label: acc.name }))
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
    serviceId: Yup.mixed(),
    employeeId: Yup.mixed(),
    paymentType: Yup.string().required('Método de pagamento é obrigatório'),
    date: Yup.date().required('Data é obrigatório'),
  })

  return {
    serviceOptions,
    schema,
    services: serviceStore,
    employeesOptions,
    employeeLoading: employeeStore.queryLoading,
    paymentTypeOptions,
  }
}