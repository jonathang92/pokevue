import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import FavoriteButton from '../FavoriteButton.vue'

describe('FavoriteButton.vue', () => {
  it('FavoriteButton should be rendered and "is-favorite" class should exist if isFavorite is true', () => {
    const wrapper = mount(FavoriteButton, {
      props: {
        isFavorite: true,
      },
    })
    const button = wrapper.find('button.favorite-button')
    const icon = button.find('span.material-symbols-rounded')
    expect(button.exists()).toBe(true)
    expect(button.classes()).toContain('is-favorite')
    expect(icon.exists()).toBe(true)
    expect(icon.text()).toBe('star')
  })

  it('emits "toggle" event when clicked', async () => {
    const wrapper = mount(FavoriteButton, {
      props: {
        isFavorite: false,
      },
    })

    const button = wrapper.find('button.favorite-button')
    await button.trigger('click')
    expect(wrapper.emitted().toggle).toBeTruthy()
    expect(wrapper.emitted().toggle.length).toBe(1)
  })
})
