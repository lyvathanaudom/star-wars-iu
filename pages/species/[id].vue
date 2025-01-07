<template>
  <div>
    <!-- Species Details -->
    <div
      v-if="!loading"
      class="grid grid-cols-1 md:grid-cols-2 gap-4"
    >
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
      v-if="films.length > 0 "
        title="Films"
        description="Appearances in Films"
        :items="films"
        :isList="true"
        @navigate="navigateTo"
      />
      <DetailCard
      v-if="people.length > 0"
        title="People"
        description="Members of this Species"
        :items="people"
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
const speciesId = route.params.id;

const species = ref({});
const homeworldName = ref("Unknown");
const people = ref([]);
const films = ref([]);
const loading = ref(true);
const error = ref(null);

async function fetchData(url) {
  const response = await fetch(url);
  return await response.json();
}

onMounted(async () => {
  try {
    const speciesData = await fetchData(
      `https://swapi.py4e.com/api/species/${speciesId}/`
    );
    species.value = speciesData;

    if (speciesData.homeworld) {
      const homeworldData = await fetchData(speciesData.homeworld);
      homeworldName.value = homeworldData.name;
    }

    const peoplePromises = speciesData.people.map((url) => fetchData(url));
    const peopleData = await Promise.all(peoplePromises);
    people.value = peopleData.map((person) => ({
      name: person.name,
      url: person.url,
    }));

    const filmPromises = speciesData.films.map((url) => fetchData(url));
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
