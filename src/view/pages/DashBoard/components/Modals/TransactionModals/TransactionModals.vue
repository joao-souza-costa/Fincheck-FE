<template>
  <base-transaction-modal
    v-if="isOpenTransactionModal.EXPENSE"
    :is-open="isOpenTransactionModal.EXPENSE"
    :labels="expenseLabels"
    :transaction="isOpenTransactionModal?.EDIT_TRANSACTION"
    :loading="updateLoading || queryLoading"
    :type="TRANSACTION_TYPE.EXPENSE"
    @create="(values) => onCreate({ values, type: TRANSACTION_TYPE.EXPENSE })"
    @update="(id, values) => onUpdate({ id, values, type: TRANSACTION_TYPE.EXPENSE })"
    @delete="(id) => openDelete(id, TRANSACTION_TYPE.EXPENSE)"
    @close="toggleTransactionModal(TRANSACTION_TYPE.EXPENSE)"
  />

  <base-transaction-modal
    v-if="isOpenTransactionModal.INCOME"
    :is-open="isOpenTransactionModal.INCOME"
    :labels="incomeLabels"
    :transaction="isOpenTransactionModal?.EDIT_TRANSACTION"
    :loading="updateLoading || queryLoading"
    :type="TRANSACTION_TYPE.INCOME"
    @create="(values) => onCreate({ values, type: TRANSACTION_TYPE.INCOME })"
    @update="(id, values) => onUpdate({ id, values, type: TRANSACTION_TYPE.INCOME })"
    @delete="(id) => openDelete(id, TRANSACTION_TYPE.INCOME)"
    @close="toggleTransactionModal(TRANSACTION_TYPE.INCOME)"
  />

  <confirm-delete-modal
    v-if="isOpenDeleteModal"
    :title="title"
    :is-loading="deleteLoading || queryLoading"
    @confirm="handleDelete"
    @cancel="toggleDeleteModal"
    @close="toggleDeleteModal"
  />
</template>

<script setup lang="ts">
import ConfirmDeleteModal from '@/view/components/ConfirmDeleteModal.vue'
import BaseTransactionModal from './BaseTransactionModal.vue'
import { useTransactionModalsController } from './TransactionModalsController'
import { ref } from 'vue'
import { TRANSACTION_TYPE } from '@/app/config/constants/transaction'

const {
  deleteLoading,
  queryLoading,
  updateLoading,
  isOpenTransactionModal,
  isOpenDeleteModal,
  title,
  openDelete,
  onCreate,
  onUpdate,
  handleDelete,
  toggleDeleteModal,
  toggleTransactionModal
} = useTransactionModalsController()

const incomeLabels = ref({
  title: isOpenTransactionModal?.EDIT_TRANSACTION ? 'Editar Receita' : 'Nova Receita',
  balanceLabel: 'Valor da Receita',
  transactionNameLabel: 'Nome da Receita',
  categoryLabel: 'Categoria',
  paymentTypeLabel: 'Método de pagamento',
  professionalLabel: 'Profissional (opcional)',
  serviceLabel: 'Serviço (opcional)'
})

const expenseLabels = ref({
  title: isOpenTransactionModal?.EDIT_TRANSACTION ? 'Editar Despesa' : 'Nova Despesa',
  balanceLabel: 'Valor da Despesa',
  transactionNameLabel: 'Nome da despesa',
  categoryLabel: 'Categoria',
  paymentTypeLabel: 'Método de pagamento',
  serviceLabel: 'Serviço (opcional)',
  professionalLabel: 'Profissional (opcional)'
})
</script>
