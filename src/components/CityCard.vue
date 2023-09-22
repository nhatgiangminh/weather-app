<template>
  <div class="flex items-center bg-weather-secondary py-4 px-3 rounded-md cursor-pointer">
    <div class="flex flex-col flex-1">
      <h2 class="text-xl sm:text-2xl">{{ city.name }}</h2>
    </div>

    <div class="flex flex-col">
      <h2 class="text-xl sm:text-2xl">{{ Math.round(city.main.temp) }}&deg;C</h2>
      <div class="flex gap-4">
        <span class=" text-sm">
          H: {{ Math.round(city.main.temp_max) }}&deg;C
        </span>
        <span class=" text-sm">
          L: {{ Math.round(city.main.temp_min) }}&deg;C
        </span>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
defineProps<{
  city: any
}>()

</script>