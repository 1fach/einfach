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
    icon: 'carbon:money',
    variant: 'default',
  },
  {
    title: 'Reports',
    label: '9',
    icon: 'lucide:bar-chart-big',
    variant: 'ghost',
  },
  {
    title: 'All Accounts',
    label: '',
    icon: 'lucide:landmark',
    variant: 'ghost',
  }
]

</script>

<template>
  <div :class="cn('flex h-[52px] items-center justify-center', isCollapsed ? 'h-[52px]' : 'px-2')">
    <SidebarAccountSwitcher
      :is-collapsed="isCollapsed"
      :accounts="accounts"
    />
  </div>
  <Separator />
  <SidebarNav
    :is-collapsed="isCollapsed"
    :links="links"
  />
  <Separator />
  <div class="px-5">
    <SidebarAccounts
      :class="{ 'hidden': isCollapsed }"
    />
  </div>
</template>