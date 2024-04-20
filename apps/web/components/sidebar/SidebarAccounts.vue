<script setup lang="ts">
const isOpen = ref(true)
</script>

<template>
  <Collapsible
    v-model:open="isOpen"
    class="w-full space-y-2"
  >
    <div class="flex justify-between items-center space-x-4 px-4">
      <CollapsibleTrigger as-child>
        <Button
          variant="ghost"
          size="sm"
          class="w-9 p-0 hover:bg-transparent"
        >
          <span class="text-sm font-medium uppercase">
            <Icon
              name="lucide:chevrons-up-down"
              class="h-4 w-4"
            /> Budget
          </span>
          <span class="sr-only">Toggle</span>
        </Button>
      </CollapsibleTrigger>
      <span class="text-xs font-mono text-gray-500">
        €1,871.00
      </span>
    </div>
    <CollapsibleContent class="space-y-2">
      <div class="flex justify-between rounded-md border px-4 py-3 font-mono text-sm">
        First account <span class="text-xs text-gray-500">€1,000.00</span>
      </div>
      <div class="flex justify-between rounded-md border px-4 py-3 font-mono text-sm">
        Second account <span class="text-xs text-gray-500">€871.00</span>
      </div>
    </CollapsibleContent>
  </Collapsible>
</template>
