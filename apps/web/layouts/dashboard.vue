<script setup lang="ts">
const navCollapsedSize = 2
const isCollapsed = ref(false)
const defaultLayout = [100, 440]

function onCollapse() {
  isCollapsed.value = true
}

function onExpand() {
  isCollapsed.value = false
}

const accounts = [
  {
    label: 'Alicia Koch',
    email: 'alicia@example.com',
    icon: 'ion:logo-vercel',
  },
  {
    label: 'Alicia Koch',
    email: 'alicia@gmail.com',
    icon: 'mdi:google',
  },
  {
    label: 'Alicia Koch',
    email: 'alicia@me.com',
    icon: 'bx:bxl-gmail',
  },
]
</script>

<template>
  <TooltipProvider :delay-duration="0">
    <ResizablePanelGroup id="budget-panel-group" direction="horizontal" class="min-h-screen items-stretch">
      <ResizablePanel id="sidebar-panel" :default-size="defaultLayout[0]" :collapsed-size="navCollapsedSize" collapsible
        :min-size="15" :max-size="25" :class="cn(isCollapsed && 'min-w-[50px] transition-all duration-300 ease-in-out')"
        @expand="onExpand" @collapse="onCollapse">
        <Sidebar :accounts="accounts" :is-collapsed="isCollapsed" />
      </ResizablePanel>
      <ResizableHandle id="sidebar-handle" with-handle />
      <ResizablePanel id="app-panel" :default-size="defaultLayout[1]" :min-size="30">
        <div class="container py-10 mx-auto">
          <slot />
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  </TooltipProvider>
</template>
