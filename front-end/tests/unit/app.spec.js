import { shallowMount } from '@vue/test-utils'
import App from '@/App.vue'
import Form from '@/components/Form.vue'
import Data from '@/components/Data.vue'

describe('App.vue', () => {
  const wrapper = shallowMount(App)

  it('should be able to rendered with basic options', () => {
    expect(wrapper.isVueInstance()).toBeTruthy()
    expect(wrapper.vm.currentAction).toMatch('Form')
  })

  it('should have the title', () => {
    expect(wrapper.contains('h1')).toBe(true)
  })

  it('should have at least two links to manage form and data components', () => {
    expect(wrapper.contains('a')).toBe(true)
    expect(wrapper.findAll('a').length).toBe(2)
  })

  it('current action variable should be able to changed by data and form links', () => {
    wrapper.find({ ref: 'data-link' }).trigger('click')
    expect(wrapper.vm.currentAction).toMatch('Data')

    wrapper.find({ ref: 'form-link' }).trigger('click')
    expect(wrapper.vm.currentAction).toMatch('Form')
  })

  it('active component should be loaded correctly', async () => {
    wrapper.find({ ref: 'data-link' }).trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.activeComponent).toBe(Data)
    expect(wrapper.contains('data-stub')).toBe(true)
    
    wrapper.find({ ref: 'form-link' }).trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.activeComponent).toBe(Form)
    expect(wrapper.contains('form-stub')).toBe(true)
  })
})
