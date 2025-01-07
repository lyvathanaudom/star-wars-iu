<template>
  <div class="pb-10">
    <div class="flex justify-between py-6">
      <h1 class="md:text-4xl text-2xl text-yellow-500 font-bold">Starships</h1>
      <PaginationComponent
        :total="totalStarships"
        :previousPage="starWarStore.previousPage"
        :nextPage="starWarStore.nextPage"
        @page-change="handlePageChange"
      />
    </div>

    <div
      v-if="!starWarStore.loading"
      class="grid mt-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
    >
      <ItemCard
        v-for="starship in starWarStore.starships"
        :key="starship.url"
        :title="starship.name"
        @click="navigateToStarship(starship.url)"
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
import { useRouter } from 'vue-router';
import { useStarWarsStore } from '@/stores/starWarsStore';
import { Skeleton } from '@/components/ui/skeleton';
import { Rocket } from 'lucide-vue-next';


const starWarStore = useStarWarsStore();
const totalStarships = ref(0);
const router = useRouter();

onMounted(async () => {
  if (starWarStore.starships.length === 0) {
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

const handlePageChange = (page: string | number) => {
  let pageUrl: string;
  if (typeof page === "string") {
    const url = new URL(page);
    const pageNumber = url.searchParams.get("page") || "1";
    pageUrl = `https://swapi.py4e.com/api/starships/?page=${pageNumber}`;
  } else {
    pageUrl = `https://swapi.py4e.com/api/starships/?page=${page}`;
  }
  starWarStore.fetchStarships(pageUrl);
};

const navigateToStarship = (starshipUrl: string) => {
  const starshipId = starshipUrl.split("/").filter(Boolean).pop();
  if (starshipId) {
    router.push(`/starships/${starshipId}`);
  } else {
    console.error("Invalid starship URL:", starshipUrl);
  }
};
</script>