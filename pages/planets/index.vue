<template>
  <div class="pb-10">
    <div class="flex justify-between py-6">
      <h1 class="md:text-4xl text-2xl text-yellow-500 font-bold">Planets</h1>
      <PaginationComponent
        :total="totalPlanets"
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
        v-for="planet in starWarStore.planets"
        :key="planet.url"
        :title="planet.name"
        @click="navigateToPlanet(planet.url)"
      >
        <div class="flex gap-1 items-center">
          <Globe class="w-3" />
          <div class="text-xs">{{ planet.terrain || "Unknown" }}</div>
        </div>
        <div class="flex gap-1 items-center">
          <UsersRound class="w-3" />
          <div class="text-xs">{{ planet.population }}</div>
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
import { useStarWarsStore } from '@/stores/starWarsStore';
import { Skeleton } from '@/components/ui/skeleton';
import { Globe, UsersRound } from 'lucide-vue-next';

const starWarStore = useStarWarsStore();
const totalPlanets = ref(0);
const router = useRouter();

onMounted(async () => {
  if (starWarStore.planets.length === 0) {
    await starWarStore.fetchPlanets();
  }
  try {
    const response = await fetch("https://swapi.py4e.com/api/planets/");
    const data = await response.json();
    totalPlanets.value = data.count;
  } catch (error) {
    console.error("Failed to fetch total planets:", error);
  }
});

const handlePageChange = (page: string | number) => {
  let pageUrl: string;
  if (typeof page === "string") {
    const url = new URL(page);
    const pageNumber = url.searchParams.get("page") || "1";
    pageUrl = `https://swapi.py4e.com/api/planets/?page=${pageNumber}`;
  } else {
    pageUrl = `https://swapi.py4e.com/api/planets/?page=${page}`;
  }
  starWarStore.fetchPlanets(pageUrl);
};

const navigateToPlanet = (planetUrl: string) => {
  const planetId = planetUrl.split("/").filter(Boolean).pop();
  if (planetId) {
    router.push(`/planets/${planetId}`);
  } else {
    console.error("Invalid planet URL:", planetUrl);
  }
};
</script>