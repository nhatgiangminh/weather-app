<template>
  <main class="container text-white">
    <div class=" pt-4 mb-8 relative">
      <input
        type="text"
        v-model="searchValue"
        @input="searchHandler"
        placeholder="Enter city name"
        class="bg-transparent w-full border-b border-white focus:border-weather-secondary
        focus:outline-none py-2 px-1 shadow-[0px_1px_0_0_#004E71]"
      />
      <ul v-if="listPlaces.length && !searchError" class="absolute bg-weather-secondary w-full top-[60px] px-1 py-1">
        <li v-for="place in listPlaces"
          class=" my-2 hover:cursor-pointer"
          :key="place.id"
          @click="onClickCity(place)"
        >
          {{ place.name }}
        </li>
      </ul>
      <template v-else-if="searchError">
        <ul class="absolute bg-weather-secondary bg-opacity-30 w-full top-[60px] px-1 py-1">
          <li class=" my-2">
            No data!
          </li>
        </ul>
      </template>
    </div>
    <div>
      <Suspense timeout="1">
        <CityList />
        <template #fallback>
          <CityCardSkeleton />
        </template>
      </Suspense>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, type Ref } from 'vue';
import { weatherStore } from '@/stores/weather';
import { useRouter } from 'vue-router';
import CityList from '@/components/CityList.vue';
import CityCardSkeleton from '@/components/CityCardSkeleton.vue';

const store = weatherStore()
const router = useRouter()
const searchValue:Ref<string | null> = ref(null)
const searchTimeOut:Ref<any> = ref(null)
const listPlaces:Ref<any> = ref([])
const searchError:Ref<boolean> = ref(false)

const searchHandler = (e: Event):void => {
  e.preventDefault
  clearTimeout(searchTimeOut.value)
  searchTimeOut.value = setTimeout(async () => {
    if (searchValue.value) {
      try {
        await store.fetchListPlace(searchValue.value)
        listPlaces.value = store.getListPlace
        searchError.value = listPlaces.value.length ? false : true
      } catch (error) {
        searchError.value = true
      }
      return
    }
    searchError.value = false
    listPlaces.value = []
  }, 400)
}

const onClickCity = (place: any):void => {
  const cityName = place.name.replaceAll(' ', '-')
  router.push({
    name: 'CityView',
    params: {
      city: cityName
    },
    query: {
      lat: place.lat,
      lon: place.lon,
      preview: 'true'
    }
  })
}

</script>
