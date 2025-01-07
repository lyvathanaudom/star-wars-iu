<template>
  <Card
    class="cursor-pointer bg-gray-900 border-none rounded-lg flex-1 hover:bg-gray-800 transition-colors duration-200"
    @click="handleClick"
  >
    <CardHeader class="text-white p-4">
      <CardTitle class="text-xl text-yellow-500 font-semibold">
        {{ props.title }}
      </CardTitle>
      <CardDescription class="text-sm">
        <slot></slot>
      </CardDescription>
    </CardHeader>
  </Card>
</template>

<script setup lang="ts">
const props = defineProps<{
  title: string;
}>();

const emit = defineEmits<{
  (e: 'click'): void;
}>();

const handleClick = () => {
  emit('click');
};
</script>