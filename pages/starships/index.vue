<template>
  <div class="pb-10">
    <div class="flex justify-between py-6">
      <h1 class="md:text-4xl text-2xl text-yellow-500 font-bold">Starships</h1>
      <PaginationComponent
        :total="totalStarships"
        :previousPage="starWarStore.data.starships.previous"
        :nextPage="starWarStore.data.starships.next"
        @page-change="handlePageChange"
      />
    </div>

    <div
      v-if="!starWarStore.loading"
      class="grid mt-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
    >
      <ItemCard
        v-for="starship in starWarStore.data.starships.list"
        :key="starship.url"
        :title="starship.name"
        :link="`/starships/${getStarshipId(starship.url)}`"
      >
        <div class="flex gap-1 items-center">
          <Rocket class="w-3"/>
          <div class="text-xs">{{ starship.model }}</div>
        </div>
      </ItemCard>
    </div>
    <div v-if="starWarStore.loading" class="flex items-center space-x-4">
      <Skeleton class="h-16 w-16 bg-gray-800 rounded-full" />
      <div class="space-y-2">
        <Skeleton class="h-4 bg-gray-800 w-[250px]" />
        <Skeleton class="h-4 bg-gray-800 w-[200px]" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useStarWarsStore } from '@/stores/starWarsStore';
import { Skeleton } from '@/components/ui/skeleton';
import { Rocket } from 'lucide-vue-next';

const starWarStore = useStarWarsStore();
const totalStarships = ref(0);

onMounted(async () => {
  if (starWarStore.data.starships.list.length === 0) {
    await starWarStore.fetchStarships();
  }
  try {
    const response = await fetch("https://swapi.py4e.com/api/starships/");
    const data = await response.json();
    totalStarships.value = data.count;
  } catch (error) {
    console.error("Failed to fetch total starships:", error);
  }
});

const handlePageChange = async (page: string | number) => {
  const pageUrl = `https://swapi.py4e.com/api/starships/?page=${page}`;
  await starWarStore.fetchStarships(pageUrl);
};

const getStarshipId = (starshipUrl: string) => {
  return starshipUrl.split("/").filter(Boolean).pop() || '';
};
</script>