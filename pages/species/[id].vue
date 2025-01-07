<template>
  <div>
    <!-- Species Details -->
    <div v-if="!loading" class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <DetailCard
        :title="species.name"
        description="Species Information"
        :details="{
          Classification: species.classification,
          Designation: species.designation,
          'Average Height': species.average_height + ' cm',
          'Skin Colors': species.skin_colors,
          'Hair Colors': species.hair_colors,
          'Eye Colors': species.eye_colors,
          'Average Lifespan': species.average_lifespan + ' years',
          Language: species.language,
          Homeworld: homeworldName,
        }"
        :isList="false"
      />
      <DetailCard
        v-if="films.length > 0"
        title="Films"
        description="Appearances in Films"
        :items="films.map(film => ({
          ...film,
          url: `/films/${getIdFromUrl(film.url)}`
        }))"
        :isList="true"
      />
      <DetailCard
        v-if="people.length > 0"
        title="People"
        description="Members of this Species"
        :items="people.map(person => ({
          ...person,
          url: `/characters/${getIdFromUrl(person.url)}`
        }))"
        :isList="true"
      />
    </div>
    <div v-if="loading" class="flex flex-col space-y-3 mt-20">
      <Skeleton class="bg-gray-800 h-[50px] w-[250px] rounded-xl" />
      <Skeleton class="bg-gray-800 h-[20px] w-[200px] rounded-xl" />

      <div class="space-y-2">
        <Skeleton class="h-4 w-[250px] bg-gray-800" />
        <Skeleton class="h-4 w-[200px] bg-gray-800" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { Skeleton } from '@/components/ui/skeleton';


const route = useRoute();
const speciesId = route.params.id;

const species = ref({});
const homeworldName = ref("Unknown");
const people = ref([]);
const films = ref([]);
const loading = ref(true);
const error = ref(null);

async function fetchData(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json();
}

onMounted(async () => {
  try {
    const speciesData = await fetchData(`https://swapi.py4e.com/api/species/${speciesId}/`);
    species.value = speciesData;

    if (speciesData.homeworld) {
      const homeworldData = await fetchData(speciesData.homeworld);
      homeworldName.value = homeworldData.name;
    }

    const peoplePromises = speciesData.people.map(fetchData);
    people.value = await Promise.all(peoplePromises);

    const filmPromises = speciesData.films.map(fetchData);
    films.value = await Promise.all(filmPromises);

    loading.value = false;
  } catch (err) {
    error.value = err.message || "Failed to fetch data.";
    loading.value = false;
  }
});

function getIdFromUrl(url) {
  return url.split("/").filter(Boolean).pop();
}
</script>