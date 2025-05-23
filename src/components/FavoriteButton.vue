<script setup lang="ts">
defineProps<{ isFavorite: boolean }>()
defineEmits(['toggle'])
</script>

<template>
  <button class="favorite-button" :class="{ 'is-favorite': isFavorite }" @click="$emit('toggle')">
    <span class="material-symbols-rounded">star</span>
  </button>
</template>

<style scoped>
.favorite-button {
  background: var(--poke-color-grey-light);
  border-radius: 50%;
  width: 44px;
  height: 44px;
  border: none;
  padding: 0.5rem;
  cursor: pointer;
  color: var(--poke-color-grey-medium);
  box-shadow: none;
}

.favorite-button .material-symbols-rounded {
  font-size: 26px;
}

.favorite-button.is-favorite {
  color: var(--poke-color-gold); /* Color de la estrella cuando es favorito */
}
</style>
