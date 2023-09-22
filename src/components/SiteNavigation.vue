<template>
  <header class="sticky top-0 py-6 shadow-lg flex flex-row">
    <nav class="container flex flex-col sm:flex-row text-white gap-4 items-center ">
      <RouterLink :to="{ name: 'home' }">
        <div class="flex items-center gap-3 flex-1">
          <i class="fa-solid fa-sun text-2xl"></i>
          <p class="text-2xl">The Local Weather</p>
        </div>
      </RouterLink>
      <div class="flex flex-1 justify-end gap-3">
        <i @click="openModal" class="fa-solid fa-circle-info text-xl hover:text-weather-secondary duration-150
        cursor-pointer"></i>
        <i v-if="route.query.preview" @click="addCity" class="fa-solid fa-plus text-xl hover:text-weather-secondary duration-150
        cursor-pointer"></i>
      </div>
    </nav>
    <BaseModal v-model:is-visible="isVisible">
      <div class="text-black">
        <h1 class="text-2xl mb-1">About:</h1>
        <p class="mb-4">
          The Local Weather allows you to track the current and
          future weather of cities of your choosing.
        </p>
        <h2 class="text-2xl">How it works:</h2>
        <ol class="list-decimal list-inside mb-4">
          <li>
            Search for your city by entering the name into the
            search bar.
          </li>
          <li>
            Select a city within the results, this will take
            you to the current weather for your selection.
          </li>
          <li>
            Track the city by clicking on the "+" icon in the
            top right. This will save the city to view at a
            later time on the home page.
          </li>
        </ol>

        <h2 class="text-2xl">Removing a city</h2>
        <p>
          If you no longer wish to track a city, simply select
          the city within the home page. At the bottom of the
          page, there will be am option to delete the city.
        </p>
      </div>
    </BaseModal>
  </header>
</template>
<script lang="ts" setup>
import BaseModal from './BaseModal.vue';
import type City from '@/interfaces/City'
import { ref, type Ref } from 'vue';
import { RouterLink } from 'vue-router';
import { useRoute, useRouter } from 'vue-router';
import { weatherStore } from '@/stores/weather';

const savedCity:Ref<City[]> = ref([])
const route = useRoute()
const store = weatherStore()
const router = useRouter()

const isVisible:Ref<Boolean> = ref(false)
const openModal = ():void => {
  isVisible.value = true
}

const addCity = () => {
  if (localStorage.getItem('savedCity')) {
    savedCity.value = JSON.parse(localStorage.getItem('savedCity')!)
  }

  const cityObject:City = {
    id: store.currentWeatherData.id,
    name: route.params.city.toString(),
    coord: {
      lat: Number(route.query.lat),
      lon: Number(route.query.lon)
    }
  }

  savedCity.value.push(cityObject)
  localStorage.setItem('savedCity', JSON.stringify(savedCity.value))

  let query = Object.assign({}, route.query)
  delete query.preview
  router.replace({ query })
}


</script>