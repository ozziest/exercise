import { mount } from '@vue/test-utils'
import axios from "axios"
import MockAdapter from "axios-mock-adapter"
import Data from '@/components/Data.vue'
import Paginator from '@/components/Paginator'
import apiIndexResponse from './../mocks/api/index'
const mock = new MockAdapter(axios)
let wrapper = null

describe('Data.vue', () => {
  afterAll(() => {
    mock.restore()
  })

  beforeAll(() => {
    mock.reset()
    mock.onGet("/api/authors").reply(200, apiIndexResponse)
    wrapper = mount(Data)
  })

  it('should have basic components', async () => {
    await wrapper.vm.$nextTick()
    expect(wrapper.isVueInstance()).toBeTruthy()
    expect(wrapper.contains('table')).toBe(true)
    expect(wrapper.contains(Paginator)).toBe(true)
  })

  it('should fetch data from api', async () => {
    // In mounted function, api request should be sent to the server and should
    // be getted data from your axios mock adapter.
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.result).toMatchObject(apiIndexResponse)
  })

  it('should show author`s information', async () => {
    // Checking authors
    expect(wrapper.text().includes('Karl Popper')).toBeTruthy()
    expect(wrapper.text().includes('Martin Fowler')).toBeTruthy()
    expect(wrapper.text().includes('Kent Beck')).toBeTruthy()
    // Checking some addresses
    expect(wrapper.text().includes('Vienna')).toBeTruthy()
    // Checking books
    expect(wrapper.text().includes('The Logic Of Scientific Discovery')).toBeFalsy()
    expect(wrapper.text().includes('Refactoring')).toBeFalsy()
    // Checking warning messages
    expect(wrapper.text().includes('There is not any book of')).toBeFalsy()
  })

  it('should show Show Books button', async () => {
    expect(wrapper.text().includes('Show Books')).toBeTruthy()
    expect(wrapper.vm.result.data[0]._is_detail_opened).toBe(false)
  })

  it('should show books when I click the Show Books', async () => {
    wrapper.findAll('.btn').at(0).trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.result.data[0]._is_detail_opened).toBe(true)
    expect(wrapper.text().includes('Hide Books')).toBeTruthy()
    expect(wrapper.text().includes('The Logic Of Scientific Discovery')).toBeTruthy()
    expect(wrapper.text().includes('1959-07-28')).toBeTruthy()
    expect(wrapper.text().includes('Refactoring')).toBeFalsy()
  })

  it('should show a warning message when I click the Show Books of an Author who doesn`t have any book', async () => {
    wrapper.findAll('.btn').at(2).trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.result.data[2]._is_detail_opened).toBe(true)
    expect(wrapper.text().includes('There is not any book of Kent Beck yet.')).toBeTruthy()
  })
})
