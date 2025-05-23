export interface PokemonListItem {
  name: string
  url: string
}

export interface PokemonListResponse {
  count: number
  next: string | null
  previous: string | null
  results: PokemonListItem[]
}

export interface PokemonDetails {
  id: number
  name: string
  height: number
  weight: number
  types: {
    slot: number
    type: {
      name: string
      url: string
    }
  }[]
  sprites: {
    other: { dream_world: { front_default: string } }
  }
}

export interface PokemonDetailModal {
  id: number
  name: string
  height: number
  weight: number
  types: string
  sprite: string
}
