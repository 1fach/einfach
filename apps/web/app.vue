<script setup lang="ts">
// https://www.radix-vue.com/utilities/config-provider#hydration-issue-vue-3-5
import { ConfigProvider } from 'radix-vue'

const useIdFunction = () => useId()
</script>

<template>
  <NuxtLoadingIndicator />
  <ConfigProvider :use-id="useIdFunction">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </ConfigProvider>
</template>
