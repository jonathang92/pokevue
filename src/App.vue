<script setup lang="ts">
import { RouterView } from 'vue-router'
import GlobalLoader from './components/GlobalLoader.vue'
</script>

<template>
  <RouterView />
  <GlobalLoader />
</template>
