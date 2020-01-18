import { mount } from '@vue/test-utils'
import OrderTitle from '@/components/OrderTitle.vue'

describe('OrderTitle.vue', () => {
  const wrapper = mount(OrderTitle, {
    propsData: {
      params: {
        order_by: 'id',
        order_type: 'ASC'
      },
      title: 'Surname',
      field: 'surname'
    }
  })

  it('should show field with title as a link', async () => {
    expect(wrapper.contains('a')).toBe(true)
    expect(wrapper.text().includes('Surname')).toBeTruthy()
    expect(wrapper.contains('span.not-active')).toBeTruthy()
    expect(wrapper.contains('span.active')).toBeFalsy()
  })

  it('should change active order column when user clicks the link', async () => {
    wrapper.find('a').trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.emitted().change).toBeTruthy()
    expect(wrapper.emitted().change[0]).toEqual(['surname', 'ASC'])
  })

  it('should update itself when the params have been changed.', async () => {
    wrapper.setProps({
      params: {
        order_by: 'surname',
        order_type: 'ASC'
      }
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.contains('span.active')).toBeTruthy()
    expect(wrapper.contains('span.not-active')).toBeFalsy()
  })

  it('should change directive when user clicks same order title', async () => {
    wrapper.find('a').trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.emitted().change).toBeTruthy()
    expect(wrapper.emitted().change[1]).toEqual(['surname', 'DESC'])
  })
})
