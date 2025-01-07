<template>
  <Pagination
    v-slot="{ page }"
    :total="total"
    :sibling-count="1"
    show-edges
    :default-page="1"
  >
    <PaginationList v-slot="{ items }" class="flex items-center gap-x-4 flex-wrap">
      <PaginationPrev
        :disabled="!previousPage?.length"
        @click="$emit('page-change', previousPage)"
        class="text-gray-800 bg-yellow-500 rounded-3xl border-none w-8 h-8"
      />
      <template v-for="(item, index) in items" :key="index">
        <PaginationListItem
          v-if="item.type === 'page'"
          :value="item.value"
          as-child
        >
          <Button
            :class="[ 
              'p-0 rounded-3xl transition duration-300',
              item.value === page
                ? 'bg-yellow-500 text-gray-800'
                : 'bg-transparent text-white border-none hover:bg-yellow-500',
              'disabled:bg-gray-500 disabled:cursor-not-allowed',
              'w-8 h-8', // Default size
            ]"
            :variant="item.value === page ? 'default' : 'outline'"
            @click="$emit('page-change', item.value)"
          >
            {{ item.value }}
          </Button>
        </PaginationListItem>
        <PaginationEllipsis v-else :key="item.type" :index="index" />
      </template>
      <PaginationNext
        :disabled="!nextPage?.length"
        @click="$emit('page-change', nextPage)"
        class="text-gray-800 bg-yellow-500 rounded-3xl border-none w-8 h-8"
      />
    </PaginationList>
  </Pagination>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  total: Number,
  previousPage: String,
  nextPage: String,
});

const emit = defineEmits(['page-change']);
</script>