<script setup lang="ts">
import { computed } from 'vue'
import { useFavoritesStore } from '@/stores/favorites'
import FavoriteButton from './FavoriteButton.vue'
import type { PokemonListItem } from '@/interfaces/pokemons'

const props = defineProps<{ pokemon: PokemonListItem }>()

const favoritesStore = useFavoritesStore()

const emit = defineEmits<{
  (event: 'card-click', pokemon: PokemonListItem): void
}>()

const handleClick = () => {
  emit('card-click', props.pokemon)
}

const toggleFavorite = () => {
  favoritesStore.toggleFavorite(props.pokemon)
}

const isFavorite = computed(() => favoritesStore.isFavorite(props.pokemon.name))
</script>

<template>
  <li>
    <button class="pokemon-item" @click="handleClick">
      <span>{{ pokemon.name }}</span>
      <FavoriteButton :isFavorite="isFavorite" @toggle="toggleFavorite" @click.stop />
    </button>
  </li>
</template>

<style scoped>
.pokemon-item {
  width: 100%;
  border: unset;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 5px;
  padding-block: 8px;
  padding-inline: 20px 10px;
  background-color: var(--poke-color-base-white);
}

.pokemon-item:last-child {
  border-bottom: none;
}

.pokemon-item span {
  font-size: 22px;
  font-weight: 500;
  text-transform: capitalize;
}
</style>
