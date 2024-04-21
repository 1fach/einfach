<script setup lang="ts">
const { expanded } = defineProps<{
  expanded: boolean
}>()
</script>

<template>
  <Icon :name="cn(expanded && 'lucide:chevron-down', !expanded && 'lucide:chevron-right')" class="ml-2 h-4 w-4" />
</template>
