import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Home from '@/views/Home.vue'
import buefy from 'buefy'
import productStore from '@/store/modules/product'
import globals from '../../../src/mixins/globals'
jest.mock('@/plugins/axios', () => {
  const axios = require('axios')
  return axios
})
jest.mock('axios')
import axiosInstance from '@/plugins/axios'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(buefy)

const store = new Vuex.Store({
  modules: {
    product: productStore
  }
})

describe('Home Page', () => {
  let vm
  beforeAll(() => {
    const wrapper = shallowMount(Home, {
      store,
      localVue,
      mixins: [globals],
      stubs: ['custom-button']
    })
    vm = wrapper.vm
  })
  describe('product mutations', () => {
    it('should set department state', () => {
      vm.$store.commit('product/PUSH_DEPARTMENT', {
        department_id: 1
      })

      expect(vm.choosedDepartment).toEqual(
        expect.objectContaining({
          department_id: 1
        })
      )
    })

    it('should set category state', () => {
      vm.$store.commit('product/PUSH_CATEGORY', {
        category_id: 1
      })

      expect(vm.choosedCategory).toEqual(
        expect.objectContaining({
          category_id: 1
        })
      )
    })
    it('should delete department state', () => {
      vm.$store.commit('product/PUSH_DEPARTMENT', {
        department_id: 1
      })
      vm.$store.commit('product/DELETE_DEPARTMENT')

      expect(Object.keys(vm.choosedDepartment).length).toBeLessThanOrEqual(0)
    })

    it('should delete category state', () => {
      vm.$store.commit('product/PUSH_CATEGORY', {
        category_id: 1
      })
      vm.$store.commit('product/DELETE_CATEGORY')

      expect(Object.keys(vm.choosedCategory).length).toBeLessThanOrEqual(0)
    })
  })

  describe('fetchUrl', () => {
    it('should return departmnet products url when choosedDepartment contain data', () => {
      vm.$store.commit('product/PUSH_DEPARTMENT', {
        department_id: 1
      })

      expect(vm.fetchUrl).toEqual('/products/inDepartment/1')
    })

    it('should return category products url when choosedCategory contain data', () => {
      vm.$store.commit('product/PUSH_CATEGORY', {
        category_id: 1
      })

      expect(vm.fetchUrl).toEqual('/products/inCategory/1')
    })

    it('should return department products over category products url if both exist', () => {
      vm.$store.commit('product/PUSH_CATEGORY', {
        category_id: 1
      })

      vm.$store.commit('product/PUSH_DEPARTMENT', {
        department_id: 1
      })

      expect(vm.fetchUrl).toEqual('/products/inDepartment/1')
    })
  })

  describe('fetch products', () => {
    it('should fetch department products', async () => {
      axiosInstance.get.mockImplementation(url => {
        if (url === '/products/inDepartment/1') {
          return Promise.resolve({
            status: 200,
            data: {
              count: 1,
              rows: [
                {
                  name: 'Test Product'
                }
              ]
            }
          })
        }
      })
      vm.$store.commit('product/PUSH_DEPARTMENT', {
        department_id: 1
      })
      await vm.fetchProducts()
      expect(vm.products.rows.length).toBeGreaterThan(0)
    })

    it('should fetch category products', async () => {
      axiosInstance.get.mockImplementation(url => {
        if (url === '/products/inCategory/1') {
          return Promise.resolve({
            status: 200,
            data: {
              count: 1,
              rows: [
                {
                  name: 'Test Category'
                }
              ]
            }
          })
        }
      })
      vm.$store.commit('product/PUSH_CATEGORY', {
        category_id: 1
      })
      await vm.fetchProducts()
      expect(vm.products.rows.length).toBeGreaterThan(0)
    })
  })

  it('should fetch department products over category products if both contain data', async () => {
    axiosInstance.get.mockImplementation(url => {
      if (url === '/products/inDepartment/1') {
        return Promise.resolve({
          status: 200,
          data: {
            count: 1,
            rows: [
              {
                name: 'Test Category'
              }
            ]
          }
        })
      }
    })
    vm.$store.commit('product/PUSH_CATEGORY', {
      category_id: 1
    })
    vm.$store.commit('product/PUSH_DEPARTMENT', {
      department_id: 1
    })
    await vm.fetchProducts()
    expect(vm.products.rows.length).toBeGreaterThan(0)
  })

  describe('Get All Attributes and attributes values', () => {
    it('should fetch all attributes and attributes values', async () => {
      let resObj = {
        attribute_id: 1,
        name: 'Size'
      }
      let attrValueRes = {
        attribute_value_id: 1,
        value: 'S'
      }
      axiosInstance.get.mockImplementation(url => {
        if (url === '/attributes') {
          return Promise.resolve({
            status: 200,
            data: [resObj]
          })
        }
        if (url === '/attributes/values/1') {
          return Promise.resolve({
            status: 200,
            data: [attrValueRes]
          })
        }
      })
      await vm.getAllAttributes()
      expect(vm.attributes[0]).toEqual(expect.objectContaining(resObj))
      expect(vm.attributes[0].items[0]).toEqual(
        expect.objectContaining(attrValueRes)
      )
    })
  })
})
