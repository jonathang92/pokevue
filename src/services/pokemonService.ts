import type { PokemonListResponse, PokemonDetails } from '@/interfaces/pokemons'

const API_BASE = 'https://pokeapi.co/api/v2'

export const fetchPokemonList = async (offset = 0, limit = 20): Promise<PokemonListResponse> => {
  const response = await fetch(`${API_BASE}/pokemon?offset=${offset}&limit=${limit}`)
  if (!response.ok) throw new Error('Error fetching Pokémon list')
  return response.json()
}

export const fetchPokemonDetails = async (name: string): Promise<PokemonDetails> => {
  const response = await fetch(`${API_BASE}/pokemon/${name}`)
  if (!response.ok) throw new Error('Error fetching Pokémon details')
  return response.json()
}
