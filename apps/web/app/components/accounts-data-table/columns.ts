import { h } from 'vue'
import { createColumnHelper } from '@tanstack/vue-table'
import type { Payment } from './data'
import DropdownAction from './DropdownAction.vue'
import SortIcon from './SortIcon.vue'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'

const columnHelper = createColumnHelper<Payment>()

export const columns = [
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
    enableSorting: false,
    enableHiding: false,
  }),
  columnHelper.accessor('status', {
    header: 'Status',
    cell: ({ row }) =>
      h('div', { class: 'capitalize' }, row.getValue('status')),
  }),
  columnHelper.accessor('email', {
    header: ({ column }) => {
      return h(
        Button,
        {
          variant: 'ghost',
          onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
        },
        () => ['Email', h(SortIcon)],
      )
    },
    cell: ({ row }) => h('div', { class: 'lowercase' }, row.getValue('email')),
  }),
  columnHelper.accessor('amount', {
    header: ({ column }) => h(
      Button,
      {
        variant: 'ghost',
        onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
      },
      () => ['Amount', h(SortIcon)],
    ),
    cell: ({ row }) => {
      const amount = Number.parseFloat(row.getValue('amount'))

      // Format the amount as a dollar amount
      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(amount)

      return h('div', { class: 'font-medium' }, formatted)
    },
  }),
  columnHelper.display({
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original

      return h(
        'div',
        { class: 'relative' },
        h(DropdownAction, {
          payment,
        }),
      )
    },
  }),
]
