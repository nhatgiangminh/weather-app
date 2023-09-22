<script setup lang="ts">
import { RouterView } from 'vue-router'
import SiteNavigation from './components/SiteNavigation.vue';
</script>

<template>
  <div class="flex flex-col flex-1 font-Roboto min-h-screen bg-weather-primary">
    <SiteNavigation/>
    <RouterView v-slot="{ Component }">
      <Transition mode="out-in">
        <component :is="Component"></component>
      </Transition>
    </RouterView>
  </div>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: 600ms all ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
