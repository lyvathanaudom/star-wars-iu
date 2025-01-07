<template>
  <div>
    <!-- Character Details -->
    <div v-if="!loading" class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <DetailCard
        v-if="character.name"
        :title="character.name"
        description="Character Information"
        :details="{
          Homeworld: homeworldName,
          Species: speciesName,
          Height: character.height + ' cm',
          Mass: character.mass + ' kg',
          'Hair Color': character.hair_color,
          'Skin Color': character.skin_color,
          'Eye Color': character.eye_color,
          'Birth Year': character.birth_year,
          Gender: character.gender,
        }"
        :isList="false"
      />

      <DetailCard
        v-if="films.length > 0"
        title="Films"
        description="Appearances in Films"
        :items="films.map(film => ({ ...film, url: `/films/${getIdFromUrl(film.url)}` }))"
        :isList="true"
      />

      <DetailCard
        v-if="vehicles.length > 0"
        title="Vehicles"
        description="Vehicles Used"
        :items="vehicles.map(vehicle => ({ ...vehicle, url: `/vehicles/${getIdFromUrl(vehicle.url)}` }))"
        :isList="true"
      />

      <DetailCard
        v-if="starships.length > 0"
        title="Starships"
        description="Starships Piloted"
        :items="starships.map(starship => ({ ...starship, url: `/starships/${getIdFromUrl(starship.url)}` }))"
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
import { useStarWarsStore } from '@/stores/starWarsStore';
import { Skeleton } from '@/components/ui/skeleton';
import DetailCard from '@/components/DetailCard';

const route = useRoute();
const characterId = route.params.id;

const character = ref({});
const homeworldName = ref("");
const speciesName = ref("Unknown");
const films = ref([]);
const vehicles = ref([]);
const starships = ref([]);
const loading = ref(true);
const error = ref(null);

const starWarStore = useStarWarsStore();

async function fetchData(url) {
  const response = await fetch(url);
  return await response.json();
}

onMounted(async () => {
  try {
    const characterData = await fetchData(`https://swapi.py4e.com/api/people/${characterId}/`);
    character.value = characterData;

    const homeworldData = await fetchData(characterData.homeworld);
    homeworldName.value = homeworldData.name;

    if (characterData.species.length > 0) {
      const speciesData = await fetchData(characterData.species[0]);
      speciesName.value = speciesData.name;
    }

    const filmPromises = characterData.films.map((url) => fetchData(url));
    films.value = await Promise.all(filmPromises);

    const vehiclePromises = characterData.vehicles.map((url) => fetchData(url));
    vehicles.value = await Promise.all(vehiclePromises);

    const starshipPromises = characterData.starships.map((url) => fetchData(url));
    starships.value = await Promise.all(starshipPromises);

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