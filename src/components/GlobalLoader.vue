<script setup lang="ts">
import { useLoaderStore } from '@/stores/loader'
const store = useLoaderStore()
</script>

<template>
  <transition name="fade">
    <div v-if="store.isLoading" class="loader-overlay">
      <img src="/public/images/loader.svg" class="pokeball" alt="Loading..." loading="lazy" />
    </div>
  </transition>
</template>

<style scoped>
.loader-overlay {
  position: fixed;
  top: 0;
  inset-inline-start: 0;
  width: 100%;
  height: 100%;
  background: var(--poke-color-grey-lightest);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.pokeball {
  width: 106px;
  height: 106px;
  animation: spin 1.5s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
