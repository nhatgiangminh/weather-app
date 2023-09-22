<template>
  <div class="flex items-center bg-weather-secondary py-4 px-3 rounded-md cursor-pointer">
    <div class="flex flex-col flex-1">
      <AnimatedPlaceholder class=" max-w-[50%]"/>
    </div>

    <div class="flex flex-col flex-1 items-end">
      <AnimatedPlaceholder class=" max-w-[50%] w-full"/>
      <div class="flex gap-4 w-full justify-end">
        <AnimatedPlaceholder class=" max-w-[50px] w-full"/>
        <AnimatedPlaceholder class=" max-w-[50px] w-full"/>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import AnimatedPlaceholder from './AnimatedPlaceholder.vue';
</script>