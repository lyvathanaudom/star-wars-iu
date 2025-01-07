<template>
  <div
    class="relative bg-cover bg-center"
    style="
      background-image: linear-gradient(
          to bottom,
          rgba(0, 0, 0, 1),
          rgba(0, 0, 0, 0.3),
          rgba(0, 0, 0, 1)
        ),
        url('https://wallpapers.com/images/featured/star-wars-plzcoaffexgf4h81.jpg');
    "
  >
    <!-- Darker overlay -->
    <div class="absolute inset-0 bg-black opacity-0"></div>
    <div class="relative z-10 text-white flex flex-col items-center h-[100vh]">
      <NavBar />
      <div
        class="mt-20 px-0 px-[5%] sm:px-[0] text-center flex flex-col items-center justify-between h-full"
      >
        <div>
          <h1
            class="md:text-[65px] text-2xl text-yellow-500 font-semibold mb-4 leading-relaxed tracking-widest"
          >
            STAR WARS UNIVERSE
          </h1>
          <p class="mb-6 text-md max-w-3xl">
            Explore the vast galaxy of Star Wars, from the iconic characters and
            starships to the mysterious planets and species. Dive into the lore
            and discover the stories that have captivated audiences for
            generations.
          </p>
        </div>

        <NuxtLink
          to="/explore"
          class="bg-white bg-opacity-5 text-white px-12 py-2 rounded-full mb-24 border border-white backdrop-blur hover:backdrop-blur-lg transition"
        >
          Explore
        </NuxtLink>
      </div>
    </div>
  </div>
</template>