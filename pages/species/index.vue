<template>
  <div class="pb-10">
    <div class="flex justify-between py-6">
      <h1 class="md:text-4xl text-2xl text-yellow-500 font-bold">Species</h1>
      <PaginationComponent
        :total="totalSpecies"
        :previousPage="starWarStore.data.species.previous"
        :nextPage="starWarStore.data.species.next"
        @page-change="handlePageChange"
      />
    </div>

    <div
      v-if="!starWarStore.loading"
      class="grid mt-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
    >
      <ItemCard
        v-for="species in starWarStore.data.species.list"
        :key="species.url"
        :title="species.name"
        :link="`/species/${getSpeciesId(species.url)}`"
      >
        <div class="flex gap-1 items-center">
          <UsersRound class="w-3"/>
          <div class="text-xs">{{ species.people.length }} people</div>
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
import { useRouter } from 'vue-router';
import { useStarWarsStore } from '@/stores/starWarsStore';
import { Skeleton } from '@/components/ui/skeleton';
import { UsersRound } from 'lucide-vue-next';

const starWarStore = useStarWarsStore();
const totalSpecies = ref(0);

onMounted(async () => {
  if (starWarStore.data.species.list.length === 0) {
    await starWarStore.fetchSpecies();
  }
  try {
    const response = await fetch("https://swapi.py4e.com/api/species/");
    const data = await response.json();
    totalSpecies.value = data.count;
  } catch (error) {
    console.error("Failed to fetch total species:", error);
  }
});

const handlePageChange = async (page: string | number) => {
  const pageUrl = `https://swapi.py4e.com/api/species/?page=${page}`;
  await starWarStore.fetchSpecies(pageUrl);
};

const getSpeciesId = (speciesUrl: string) => {
  return speciesUrl.split("/").filter(Boolean).pop() || '';
};
</script>