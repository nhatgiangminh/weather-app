<template>
  <div class="flex flex-col text-white items-center justify-center w-full">
    <!--Banner-->
    <div v-if="route.query.preview" class="w-full bg-weather-secondary py-2 flex justify-center items-center mb-8">
      <h1>
        You are currently previewing this city, click "+" button to start tracking this city.
      </h1>
    </div>
    <div v-else class="mb-8">

    </div>
    <!--Current weather-->
    <div class="flex flex-col gap-2 items-center mb-8 w-full">
      <AnimatedPlaceholder class="max-w-[20%] w-full"/>
      <AnimatedPlaceholder class="max-w-[10%] w-full"/>
    </div>
    <div class="mb-8 flex justify-center">
      <AnimatedPlaceholder class="max-w-[50%] w-[100px]"/>
    </div>
    <div class="w-full flex flex-col items-center">
      <AnimatedPlaceholder class="max-w-[100px] w-full"/>
      <AnimatedPlaceholder class="max-w-[100px] w-full"/>
      <AnimatedPlaceholder class="max-w-[100px] w-full"/>
    </div>
    <AnimatedPlaceholder class="max-w-[20%] w-full"/>
    <hr class=" border-white w-full opacity-30 mt-3">
    <!--Hourly weather-->
    <div class=" py-4 px-6 w-full">
      <h2 class="mb-2">Hourly weather</h2>
      <div class="flex w-full">
        <div class="flex flex-col items-center min-w-[12.5%]" v-for="i in 7" :key="i">
          <AnimatedPlaceholder class="max-w-[50px] w-full"/>

          <div class="flex flex-col items-center pt-1 w-full">
            <AnimatedPlaceholder class="max-w-[50px] w-full"/>
            <AnimatedPlaceholder class="max-w-[50px] w-full"/>
          </div>
          <AnimatedPlaceholder class="max-w-[50px] w-full"/>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import AnimatedPlaceholder from '@/components/AnimatedPlaceholder.vue';
import { useRoute } from 'vue-router';

const route = useRoute()
</script>