import { mount } from '@vue/test-utils'
import Paginator from '@/components/Paginator.vue'
import apiIndexResponse from './../mocks/api/index'

describe('Paginator.vue', () => {
  const wrapper = mount(Paginator, {
    propsData: {
      source: apiIndexResponse
    }
  })

  it('should mark current page as active', async () => {
    expect(wrapper.findAll('li').at(0).classes('active')).toBe(false)
    expect(wrapper.findAll('li').at(1).classes('active')).toBe(true)
  })

  it('should render pagination buttons by source`s last page value', async () => {
    expect(wrapper.isVueInstance()).toBeTruthy()
    expect(wrapper.contains('ul')).toBe(true)
    expect(wrapper.findAll('li').length).toBe(7)
  })

  it('should emit change event when clicked a page', async () => {
    wrapper.findAll('a').at(3).trigger('click')
    expect(wrapper.emitted().change).toBeTruthy()
    expect(wrapper.emitted().change.length).toBe(1)
    expect(wrapper.emitted().change[0]).toEqual([4])
  })
})
