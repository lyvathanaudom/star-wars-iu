<template>
  <div class="text-white pb-10">
    <h1 class="text-4xl font-semibold text-yellow-500 mt-6">Explore</h1>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
      <NuxtLink
        v-for="(item, index) in items"
        :key="index"
        :to="item.to"
        class="relative bg-gray-950 rounded-lg overflow-hidden shadow-lg"
      >
        <!-- Image -->
        <img
          :src="item.imgSrc"
          :alt="item.alt"
          class="w-full h-56 object-cover"
        />
        
        <!-- Gradient Overlay -->
        <div
          class="absolute inset-0 bg-gradient-to-t from-black via-black-50 to-transparent"
        ></div>

        <!-- Title -->
        <div class="absolute inset-0 flex items-end p-4">
          <h2 class="text-4xl font-semibold">{{ item.title }}</h2>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
const items = [
  {
    to: "/films",
    imgSrc: "https://static1.colliderimages.com/wordpress/wp-content/uploads/2023/04/star-wars-characters.jpeg",
    alt: "Films",
    title: "Films",
  },
  {
    to: "/starships",
    imgSrc: "https://www.denofgeek.com/wp-content/uploads/2019/12/x-wing.jpg?fit=1944%2C1339",
    alt: "Starships",
    title: "Starships",
  },
  {
    to: "/vehicles",
    imgSrc: "https://www.cnet.com/a/img/resize/e9b8ad84d5d263ec8afe07cc1285666fafa2544d/hub/2015/02/05/8b785eba-fa23-4241-a444-c45c7ff7f4a9/star-wars-vehicles-imperial-star-destroyer.png?auto=webp&width=1200",
    alt: "Vehicles",
    title: "Vehicles",
  },
  {
    to: "/characters",
    imgSrc: "https://static1.srcdn.com/wordpress/wp-content/uploads/2021/08/Mandalorian-Grogu-Annoying.jpg",
    alt: "Characters",
    title: "Characters",
  },
  {
    to: "/species",
    imgSrc: "https://static1.srcdn.com/wordpress/wp-content/uploads/2017/01/Xizor.jpg",
    alt: "Species",
    title: "Species",
  },
  {
    to: "/planets",
    imgSrc: "https://assets.science.nasa.gov/dynamicimage/assets/science/astro/exo-explore/internal_resources/121/Star_Wars_Kepler-22b_Kamino.png?w=1280&h=720&fit=clip&crop=faces%2Cfocalpoint",
    alt: "Planets",
    title: "Planets",
  },
];
</script>
