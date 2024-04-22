<script setup lang="ts">
import {
  add,
  eachMonthOfInterval,
  endOfYear,
  format,
  isEqual,
  isFuture,
  parse,
  startOfMonth,
  startOfToday,
} from 'date-fns'
import { buttonVariants } from '@/components/ui/button'

function getStartOfCurrentMonth() {
  return startOfMonth(startOfToday())
}

interface MonthPickerProps {
  currentMonth: Date
  onMonthChange: (newMonth: Date) => void
}

const { currentMonth } = defineProps<MonthPickerProps>()

const currentYear = useState(() => format(currentMonth, 'yyyy'))
const firstDayCurrentYear = computed(() => parse(currentYear.value, 'yyyy', new Date()))
const months = computed(() => eachMonthOfInterval({
  start: firstDayCurrentYear.value,
  end: endOfYear(firstDayCurrentYear.value),
}))

function previousYear() {
  currentYear.value = format(add(firstDayCurrentYear.value, { years: -1 }), 'yyyy')
}

function nextYear() {
  currentYear.value = format(add(firstDayCurrentYear.value, { years: 1 }), 'yyyy')
}
</script>

<template>
  <div class="p-3">
    <div class="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
      <div class="space-y-4">
        <div class="relative flex items-center justify-center pt-1">
          <div
            id="month-picker"
            class="text-sm font-medium"
            aria-live="polite"
            role="presentation"
          >
            {{ format(firstDayCurrentYear, 'yyyy') }}
          </div>
          <div class="flex items-center space-x-1">
            <button
              name="previous-year"
              aria-label="Go to previous year"
              :class="cn(
                buttonVariants({ variant: 'outline' }),
                'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100',
                'absolute left-1',
              )"
              type="button"
              @click="previousYear"
            >
              <Icon
                name="lucide:chevron-left"
                class="h-4 w-4"
              />
            </button>
            <button
              name="next-year"
              aria-label="Go to next year"
              :class="cn(
                buttonVariants({ variant: 'outline' }),
                'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100',
                'absolute right-1 disabled:bg-slate-100',
              )"
              type="button"
              :disabled="isFuture(add(firstDayCurrentYear, { years: 1 }))"
              @click="nextYear"
            >
              <Icon
                name="lucide:chevron-right"
                class="h-4 w-4"
              />
            </button>
          </div>
        </div>
        <div
          class="grid w-full grid-cols-3 gap-2"
          role="grid"
          aria-labelledby="month-picker"
        >
          <div
            v-for="month in months"
            :key="month.toString()"
            class="relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-slate-100 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md dark:[&:has([aria-selected])]:bg-slate-800"
            role="presentation"
          >
            <button
              name="day"
              :class="cn(
                'inline-flex h-9 w-16 items-center justify-center rounded-md p-0 text-sm font-normal ring-offset-white transition-colors hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 aria-selected:opacity-100 dark:ring-offset-slate-950 dark:hover:bg-slate-800 dark:hover:text-slate-50 dark:focus-visible:ring-slate-800',
                isEqual(month, currentMonth)
                  && 'bg-slate-900 text-slate-50 hover:bg-slate-900 hover:text-slate-50 focus:bg-slate-900 focus:text-slate-50 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50 dark:hover:text-slate-900 dark:focus:bg-slate-50 dark:focus:text-slate-900',
                !isEqual(month, currentMonth)
                  && isEqual(month, getStartOfCurrentMonth())
                  && 'bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-slate-50',
              )"
              :disabled="isFuture(month)"
              role="gridcell"
              :tabindex="-1"
              type="button"
              @click="onMonthChange(month)"
            >
              <time :datetime="format(month, 'yyyy-MM-dd')">
                {{ format(month, 'MMM') }}
              </time>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
