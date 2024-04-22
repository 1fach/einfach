import { h } from 'vue'
import { createColumnHelper } from '@tanstack/vue-table'
import type { Budget } from './data'

import ExpandIcon from './ExpandIcon.vue'
import { Checkbox } from '@/components/ui/checkbox'

const columnHelper = createColumnHelper<Budget>()
export const columns = [
  columnHelper.display({
    id: 'expand',
    header: ({ table }) => h(ExpandIcon, {
      expanded: table.getIsAllRowsExpanded(),
      onExpand: () => table.toggleAllRowsExpanded(),
    }),
    cell: ({ row }) => row.getCanExpand()
      ? h(ExpandIcon, {
        expanded: row.getIsExpanded(),
        onExpand: row.getToggleExpandedHandler(),
      })
      : h('div', { class: 'w-10 h-10' }),
  }),
  columnHelper.display({
    id: 'select',
    header: ({ table }) =>
      h(Checkbox, {
        'checked':
          table.getIsAllPageRowsSelected()
          || (table.getIsSomePageRowsSelected() && 'indeterminate'),
        'onUpdate:checked': value => table.toggleAllPageRowsSelected(!!value),
        'ariaLabel': 'Select all',
        'class': 'block',
      }),
    cell: ({ row }) => {
      return h(Checkbox, {
        'checked': row.getIsSelected(),
        'onUpdate:checked': value => row.toggleSelected(!!value),
        'ariaLabel': 'Select row',
        'class': 'block',
      })
    },
  }),
  columnHelper.accessor('group', {
    header: () => h('span', { class: 'capitalize' }, 'Category'),
    cell: ({ getValue }) => h('div', { class: 'capitalize' }, getValue()),
  }),
  columnHelper.accessor('assigned', {
    header: () => h('span', { class: 'capitalize' }, 'Assigned'),
    cell: ({ row, getValue }) =>
      row.getCanExpand()
        ? (
            h('div', { class: 'capitalize' }, getValue())
          )
        : (
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
