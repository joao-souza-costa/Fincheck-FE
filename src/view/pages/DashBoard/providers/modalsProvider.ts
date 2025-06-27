import type { TRANSACTION_TYPE } from "@/app/config/constants/transaction"
import type { bankEmployeesResponse } from "@/app/services/EmployeeService"
import type { Transaction } from "@/app/services/TransactionService"
import { provide, reactive, ref } from "vue"

type tEmployeeType = 'CREATE' | 'EDIT'

export const MODALS_PROVIDER: string = 'newEmployeeModalProvider'

export type modalsProviderProps = {
  isOpenEmployeeModal: {
    CREATE: boolean
    EDIT: boolean
    EDIT_EMPLOYEE: bankEmployeesResponse | undefined
  }
  toggleEmployeeModal: (type: tEmployeeType, employee?: bankEmployeesResponse) => void

  isOpenTransactionModal: {
    INCOME: boolean
    EXPENSE: boolean
    EDIT_TRANSACTION: Transaction | undefined
  }
  toggleTransactionModal: (type: TRANSACTION_TYPE, transaction?: Transaction) => void
  isOpenDeleteModal: boolean,
  toggleDeleteModal: (value?: boolean) => void
}

export function useModalsProvider() {

  const isOpenEmployeeModal = reactive<modalsProviderProps['isOpenEmployeeModal']>({
    CREATE: false,
    EDIT: false,
    EDIT_EMPLOYEE: undefined
  })

  const toggleEmployeeModal = (type: tEmployeeType, employee?: bankEmployeesResponse): void => {
    if (type === "EDIT" && employee) isOpenEmployeeModal.EDIT_EMPLOYEE = employee
    isOpenEmployeeModal[type] = !isOpenEmployeeModal[type]
  }

  const isOpenTransactionModal = reactive<modalsProviderProps['isOpenTransactionModal']>({
    INCOME: false,
    EXPENSE: false,
    EDIT_TRANSACTION: undefined
  })

  const toggleTransactionModal = (type: TRANSACTION_TYPE, transaction: Transaction): void => {

    if (isOpenTransactionModal[type]) isOpenTransactionModal.EDIT_TRANSACTION = undefined //close modal reset editTransaction

    if (transaction) isOpenTransactionModal.EDIT_TRANSACTION = { ...transaction, value: Math.abs(transaction.value), date: new Date(transaction.date) }

    isOpenTransactionModal[type] = !isOpenTransactionModal[type]
  }

  const isOpenDeleteModal = ref<boolean>(false)

  const toggleDeleteModal = (value: boolean = !isOpenDeleteModal.value) => {
    isOpenDeleteModal.value = value
  }

  provide(MODALS_PROVIDER, {
    isOpenEmployeeModal,
    toggleEmployeeModal,
    isOpenTransactionModal,
    toggleTransactionModal,
    isOpenDeleteModal,
    toggleDeleteModal
  })
}