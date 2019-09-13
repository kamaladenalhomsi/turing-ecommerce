import { mount } from '@vue/test-utils'
import SingleProduct from '@/views/SingleProduct.vue'
import axiosInstance from '@/plugins/axios'
import store from '@/store/index'
import { localVue } from '../index'
import router from '@/router.js'
describe('Single Product', () => {
  let vm
  beforeAll(() => {
    const wrapper = mount(SingleProduct, {
      store,
      localVue,
      router,
      stubs: ['custom-button', 'router-link', 'content-loader'],
      propsData: {
        id: 1
      }
    })
    vm = wrapper.vm
    vm.$router.push({
      name: 'singleProduct',
      params: {
        id: 1
      }
    })
  })
  test('it fetch single product data', async () => {
    let res = {
      product_name: 'test'
    }
    axiosInstance.get.mockImplementation(url => {
      if (url === vm.$rest.PRODUCTS.SINGLE(1)) {
        return Promise.resolve({
          status: 200,
          data: res
        })
      }
    })
    await vm.getSingle()
    expect(vm.product).toEqual(res)
  })

  test('it fetch single product locations', async () => {
    let res = [
      {
        product_name: 'test'
      }
    ]
    axiosInstance.get.mockImplementation(url => {
      if (url === vm.$rest.PRODUCTS.LOCATIONS(1)) {
        return Promise.resolve({
          status: 200,
          data: res
        })
      }
    })
    await vm.getLocation()
    expect(vm.productLocation).toEqual(res[0])
  })

  test('it fetch single product attributes', async () => {
    let res = [
      ({
        attribute_name: 'Color',
        attribute_value_id: 6,
        attribute_value: 'White'
      },
      { attribute_name: 'Size', attribute_value_id: 5, attribute_value: 'XXL' })
    ]
    axiosInstance.get.mockImplementation(url => {
      if (url === vm.$rest.ATTRIBUTES.IN_PRODUCT(1)) {
        return Promise.resolve({
          status: 200,
          data: res
        })
      }
    })
    await vm.getAttributes()
    expect(vm.attributes.length).toBeGreaterThan(0)
  })

  test('it fetch single product reviews', async () => {
    let res = [
      {
        name: 'jasim',
        review: 'not ex',
        rating: 3,
        created_on: '2019-08-13T05:53:46.000Z'
      }
    ]
    axiosInstance.get.mockImplementation(url => {
      if (url === vm.$rest.PRODUCTS.REVIEWS.ALL(1)) {
        return Promise.resolve({
          status: 200,
          data: res
        })
      }
    })
    await vm.getReviews()
    expect(vm.reviews.length).toBeGreaterThan(0)
  })

  test('submit review', () => {
    vm.$store.commit('customer/SET_TOKEN', 'Hello TOken')
    let res = {
      name: 'test',
      review: 'Hello',
      rating: 5,
      created_on: '2019-08-13T05:53:46.000Z'
    }
    axiosInstance.mockImplementation(({ url, method }) => {
      if (url === vm.$rest.PRODUCTS.REVIEWS.ADD(1) && method === 'post') {
        return Promise.resolve({
          status: 200,
          data: res
        })
      }
    })
    vm.newReview = {
      review: 'Hello',
      rating: 5
    }

    expect(vm.reviews.length).toEqual(1)
  })
})
