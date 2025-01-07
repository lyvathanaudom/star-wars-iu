<template>
  <div class="pb-10">
    <div class="flex md:flex-row flex-col gap-4 md:gap-0 justify-between py-6">
      <h1 class="md:text-4xl text-2xl text-yellow-500 font-bold">Characters</h1>
      <PaginationComponent
        :total="totalCharacters"
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
        v-for="character in starWarStore.enrichedCharacters"
        :key="character.url"
        :title="character.name"
        :link="`/characters/${getCharacterId(character.url)}`"
      >
        <div class="flex gap-1 items-center">
          <ContactRound class="w-3" />
          <div class="text-xs">{{ character.speciesName || "Unknown" }}</div>
        </div>
        <div class="flex gap-1 items-center">
          <Home class="w-3" />
          <div class="text-xs">{{ character.homeworldName || "Unknown" }}</div>
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
import { useStarWarsStore } from "@/stores/starWarsStore";
import { Skeleton } from "@/components/ui/skeleton";
import { ContactRound, Home } from "lucide-vue-next";
const starWarStore = useStarWarsStore();
const totalCharacters = ref(0);
const router = useRouter();

onMounted(async () => {
  if (starWarStore.data.characters.list.length === 0) {
    await starWarStore.fetchCharacters();
  }
  try {
    const response = await fetch("https://swapi.py4e.com/api/people/");
    const data = await response.json();
    totalCharacters.value = data.count;
  } catch (error) {
    console.error("Failed to fetch total characters:", error);
  }
});

const handlePageChange = (page: string | number) => {
  const pageUrl = `https://swapi.py4e.com/api/people/?page=${page}`;
  starWarStore.fetchCharacters(pageUrl);
};

const getCharacterId = (characterUrl: string) => {
  return characterUrl.split("/").filter(Boolean).pop() || '';
};
</script>