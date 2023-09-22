<template>
  <div>
    <Suspense timeout="0">
      <WeatherDetail />
      <template #fallback>
        <WeatherDetailSkeleton />
      </template>
    </Suspense>
  </div>
</template>

<script setup lang="ts">
import WeatherDetail from '@/components/WeatherDetail.vue'
import WeatherDetailSkeleton from '@/components/WeatherDetailSkeleton.vue'
</script>