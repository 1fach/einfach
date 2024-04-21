import { h } from 'vue'
import type { Budget } from './data'
import { createColumnHelper } from '@tanstack/vue-table'

import { Checkbox } from '@/components/ui/checkbox'
import ExpandIcon from './ExpandIcon.vue'

const columnHelper = createColumnHelper<Budget>()
export const columns = [
  columnHelper.display({
    id: 'select',
    header: ({ table }) =>
      h(Checkbox, {
        'checked':
          table.getIsAllPageRowsSelected()
          || (table.getIsSomePageRowsSelected() && 'indeterminate'),
        'onUpdate:checked': (value) => table.toggleAllPageRowsSelected(!!value),
        'ariaLabel': 'Select all',
      }),
    cell: ({ row }) => {
      return h(Checkbox, {
        'checked': row.getIsSelected(),
        'onUpdate:checked': (value) => row.toggleSelected(!!value),
        'ariaLabel': 'Select row',
      })
    },
  }),
  columnHelper.display({
    id: 'expand',
    header: () => h(ExpandIcon, { expanded: false }),
    cell: () => h(ExpandIcon, { expanded: false }),
  }),
  columnHelper.accessor('category', {
    header: () => h('span', { class: 'capitalize' }, 'Category'),
    cell: ({ getValue }) => h('div', { class: 'capitalize' }, getValue()),
  }),
  columnHelper.accessor('assigned', {
    header: () => h('span', { class: 'capitalize' }, 'Assigned'),
    cell: ({ row, getValue }) =>
      row.getCanExpand() ? (
        h('div', { class: 'capitalize' }, getValue())
      ) : (
        h('div', { class: 'capitalize' }, getValue())
      ),
  }),
  columnHelper.accessor('activity', {
    header: () => h('span', { class: 'capitalize' }, 'Activity'),
    cell: ({ getValue }) =>
      h('div', { class: 'capitalize' }, getValue()),
  }),
  columnHelper.accessor('available', {
    header: () => h('span', { class: 'capitalize' }, 'Available'),
    cell: ({ getValue }) =>
      h('div', { class: 'capitalize' }, getValue()),
  }),
]