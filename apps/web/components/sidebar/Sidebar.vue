<script lang="ts" setup>
import type { LinkProp } from './SidebarNav.vue'

interface SidebarProps {
  accounts: {
    label: string
    email: string
    icon: string
  }[]
  isCollapsed?: boolean
}

withDefaults(defineProps<SidebarProps>(), {
  isCollapsed: false,
})

const links: LinkProp[] = [
  {
    title: 'Budget',
    label: '128',
    url: '/budget',
    icon: 'carbon:money',
  },
  {
    title: 'Reports',
    label: '9',
    url: '/',
    icon: 'lucide:bar-chart-big',
  },
  {
    title: 'All Accounts',
    label: '',
    url: '/accounts',
    icon: 'lucide:landmark',
  },
]
</script>

<template>
  <div :class="cn('flex h-[52px] items-center justify-center', isCollapsed ? 'h-[52px]' : 'px-2')">
    <SidebarAccountSwitcher :is-collapsed="isCollapsed" :accounts="accounts" />
  </div>
  <Separator />
  <SidebarNav :is-collapsed="isCollapsed" :links="links" />
  <Separator class="mb-4" />
  <div class="px-5 flex flex-col content-between gap-6" :class="{ hidden: isCollapsed }">
    <SidebarAccounts />
    <div>
      <SidebarCreateAccount />
    </div>
  </div>
</template>
