<template>
  <div>
    <!-- Planet Details -->
    <div v-if="!loading" class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <DetailCard
        :title="planet.name"
        description="Planet Information"
        :details="{
          'Rotation Period': planet.rotation_period + ' hours',
          'Orbital Period': planet.orbital_period + ' days',
          Diameter: planet.diameter + ' km',
          Climate: planet.climate,
          Gravity: planet.gravity,
          Terrain: planet.terrain,
          'Surface Water': planet.surface_water + '%',
          Population: planet.population
        }"
        :isList="false"
      />

      <DetailCard
      v-if="residents.length > 0"
        title="Residents"
        description="Inhabitants of the Planet"
        :items="residents"
        :isList="true"
        @navigate="navigateTo"
      />

      <DetailCard
      v-if="films.length > 0"

        title="Films"
        description="Appearances in Films"
        :items="films"
        :isList="true"
        @navigate="navigateTo"
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

const route = useRoute();
const router = useRouter();
const planetId = route.params.id;

const planet = ref({});
const residents = ref([]);
const films = ref([]);
const loading = ref(true);
const error = ref(null);

async function fetchData(url) {
  const response = await fetch(url);
  return await response.json();
}

onMounted(async () => {
  try {
    const planetData = await fetchData(
      `https://swapi.py4e.com/api/planets/${planetId}/`
    );
    planet.value = planetData;

    const residentPromises = planetData.residents.map((url) => fetchData(url));
    const residentData = await Promise.all(residentPromises);
    residents.value = residentData.map((resident) => ({
      name: resident.name,
      url: resident.url,
    }));

    const filmPromises = planetData.films.map((url) => fetchData(url));
    films.value = await Promise.all(filmPromises);

    loading.value = false;
  } catch (err) {
    error.value = err.message || "Failed to fetch data.";
    loading.value = false;
  }
});

function navigateTo(url) {
  const segments = url.split('/').filter(Boolean);
  const type = segments.at(-2);
  const id = segments.at(-1);

  // Map API type to application route type
  const routeTypeMap = {
    people: 'characters', // Map 'people' to 'characters'
    // Add other mappings if needed
  };

  const routeType = routeTypeMap[type] || type;

  if (routeType && id) {
    router.push(`/${routeType}/${id}`);
  } else {
    console.error('Invalid URL:', url);
  }
}
</script>