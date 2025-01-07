<template>
  <Card class="mb-4 bg-transparent border-none text-white">
    <CardHeader>
      <CardTitle class="text-yellow-500">{{ title }}</CardTitle>
      <CardDescription v-if="description">{{ description }}</CardDescription>
    </CardHeader>
    <CardContent>
      <div v-if="isList">
        <ul class="list-disc">
          <li
            v-for="item in items"
            :key="item.url"
            @click="navigate(item.url)"
            class="cursor-pointer hover:underline"
          >
            {{ item.name || item.title }}
          </li>
        </ul>
      </div>
      <div v-else>
        <p v-for="(value, key) in details" :key="key">
          {{ key }}: {{ value }}
        </p>
      </div>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from "vue";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const props = defineProps({
  title: String,
  description: String,
  items: Array,
  details: Object,
  isList: Boolean,
});

const emit = defineEmits(['navigate']);

function navigate(url) {
  emit('navigate', url);
}
</script>