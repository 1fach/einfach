<script lang="ts" setup>
import { buttonVariants } from '@/components/ui/button'

export interface LinkProp {
  title: string
  label?: string
  url: string
  icon: string
}

interface NavProps {
  isCollapsed: boolean
  links: LinkProp[]
}

defineProps<NavProps>()
</script>

<template>
  <div :data-collapsed="isCollapsed" class="group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2">
    <nav class="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
      <template v-for="(link, index) of links">
        <Tooltip v-if="isCollapsed" :key="`1-${index}`" :delay-duration="0">
          <TooltipTrigger as-child>
            <NuxtLink :to="link.url" :class="cn(
              buttonVariants({ variant: 'ghost', size: 'icon' }), 'h-9 w-9')">
              <Icon :name="link.icon" class="size-4" />
              <span class="sr-only">{{ link.title }}</span>
            </NuxtLink>
          </TooltipTrigger>
          <TooltipContent side="right" class="flex items-center gap-4">
            {{ link.title }}
            <span v-if="link.label" class="ml-auto text-muted-foreground">
              {{ link.label }}
            </span>
          </TooltipContent>
        </Tooltip>

        <NuxtLink v-else :key="`2-${index}`" :to="link.url" :class="cn(
          buttonVariants({ variant: 'ghost', size: 'sm' }), 'justify-start text-base py-6')">
          <Icon :name="link.icon" class="mr-2 size-4" />
          {{ link.title }}
          <span v-if="link.label" class="ml-auto">
            {{ link.label }}
          </span>
        </NuxtLink>
      </template>
    </nav>
  </div>
</template>

<style scoped>
.router-link-active {
  @apply bg-primary text-primary-foreground;
}

.router-link-active:hover {
  @apply bg-primary/90;
}
</style>
