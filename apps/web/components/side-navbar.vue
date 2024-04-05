<script lang="ts" setup>
export interface LinkProp {
  title: string;
  label?: string;
  icon: string;
}

interface SideNavbarProps {
  links: LinkProp[];
}

defineProps<SideNavbarProps>();
</script>

<template>
  <div class="group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2">
    <nav class="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
      <a v-for="(link, index) of links" :key="`2-${index}`" href="#">
        <Icon :name="link.icon" class="mr-2 size-4" />
        {{ link.title }}
        <span v-if="link.label">
          {{ link.label }}
        </span>
      </a>
    </nav>
  </div>
</template>
