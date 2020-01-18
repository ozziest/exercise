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
    expect(wrapper.vm.result).toEqual(apiIndexResponse)
  })

  it('should show author`s information', async () => {
    // We should see authors are listening but not books yet.
    expect(wrapper.text().includes('Karl Popper')).toBeTruthy()
    expect(wrapper.text().includes('Vienna')).toBeTruthy()
    expect(wrapper.text().includes('The Logic Of Scientific Discovery')).toBeFalsy()
  })
})
