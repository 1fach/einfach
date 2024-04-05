<script lang="ts" setup>
import type { LinkProp } from './side-navbar.vue'

const links: LinkProp[] = [
  {
    title: 'Inbox',
    label: '128',
    icon: 'lucide:inbox',
  },
  {
    title: 'Drafts',
    label: '9',
    icon: 'lucide:file',
  },
  {
    title: 'Sent',
    label: '',
    icon: 'lucide:send',
  },
  {
    title: 'Junk',
    label: '23',
    icon: 'lucide:archive',
  },
  {
    title: 'Trash',
    label: '',
    icon: 'lucide:trash',
  },
  {
    title: 'Archive',
    label: '',
    icon: 'lucide:archive',
  },
]

const links2: LinkProp[] = [
  {
    title: 'Social',
    label: '972',
    icon: 'lucide:user-2',
  },
  {
    title: 'Updates',
    label: '342',
    icon: 'lucide:alert-circle',
  },
  {
    title: 'Forums',
    label: '128',
    icon: 'lucide:message-square',
  },
  {
    title: 'Shopping',
    label: '8',
    icon: 'lucide:shopping-cart',
  },
  {
    title: 'Promotions',
    label: '21',
    icon: 'lucide:archive',
  },
]
</script>

<template>
  <div class="h-full max-h-[800px] items-stretch">
    <div>
      <div class="flex h-[52px] items-center justify-center">
        <AccountSwitcher />
      </div>
      <Divider :pt="{
        root: 'my-0',
      }" :ptOptions="{
        mergeProps: customMergeProps
      }" />
      <SideNavbar :links="links" />
      <Divider :pt="{
        root: 'my-0',
      }" :ptOptions="{
        mergeProps: customMergeProps
      }" />
      <SideNavbar :links="links2" />
    </div>
  </div>
</template>