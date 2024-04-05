<script lang="ts" setup>
const isCollapsed = false;

const accounts = [
  {
    label: "Andreas Müller",
    email: "andreas.mueller@vercel.com",
    icon: "ion:logo-vercel",
  },
  {
    label: "Alicia Koch",
    email: "alicia@gmail.com",
    icon: "mdi:google",
  },
  {
    label: "Emily Smith",
    email: "emily.smith@me.com",
    icon: "bx:bxl-gmail",
  },
];

const selectedEmail = ref<string>(accounts[0].email);
const selectedEmailData = computed(() =>
  accounts.find((item) => item.email === selectedEmail.value)
);
</script>

<template>
  <Dropdown v-model="selectedEmail" :options="accounts" optionLabel="label" optionValue="email"
    placeholder="Select an Account" aria-label="Select account" :class="[
    'flex items-center gap-2 [&>span]:line-clamp-1 [&>span]:flex [&>span]:w-full [&>span]:items-center [&>span]:gap-1 [&>span]:truncate [&_svg]:h-4 [&_svg]:w-4 [&_svg]:shrink-0',
    {
      'flex h-9 w-9 shrink-0 items-center justify-center p-0 [&>span]:w-auto [&>div[data-pc-section=trigger]]:hidden':
        isCollapsed,
    },
  ]">
    <template #value="slotProps">
      <div v-if="slotProps.value" class="flex items-center gap-3">
        <Icon class="size-4" :name="selectedEmailData!.icon" />
        <span v-if="!isCollapsed">
          {{ selectedEmailData!.label }}
        </span>
      </div>
      <span v-else>
        {{ slotProps.placeholder }}
      </span>
    </template>
    <template #option="slotProps">
      <div class="flex items-center gap-3 [&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:text-foreground">
        <Icon class="size-4" :name="slotProps.option.icon" />
        {{ slotProps.option.email }}
      </div>
    </template>
  </Dropdown>
</template>
