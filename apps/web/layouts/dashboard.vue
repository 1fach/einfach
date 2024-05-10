<script setup lang="ts">
const navCollapsedSize = 2
const isCollapsed = useState(() => false)

// Persist state with SSR
const layout = useCookie<number[]>('splitter:layout', {
  default: () => ([15, 85]),
})

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
    <ResizablePanelGroup
      id="bpg-1"
      direction="horizontal"
      class="min-h-screen items-stretch"
      @layout="layout = $event"
    >
      <ResizablePanel
        id="bpg-1-side-1"
        :default-size="layout[0]"
        :collapsed-size="navCollapsedSize"
        collapsible
        :min-size="15"
        :max-size="20"
        :class="cn(isCollapsed && 'min-w-[50px] transition-all duration-300 ease-in-out')"
        @expand="onExpand"
        @collapse="onCollapse"
      >
        <Sidebar
          :accounts="accounts"
          :is-collapsed="isCollapsed"
        />
      </ResizablePanel>
      <ResizableHandle
        id="bpg-1-sideresize-1"
        with-handle
      />
      <ResizablePanel
        id="bpg-1-main-1"
        :default-size="layout[1]"
        :min-size="30"
      >
        <div class="container py-10 mx-auto">
          <slot />
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  </TooltipProvider>
</template>
