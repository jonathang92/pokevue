import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import PokemonList from '../PokemonList.vue'
import PokemonCard from '../PokemonCard.vue'
import type { PokemonListItem } from '@/interfaces/pokemons'

vi.mock('vue-router', () => ({
  useRouter: () => ({
    push: vi.fn(), // mock for push method in useRouter
  }),
}))

describe('PokemonList.vue', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('PokemonList should be rendered correctly and without PokemonCard components', () => {
    const wrapper = mount(PokemonList, { global: { plugins: [createPinia()] } })

    const component = wrapper.find('div.pokemon-list')

    expect(component.exists()).toBe(true)

    const cards = wrapper.findAllComponents(PokemonCard)

    expect(cards.length).toBe(0)
  })

  it('should render the correct number of PokemonCard components when provided with a list and infinite scroll/loading/hasMore are false', () => {
    const mockPokemons: PokemonListItem[] = [
      { name: 'bulbasaur', url: '' },
      { name: 'ivysaur', url: '' },
      { name: 'venusaur', url: '' },
    ]

    const wrapper = mount(PokemonList, {
      props: {
        pokemons: mockPokemons,
        useInfiniteScroll: false,
        loading: false,
        hasMore: false,
      },
      global: {
        plugins: [createPinia()],
      },
    })

    const cards = wrapper.findAllComponents(PokemonCard)
    expect(cards.length).toBe(mockPokemons.length)
  })
})
