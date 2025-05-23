import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { PokemonListItem } from '@/interfaces/pokemons'

export const useFavoritesStore = defineStore(
  'favorites',
  () => {
    const favorites = ref<PokemonListItem[]>([])

    function toggleFavorite(pokemon: PokemonListItem) {
      const index = favorites.value.findIndex((p) => p.name === pokemon.name)
      if (index !== -1) {
        favorites.value.splice(index, 1)
      } else {
        favorites.value.push(pokemon)
      }
    }

    function isFavorite(name: string) {
      return favorites.value.some((p) => p.name === name)
    }

    return { favorites, toggleFavorite, isFavorite }
  },
  {
    persist: true, // Persist the store state using Pinia Plugin Persistedstate
  },
)
