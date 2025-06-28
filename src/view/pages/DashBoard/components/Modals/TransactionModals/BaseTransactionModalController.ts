
import type { servicesResponse } from '@/app/services/ServicesService'
import TransactionForm from '../../Forms/TransactionForm/TransactionForm.vue'
import CategoriesList from '../CategoryModals/CategoriesList.vue'
import { computed, ref } from 'vue'
import type { Transaction } from '@/app/services/TransactionService'
import type { TRANSACTION_TYPE } from '@/app/config/constants/transaction'
import { useRouter } from 'vue-router'
import { CATEGORY_SETTINGS } from '@/app/config/constants/route'

interface iTabs {
  component: any
  closeFn: Function
  submitFn: Function
}

export type tProps = {
  isOpen: boolean
  transaction?: Transaction
  loading: boolean
  type: TRANSACTION_TYPE
  labels: {
    title: string
    balanceLabel: string
    transactionNameLabel: string
    categoryLabel: string
    professionalLabel: string
    paymentTypeLabel: string
  }
}

export function useBaseTransactionModalController(props: tProps, emit: Function) {
  const router = useRouter()

  const category = ref<servicesResponse | undefined>(props.transaction?.category)

  const currentTab = ref('TransactionForm')
  const transition = ref('go')

  const setCategories = () => {
    transition.value = 'go'
    currentTab.value = 'CategoriesList'
  }

  const setForm = () => {
    transition.value = 'back'
    currentTab.value = 'TransactionForm'
  }

  const tabs: {
    [key: string]: iTabs
  } = {
    TransactionForm: {
      component: TransactionForm,
      closeFn: () => emit('close'),
      submitFn: (values: any) =>
        props.transaction ? emit('update', props.transaction.id, values) : emit('create', values)
    },
    CategoriesList: {
      component: CategoriesList,
      closeFn: setForm,
      submitFn: (chosenCategory: servicesResponse) => {
        setForm()
        category.value = chosenCategory
      }
    }
  }

  const handleAddCategories = () => {
    router.push(CATEGORY_SETTINGS)
    emit('close')
  }

  const isCategoriesListTab = computed(() => {
    return currentTab.value === 'CategoriesList'
  })

  return {
    category,
    currentTab,
    tabs,
    transition,
    isCategoriesListTab,
    setCategories,
    handleAddCategories
  }
}