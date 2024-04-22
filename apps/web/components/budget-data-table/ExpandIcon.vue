<script setup lang="ts">
const { expanded } = defineProps<{
  expanded: boolean
}>()

defineEmits(['expand'])
</script>

<template>
  <Button
    variant="ghost"
    size="icon"
    class="hover:bg-transparent"
    @click="$emit('expand')"
  >
    <Icon
      :name="cn(expanded && 'lucide:chevron-down', !expanded && 'lucide:chevron-right')"
      class="ml-2 h-4 w-4"
    />
  </Button>
</template>
