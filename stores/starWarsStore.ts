import { defineStore } from 'pinia';
import { ref } from 'vue';
import { fetchData } from '@/services/starWarsService'; 

// Define the expected structure of the data
interface Person {
  // Define properties based on the API response
}

interface Starship {
  // Define properties based on the API response
}

interface Planet {
  // Define properties based on the API response
}

export const useStarWarsStore = defineStore('starWars', () => {
  const people = ref<Person[]>([]);
  const starships = ref<Starship[]>([]);
  const planets = ref<Planet[]>([]);

  const loadAllData = async () => {
    people.value = await fetchData('people');
    starships.value = await fetchData('starships');
    planets.value = await fetchData('planets');
  };

  return { people, starships, planets, loadAllData };
});