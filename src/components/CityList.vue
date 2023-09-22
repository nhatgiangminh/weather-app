<template>
  <div v-if="store.listSavedCity.length" class="flex flex-col gap-4">
    <CityCard @click="goToCity(city)" v-for="city in store.listSavedCity" :key="city.id" :city="city"/>
  </div>
  <p v-else>No locations added. To start tracking a location, search in a field above</p>
</template>
<script setup lang="ts">
import { weatherStore } from '@/stores/weather'
import { useRouter } from 'vue-router'
import CityCard from '@/components/CityCard.vue'

const store = weatherStore()
const router = useRouter()

await store.fetchListCityWeather()

const goToCity = (city:any) => {
  router.push({
    name: 'CityView',
    params: {
      city: city.name.replaceAll(' ', '-')
    },
    query: {
      lat: city.coord.lat,
      lon: city.coord.lon,
      id: city.id
    }
  })
}
</script>