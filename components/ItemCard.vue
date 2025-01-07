<template>
  <NuxtLink
    :to="link"
    class="flex-1"
  >
    <Card
      class="cursor-pointer bg-gray-900 border-none rounded-lg hover:bg-gray-800 transition-colors duration-200"
    >
      <CardHeader class="text-white p-4">
        <CardTitle class="text-xl text-yellow-500 font-semibold">
          {{ title }}
        </CardTitle>
        <CardDescription class="text-sm">
          <slot></slot>
        </CardDescription>
      </CardHeader>
    </Card>
  </NuxtLink>
</template>

<script setup lang="ts">
const props = defineProps<{
  title: string;
  link: string;
}>();
</script>