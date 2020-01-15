import { shallowMount } from '@vue/test-utils'
import Form from '@/components/Form.vue'

describe('Form.vue', () => {
  const wrapper = shallowMount(Form)

  it('should be able to rendered with basic options', () => {
    expect(wrapper.isVueInstance()).toBeTruthy()
    expect(typeof wrapper.vm.form).toBe('object')
    expect(typeof wrapper.vm.form.author).toBe('object')
    expect(typeof wrapper.vm.form.book).toBe('object')
    expect(wrapper.vm.form.author.name).toBe(null)
  })

  it('should have basic elements', () => {
    expect(wrapper.contains({ ref: 'form-title'})).toBe(true)
    expect(wrapper.contains('form')).toBe(true)
    expect(wrapper.contains('#author-name')).toBe(true)
    expect(wrapper.contains('#author-age')).toBe(true)
    expect(wrapper.contains('#author-address')).toBe(true)
    expect(wrapper.contains('#book-name')).toBe(true)
    expect(wrapper.contains('#book-release-date')).toBe(true)

    expect(wrapper.findAll('input').length).toBe(4)
    expect(wrapper.findAll('textarea').length).toBe(1)
    expect(wrapper.contains('button')).toBe(true)
  })

  it('form should be able to filled', () => {
    wrapper.find('#author-name').setValue('Karl R. Popper')
    wrapper.find('#author-age').setValue(92)
    wrapper.find('#author-address').setValue('Karl-Popper-Straße, Vienna, Austria')
    wrapper.find('#book-name').setValue('The Logic Of Scientific Discovery')
    wrapper.find('#book-release-date').setValue('1959-07-28')

    expect(wrapper.vm.form.author.name).toBe('Karl R. Popper')
    expect(wrapper.vm.form.author.age).toBe('92')
    expect(wrapper.vm.form.author.address).toBe('Karl-Popper-Straße, Vienna, Austria')
    expect(wrapper.vm.form.book.name).toBe('The Logic Of Scientific Discovery')
    expect(wrapper.vm.form.book.release_date).toBe('1959-07-28')
  })
})
