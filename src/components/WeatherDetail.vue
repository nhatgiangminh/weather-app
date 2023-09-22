<template>
  <div class="flex flex-col text-white items-center">
    <!--Banner-->
    <div v-if="route.query.preview" class="w-full bg-weather-secondary py-2 flex justify-center items-center mb-8">
      <h1>
        You are currently previewing this city, click "+" button to start tracking this city.
      </h1>
    </div>
    <div v-else class="mb-8">

    </div>
    <!--Current weather-->
    <div class="flex flex-col gap-2 items-center mb-8">
      <p class="text-3xl">
        {{ store.currentWeatherData.name }}
      </p>
      <p>{{ dateConvert(store.currentWeatherData.dt) }} {{ timeConvert(store.currentWeatherData.dt) }}</p>
    </div>
    <div class="mb-8">
      <p class="text-8xl">
        {{ Math.round(store.currentWeatherData.main.temp) }}&deg;C
      </p>
    </div>
    <div>
      <p>
        Humidity: {{ store.currentWeatherData.main.humidity }}%
      </p>
      <p>
        Wind: {{ (store.currentWeatherData.wind.speed * 3.6).toFixed(2) }} km/h
      </p>
      <p class="text-xl mt-2 text-center">
        {{ store.currentWeatherData.weather[0].main }}
      </p>
    </div>
    <img
      :src="`https://openweathermap.org/img/wn/${store.currentWeatherData.weather[0].icon}@2x.png`"
      class="w-[120px] h-auto"
    >
    <hr class=" border-white w-full opacity-30 mt-3">
    <!--Hourly weather-->
    <div class=" py-4 px-6 w-full">
      <h2 class="mb-2">Hourly weather</h2>
      <div class="flex w-full overflow-x-scroll">
        <div class="flex flex-col items-center min-w-[12.5%]" v-for="weatherData in store.weatherData.list" :key="weatherData.dt">
          <p class=" opacity-70">
            {{ 
              new Date(weatherData.dt*1000).toLocaleTimeString('en-us', { hour: '2-digit', minute: '2-digit', hour12: false })
            }}
          </p>
          <div class="flex flex-col items-center pt-1">
            <p class=" font-medium">
              {{ 
                new Date(weatherData.dt*1000).toLocaleDateString('en-us', { weekday: 'short' })
              }}
            </p>
            <img class="w-[70px] h-auto" :src="`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`">
          </div>
          <p>
            {{ Math.round(weatherData.main.temp) }}&deg;C
          </p>
        </div>
      </div>
    </div>
    <div v-if="!route.query?.preview" @click="removeCity" class="flex items-center gap-2 cursor-pointer mt-14 mb-8">
      <i class="fa-solid fa-trash"></i>
      <p>Remove City</p>
    </div>
  </div>
</template>
<script setup lang="ts">
import { weatherStore } from '@/stores/weather'
import { useRoute, useRouter } from 'vue-router'
import { dateConvert, timeConvert } from '@/composables/dateConvert'

const route = useRoute()
const router = useRouter()
const store = weatherStore()
await store.fetchWeatherData(Number(route.query.lat), Number(route.query.lon))

const removeCity = () => {
  let savedCity = JSON.parse(localStorage.getItem('savedCity')!)
  savedCity = savedCity.filter((city:any) => city.id != route.query.id)

  localStorage.setItem('savedCity', JSON.stringify(savedCity))
  // store.$patch((state) => {
  //   state.listSavedCity = state.listSavedCity.filter((city:any) => city.coord.lat != route.query.lat && city.coord.lon != route.query.lon)
  // })

  console.log(savedCity)

  router.push({
    name: 'home'
  })
}
</script>