import { shallowMount } from '@vue/test-utils'
import CartTable from '@/components/Cart/CartTable.vue'
import store from '@/store/index'
import { localVue } from '../index'
import axiosInstance from '@/plugins/axios'

describe('Cart Table', () => {
  let vm
  beforeAll(() => {
    const wrapper = shallowMount(CartTable, {
      store,
      localVue,
      stubs: ['custom-button'],
      propsData: {
        model: 'cart',
        items: []
      }
    })
    vm = wrapper.vm
  })
  test('saveForLater method', async () => {
    store.commit('cart/SET_CART_ITEMS', [
      {
        name: 'First Product'
      }
    ])
    store.commit('cart/SET_SAVED_ITEMS', [
      {
        name: 'Second Product'
      }
    ])
    axiosInstance.mockImplementation(({ url, method }) => {
      if (
        url === vm.$rest.SHOPPING_CART.SAVE_FOR_LATER(1) &&
        method === 'get'
      ) {
        return Promise.resolve({
          status: 200
        })
      }
    })
    await vm.saveForLater(1, 0)
    expect(vm.$store.getters['cart/GET_CART_ITEMS'].length).toEqual(0)
  })

  test('moveToCart method', async () => {
    store.commit('cart/SET_CART_ITEMS', [
      {
        name: 'First Product'
      }
    ])
    store.commit('cart/SET_SAVED_ITEMS', [
      {
        name: 'Second Product'
      }
    ])
    axiosInstance.mockImplementation(({ url, method }) => {
      if (url === vm.$rest.SHOPPING_CART.MOVE_TO_CART(1) && method === 'get') {
        return Promise.resolve({
          status: 200
        })
      }
    })
    await vm.moveToCart(1, 0)
    expect(vm.$store.getters['cart/GET_SAVED_COUNT']).toEqual(0)
  })
})
