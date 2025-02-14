<template>
  <div class="pb-10">
    <div class="flex justify-between py-6">
      <h1 class="md:text-4xl text-2xl text-yellow-500 font-bold">Films</h1>
      <PaginationComponent
        :total="totalFilms"
        :previousPage="starWarStore.data.films.previous"
        :nextPage="starWarStore.data.films.next"
        @page-change="handlePageChange"
      />
    </div>

    <div
      v-if="!starWarStore.loading"
      class="grid mt-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
    >
      <ItemCard
        v-for="film in starWarStore.data.films.list"
        :key="film.url"
        :title="film.title"
        :link="`/films/${getFilmId(film.url)}`"
      >
        <div class="flex gap-1 items-center">
          <Calendar class="w-3" />
          <div class="text-xs">Release Date: {{ film.release_date }}</div>
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
import { Calendar } from 'lucide-vue-next';


const starWarStore = useStarWarsStore();
const totalFilms = ref(0);

onMounted(async () => {
  if (starWarStore.data.films.list.length === 0) {
    await starWarStore.fetchFilms();
  }
  try {
    const response = await fetch("https://swapi.py4e.com/api/films/");
    const data = await response.json();
    totalFilms.value = data.count;
  } catch (error) {
    console.error("Failed to fetch total films:", error);
  }
});

const handlePageChange = (page: string | number) => {
  const pageUrl = `https://swapi.py4e.com/api/films/?page=${page}`;
  starWarStore.fetchFilms(pageUrl);
};

const getFilmId = (filmUrl: string) => {
  return filmUrl.split("/").filter(Boolean).pop() || '';
};
</script>