import { shallowMount } from '@vue/test-utils'
import Cart from '@/components/Cart/Cart.vue'
import store from '@/store/index'
import { localVue } from '../index'
import axiosInstance from '@/plugins/axios'

describe('Cart', () => {
  let vm
  beforeAll(() => {
    const wrapper = shallowMount(Cart, {
      store,
      localVue,
      stubs: ['custom-button', 'confirm'],
      propsData: {
        model: 'cart',
        items: []
      }
    })
    vm = wrapper.vm
    vm.$store.commit('cart/SET_CART_ID', 1)
  })

  test('it fetch cart items', async () => {
    let res = [
      {
        id: 1
      }
    ]
    axiosInstance.get.mockImplementation(url => {
      if (url === vm.$rest.SHOPPING_CART.GET(1)) {
        return Promise.resolve({
          status: 200,
          data: res
        })
      }
    })
    await vm.getCartItems()
    expect(vm.$store.getters['cart/GET_CART_COUNT']).toEqual(1)
  })
  test('it fetch saved items', async () => {
    let res = [
      {
        id: 1
      }
    ]
    axiosInstance.get.mockImplementation(url => {
      if (url === vm.$rest.SHOPPING_CART.GET_SAVED(1)) {
        return Promise.resolve({
          status: 200,
          data: res
        })
      }
    })
    await vm.getSavedItems()
    expect(vm.$store.getters['cart/GET_SAVED_COUNT']).toEqual(1)
  })

  it('should remove cart item', async () => {
    vm.$store.commit('cart/SET_CART_ITEMS', [
      {
        id: 1
      }
    ])
    axiosInstance.mockImplementation(({ url, method }) => {
      if (
        url === vm.$rest.SHOPPING_CART.DELETE_PRODUCT(1) &&
        method === 'delete'
      ) {
        return Promise.resolve({
          status: 200
        })
      }
    })

    await vm.removeCartItem(1, 0)
    expect(vm.$store.getters['cart/GET_CART_COUNT']).toEqual(0)
  })
})
