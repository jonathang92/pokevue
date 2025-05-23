import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { RouterLink } from 'vue-router'
import BaseButton from '../BaseButton.vue'

describe('BaseButton.vue', () => {
  it('BaseButton should be rendered', () => {
    const wrapper = mount(BaseButton)
    expect(wrapper.find('button').exists()).toBe(true)
    expect(wrapper.classes()).toContain('base-button')
  })

  it('should render the slot', () => {
    const slotContent = 'text'
    const wrapper = mount(BaseButton, {
      slots: {
        default: slotContent,
      },
    })
    expect(wrapper.text()).toBe(slotContent)
  })

  it('the button should emit a click', async () => {
    const wrapper = mount(BaseButton)
    await wrapper.trigger('click')
    expect(wrapper.emitted().click).toBeTruthy()
    expect(wrapper.emitted().click.length).toBe(1)
  })

  it('should render a RouterLink', () => {
    const toProp = '/home'
    const wrapper = mount(BaseButton, {
      props: {
        isLink: true,
        to: toProp,
      },
      global: {
        stubs: {
          RouterLink: true,
        },
      },
    })
    expect(wrapper.findComponent(RouterLink).exists()).toBe(true)
    expect(wrapper.findComponent(RouterLink).props('to')).toBe(toProp)
  })
})
