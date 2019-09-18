import { shallowMount } from '@vue/test-utils'
import Checkout from '@/components/Cart/Checkout.vue'
import store from '@/store/index'
import { localVue } from '../index'
import axiosInstance from '@/plugins/axios'
describe('Checkout', () => {
  let vm
  store.commit('customer/SET_CUSTOMER', {
    address_1: 'First Streetsdadas',
    address_2: 'street22',
    city: '01023635482',
    credit_card: null,
    customer_id: 71036,
    day_phone: null,
    email: 'test@nightmare.com',
    eve_phone: null,
    mob_phone: null,
    name: 'NightMare',
    postal_code: '01028304847',
    region: 'Michigan',
    shipping_region_id: 4
  })
  beforeAll(() => {
    const wrapper = shallowMount(Checkout, {
      store,
      localVue,
      stubs: ['custom-button', 'confirm', 'content-loader'],
      propsData: {
        tab: 0,
        regions: [],
        taxes: []
      }
    })
    vm = wrapper.vm
  })

  it('should create order', async () => {
    let res = [
      {
        order_id: 1
      }
    ]
    axiosInstance.mockImplementation(({ url, method }) => {
      if (url === vm.$rest.ORDERS.ADD() && method === 'post') {
        return Promise.resolve({
          status: 200,
          data: res
        })
      }
    })
    let orderRes = await vm.createOrder()
    expect(orderRes.data).toEqual(res)
  })

  it('should update address info', async () => {
    let res = {
      address_2: 'street22',
      city: '01023635482',
      credit_card: null,
      customer_id: 71036,
      day_phone: null,
      email: 'test@nightmare.com',
      eve_phone: null,
      mob_phone: null,
      name: 'NightMare',
      postal_code: '01028304847',
      address_1: 'Updated Address',
      region: 'dessert',
      country: 'Egypt',
      shipping_region_id: 1
    }
    axiosInstance.mockImplementation(({ url, method }) => {
      if (url === vm.$rest.CUSTOMERS.UPDATE_ADDRESS() && method === 'PUT') {
        return Promise.resolve({
          status: 200,
          data: res
        })
      }
    })
    await vm.update()
    expect(vm.customer).toEqual(res)
  })
})
