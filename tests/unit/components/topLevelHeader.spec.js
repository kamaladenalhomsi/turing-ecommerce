import { shallowMount } from '@vue/test-utils'
import TopLevelHeader from '@/components/Navbar/TopLevelHeader.vue'
import store from '@/store/index'
import { localVue } from '../index'
import axiosInstance from '@/plugins/axios'
window.FB = {
  logout: jest.fn(() => true)
}
describe('Authentication', () => {
  let vm
  beforeAll(() => {
    const wrapper = shallowMount(TopLevelHeader, {
      store,
      localVue,
      stubs: ['custom-button', 'router-view', 'v-facebook-login']
    })
    vm = wrapper.vm
  })

  describe('Sign up', () => {
    it('should create a new use when invoke createUser', async () => {
      let customer = {
        customer_id: 1,
        name: 'John doe'
      }
      axiosInstance.mockImplementation(({ url, method }) => {
        console.log(url, method, 'METHOD')
        if (url === vm.$rest.CUSTOMERS.ADD() && method === 'post') {
          return Promise.resolve({
            status: 200,
            data: {
              customer,
              token: 'token',
              expires_in: '2019/9/1'
            }
          })
        }
      })
      vm.signup.user = {
        name: 'test',
        email: 'test@test.com',
        password: '123456'
      }
      await vm.createUser()
      expect(vm.customer).toEqual(customer)
    })
  })

  describe('Login', () => {
    test('user is not logged in by default', () => {
      expect(vm.loggedin).toBe(false)
    })

    test('user could log in', async () => {
      const customer = {
        customer_id: 1,
        name: 'John doe'
      }
      axiosInstance.mockImplementation(({ url, method }) => {
        if (url === vm.$rest.CUSTOMERS.LOGIN() && method === 'post') {
          return Promise.resolve({
            status: 200,
            data: {
              customer,
              token: 'token',
              expires_in: '2019/9/1'
            }
          })
        }
      })
      vm.login.use = {
        email: 'test@test.com',
        password: '1223456'
      }
      await vm.loginUser()
      expect(vm.customer).toEqual(customer)
    })
  })

  test('logout', () => {
    vm.logout()
    expect(vm.customer).toEqual({})
  })
})
