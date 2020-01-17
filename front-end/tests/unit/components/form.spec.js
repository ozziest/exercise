import { mount } from '@vue/test-utils'
import flushPromises from 'flush-promises'
import Form from '@/components/Form.vue'
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import '@/initialize.js'

describe('Form.vue', () => {

  const wrapper = mount(Form, { sync: false })

  it('should be able to rendered with basic options', () => {
    expect(wrapper.isVueInstance()).toBeTruthy()
    expect(typeof wrapper.vm.form).toBe('object')
    expect(typeof wrapper.vm.form.author).toBe('object')
    expect(typeof wrapper.vm.form.book).toBe('object')
    expect(wrapper.vm.form.author.name).toBe(null)
  })

  it('validation provider should be loaded correctly', () => {
    expect(wrapper.contains(ValidationObserver)).toBe(true)
    expect(wrapper.contains(ValidationProvider)).toBe(true)
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
    expect(wrapper.find('button').element.type).toBe('submit')
  })

  it('when form submit, execute form validations', async () => {
    wrapper.find('form').trigger('submit')
    await flushPromises()
    expect(wrapper.text().includes('Author Name is not valid.')).toBeTruthy()
  })

  it('form required validations should work correctly', async () => {
    wrapper.find('#author-name').setValue('')
    wrapper.find('#author-age').setValue('')
    wrapper.find('#author-address').setValue('')
    wrapper.find('#book-name').setValue('')

    await flushPromises()

    expect(wrapper.vm.$refs.authorNameProvider.errors[0]).toBe('Author Name is not valid.')
    expect(wrapper.vm.$refs.authorAgeProvider.errors[0]).toBe('Author Age is not valid.')
    expect(wrapper.vm.$refs.authorAddressProvider.errors[0]).toBe('Author Address is not valid.')
    expect(wrapper.vm.$refs.bookNameProvider.errors[0]).toBe('Book Name is not valid.')

    expect(wrapper.text().includes('Author Name is not valid.')).toBeTruthy()
    expect(wrapper.text().includes('Author Age is not valid.')).toBeTruthy()
    expect(wrapper.text().includes('Author Address is not valid.')).toBeTruthy()
    expect(wrapper.text().includes('Book Name is not valid.')).toBeTruthy()
  })

  it('author`s age range validation', async () => {
    wrapper.find('#author-age').setValue('200')
    await flushPromises()
    expect(wrapper.vm.form.author.age).toBe('200')
    expect(wrapper.vm.$refs.authorAgeProvider.errors[0]).toBe('Author Age is not valid.')
    expect(wrapper.text().includes('Author Age is not valid.')).toBeTruthy()

    wrapper.find('#author-age').setValue('-10')
    await flushPromises()
    expect(wrapper.vm.form.author.age).toBe('-10')
    expect(wrapper.vm.$refs.authorAgeProvider.errors[0]).toBe('Author Age is not valid.')
    expect(wrapper.text().includes('Author Age is not valid.')).toBeTruthy()
  })

  it('author`s name max length validation', async () => {
    wrapper.find('#author-name').setValue('This is a name which is too long for the field but we should try.')
    await flushPromises()
    expect(wrapper.vm.form.author.name).toBe('This is a name which is too long for the field but we should try.')
    expect(wrapper.vm.$refs.authorNameProvider.errors[0]).toBe('Author Name is not valid.')
    expect(wrapper.text().includes('Author Name is not valid.')).toBeTruthy()
  })

  it('author`s address max length validation', async () => {
    const longAddress = `
      Dolor qui ut ut aliquip ullamco officia adipisicing enim commodo sunt officia consectetur.
      Occaecat enim Lorem adipisicing dolore irure esse irure quis ad sit. Sit esse labore mollit
      proident esse dolor excepteur id consectetur. Sit esse labore mollit proident esse
      dolor excepteur id consectetur.
    `.trim()
    wrapper.find('#author-address').setValue(longAddress)
    await flushPromises()
    expect(wrapper.vm.form.author.address).toBe(longAddress)
    expect(wrapper.vm.$refs.authorAddressProvider.errors[0]).toBe('Author Address is not valid.')
    expect(wrapper.text().includes('Author Address is not valid.')).toBeTruthy()
  })

  it('book`s name max length validation', async () => {
    wrapper.find('#book-name').setValue('This is a name which is too long for the field but we should try.')
    await flushPromises()
    expect(wrapper.vm.form.book.name).toBe('This is a name which is too long for the field but we should try.')
    expect(wrapper.vm.$refs.bookNameProvider.errors[0]).toBe('Book Name is not valid.')
    expect(wrapper.text().includes('Book Name is not valid.')).toBeTruthy()
  })

  it('form should be able to filled', async () => {
    // Setting our form data
    wrapper.find('#author-name').setValue('Karl R. Popper')
    wrapper.find('#author-age').setValue(92)
    wrapper.find('#author-address').setValue('Karl-Popper-Straße, Vienna, Austria')
    wrapper.find('#book-name').setValue('The Logic Of Scientific Discovery')
    wrapper.find('#book-release-date').setValue('1959-07-28')

    // Waiting form validation finish its job
    await flushPromises()

    // Checking inpput values
    expect(wrapper.vm.form.author.name).toBe('Karl R. Popper')
    expect(wrapper.vm.form.author.age).toBe('92')
    expect(wrapper.vm.form.author.address).toBe('Karl-Popper-Straße, Vienna, Austria')
    expect(wrapper.vm.form.book.name).toBe('The Logic Of Scientific Discovery')
    expect(wrapper.vm.form.book.release_date).toBe('1959-07-28')

    // Checking form validation errors. They shouldn't be showned because all data is correct.
    expect(wrapper.text().includes('Author Name is not valid.')).toBeFalsy()
    expect(wrapper.text().includes('Author Age is not valid.')).toBeFalsy()
    expect(wrapper.text().includes('Author Address is not valid.')).toBeFalsy()
    expect(wrapper.text().includes('Book Name is not valid.')).toBeFalsy()
  })
})