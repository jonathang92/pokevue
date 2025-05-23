import { ref } from 'vue'
import { fetchPokemonList, fetchPokemonDetails } from '@/services/pokemonService'
import type { PokemonListItem, PokemonDetails, PokemonDetailModal } from '@/interfaces/pokemons'

export function usePokemonList() {
  const pokemons = ref<PokemonListItem[]>([])
  const offset = ref(0)
  const limit = 100
  const loading = ref(false)
  const hasMore = ref(true)

  const loadMore = async () => {
    if (loading.value || !hasMore.value) return

    loading.value = true

    try {
      const { results, next } = await fetchPokemonList(offset.value, limit)

      pokemons.value.push(...results)

      offset.value += limit

      hasMore.value = !!next
    } catch (err) {
      console.error('Error loading pokemons', err)
    } finally {
      loading.value = false
    }
  }

  const loadModalDetail = async (name: string): Promise<PokemonDetailModal | null> => {
    try {
      const details = await fetchPokemonDetails(name)

      return mapModalDetails(details)
    } catch (err) {
      console.error(`Error loading details for ${name}`, err)

      return null
    }
  }

  const mapModalDetails = ({
    id,
    name,
    height,
    weight,
    types,
    sprites,
  }: PokemonDetails): PokemonDetailModal => {
    return {
      id,
      name,
      height: height / 10, // Convert to meters, originally in decimeters https://pokeapi.co/docs/v2#pokemon
      weight: weight / 10, // Convert to kilograms , originally in hectograms
      types: types.map((type) => type.type.name).join(', '),
      sprite: sprites.other.dream_world.front_default,
    }
  }

  return {
    pokemons,
    loadMore,
    loadModalDetail,
    loading,
    hasMore,
  }
}
