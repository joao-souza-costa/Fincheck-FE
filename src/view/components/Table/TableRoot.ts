import { computed, h, type Component, type PropType } from 'vue'
import TableCell, { type iCell } from './TableCell'
import TableHeader, { type iHeader } from './TableHeader'
import BaseSpinner from '../BaseSpinner.vue'
import emptyState from '@/assets/empty-state.svg'

type Props = {
  headers: iHeader[]
  list: []
  notFoundDescription: string
  isLoading: Boolean
}

const ListSection = (list: any[], headers: iHeader[], slots: any, emit: any) => {
  const listMapped = list?.map((item) => {
    const mappedItem: iCell = {}
    headers.forEach((header) => {
      mappedItem[header.key] = {
        value: item[header.key],
        class: header?.class,
        key: header?.key
      }
    })

    return h(TableCell(mappedItem, slots), { onClick: () => emit('select', item) })
  })

  return h(
    'tbody',
    { class: 'overflow-y-auto overflow-x-hidden md:scrollbar block h-full' },
    listMapped
  )
}

const LoadingSection = h(
  'tbody',
  { class: 'h-4/5 flex items-center justify-center' },
  h(BaseSpinner)
)

const notFoundSection = (notFoundDescription: string) =>
  h('tbody', { class: 'h-full flex items-center justify-center flex-col' }, [
    h('img', { src: emptyState, alt: 'empty state' }),
    h('p', { class: 'text-gray-700 text-center' }, notFoundDescription)
  ])

const TableRoot = {
  props: {
    headers: Array as PropType<iHeader[]>,
    list: Array,
    notFoundDescription: String,
    isLoading: Boolean
  },
  emits: ['select'],
  setup(props: Props, { slots, emit }: any) {
    const table = computed(() => {
      const Content = [TableHeader(props.headers, slots)]

      if (props.isLoading) {
        Content.push(LoadingSection)
      }

      if (!props.isLoading && props.list?.length) {
        Content.push(ListSection(props.list, props.headers, slots, emit))
      }

      if (!props.isLoading && !props.list?.length) {
        Content.push(notFoundSection(props.notFoundDescription))
      }

      return h('table', { class: 'border-gray-300 border w-full md:h-4/5 md:overflow-hidden padding-x-1' }, Content)
    })

    return () => table.value
  }
}

export default {
  Root: TableRoot,
  Header: TableHeader,
  Cell: TableCell // TODO: Colocar o HEADER e o CELL dentro de setups aqui no export para conseguir exporta eles individualmente
}
