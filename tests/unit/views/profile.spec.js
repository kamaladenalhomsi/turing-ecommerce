import { shallowMount } from '@vue/test-utils'
import Profile from '@/views/Profile.vue'
import axiosInstance from '@/plugins/axios'
import store from '@/store/index'
import { localVue } from '../index'

describe('Update', () => {
  let vm
  beforeAll(() => {
    const wrapper = shallowMount(Profile, {
      store,
      localVue,
      stubs: ['custom-button']
    })
    vm = wrapper.vm
  })

  it('should update basic data', async () => {
    let data = {
      name: 'Kamal',
      email: 'kamal@alhomsi.com',
      day_phone: '010236325142',
      eve_phone: '010236325142',
      mob_phone: '010236325142'
    }
    axiosInstance.mockImplementation(({ url, method }) => {
      if (url === vm.$rest.CUSTOMER.UPDATE() && method === 'PUT') {
        return Promise.resolve({
          status: 200,
          data
        })
      }
    })

    await vm.update('basicData', '/customer')
    expect(vm.$store.getters['customer/GET_CUSTOMER']).toEqual(
      expect.objectContaining(data)
    )
  })

  it('should update address data', async () => {
    let data = {
      address_1: 'First District',
      address_2: 'First District',
      city: 'The New Damietta',
      region: 'Damietta',
      postal_code: '4425',
      country: 'Egypt',
      shipping_region_id: '1'
    }
    axiosInstance.mockImplementation(({ url, method }) => {
      if (url === vm.$rest.CUSTOMERS.UPDATE_ADDRESS() && method === 'PUT') {
        return Promise.resolve({
          status: 200,
          data
        })
      }
    })

    await vm.update('address', vm.$rest.CUSTOMERS.UPDATE_ADDRESS())
    expect(vm.$store.getters['customer/GET_CUSTOMER']).toEqual(
      expect.objectContaining(data)
    )
  })

  it('should update credit_card', async () => {
    let data = {
      credit_card: '4242424242424242'
    }
    axiosInstance.mockImplementation(({ url, method }) => {
      if (url === vm.$rest.CUSTOMERS.UPDATE_CREDIT() && method === 'PUT') {
        return Promise.resolve({
          status: 200,
          data
        })
      }
    })

    await vm.update('credit', vm.$rest.CUSTOMERS.UPDATE_CREDIT())
    expect(vm.$store.getters['customer/GET_CUSTOMER']).toEqual(
      expect.objectContaining(data)
    )
  })
})
