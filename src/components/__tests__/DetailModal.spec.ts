import { describe, it, expect, vi } from 'vitest' // Importamos 'vi' de vitest
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import { createPinia } from 'pinia'
import DetailModal from '../DetailModal.vue'
import type { PokemonDetailModal } from '@/interfaces/pokemons'

const mockPokemonDetails: PokemonDetailModal = {
  id: 2,
  name: 'pikachu',
  sprite: 'pikachu.png',
  weight: 60,
  height: 4,
  types: 'electric',
}

if (typeof window !== 'undefined' && typeof HTMLDialogElement !== 'undefined') {
  HTMLDialogElement.prototype.showModal = vi.fn() // Mock showModal method for the dialog element D:
  HTMLDialogElement.prototype.close = vi.fn(function (this: HTMLDialogElement) {
    this.dispatchEvent(new Event('close'))
  })
}

describe('DetailModal.vue', () => {
  it('DetailModal should be rendered', () => {
    const wrapper = mount(DetailModal, {
      props: {
        details: mockPokemonDetails,
      },
      global: {
        plugins: [createPinia()],
      },
    })

    const dialog = wrapper.find('dialog')
    expect(dialog.exists()).toBe(true)
    expect(wrapper.find('.details p:nth-child(4) span.capitalize').text()).toBe(
      mockPokemonDetails.types,
    )
  })

  it('"close-modal" event should be emitted if the close button is clicked', async () => {
    const wrapper = mount(DetailModal, {
      props: {
        details: mockPokemonDetails,
      },
      global: {
        plugins: [createPinia()],
      },
    })
    wrapper.vm.open()
    await nextTick()
    const closeButton = wrapper.find('.modal-close button')
    expect(closeButton.exists()).toBe(true)
    await closeButton.trigger('click')
    expect(wrapper.emitted()['close-modal']).toBeTruthy()
    expect(wrapper.emitted()['close-modal'].length).toBe(2)
  })
})
