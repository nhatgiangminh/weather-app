<template>
  <Teleport to="body">
    <Transition name="modal-mask">
      <div v-show="isVisible" class=" w-full bg-opacity-30 bg-black absolute top-0 left-0 z-10 h-screen flex justify-center"
        @click="closeModal"
      >
        <Transition name="modal-content">
          <div v-if="isVisible" class="bg-white self-start max-w-screen-md mt-32 p-4 flex flex-col gap-4">
            <slot />
            
            <button class="bg-weather-secondary w-fit text-white text-lg flex items-center justify-center p-2"
              @click="closeModal"
            >
              Close
            </button>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>
<script setup lang="ts">
// import type { PropType } from 'vue';
defineProps<{
  isVisible: Boolean
}>()
const emit = defineEmits(['update:isVisible'])
const closeModal = ():void => {
  emit('update:isVisible', false)
}

</script>
<style>
.modal-mask-enter-active,
.modal-mask-leave-active {
  transition: opacity 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}

.modal-mask-enter-from,
.modal-mask-leave-to {
  opacity: 0;
}

.modal-content-enter-active,
.modal-content-leave-active {
  transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02) 0.15s;
}

.modal-content-leave-to {
  transform: scale(0.8);
}
.modal-content-enter-from {
  opacity: 0;
  transform: scale(0.8);
}
</style>