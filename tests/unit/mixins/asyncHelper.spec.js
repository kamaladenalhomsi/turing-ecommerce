import { shallowMount } from '@vue/test-utils'
import App from '@/layouts/Main.vue'
jest.mock('@/plugins/axios', () => {
  const axios = require('axios');
    return axios
});
jest.mock('axios')

import globals from '../../../src/mixins/globals'

import axiosInstance from '@/plugins/axios';

describe('AsyncHelpers', () => {
  let wrapper;
  beforeAll(() => {
    wrapper = shallowMount(App, {
      mixins: [globals],
      stubs: ['router-view'],
    })
  });
  // $_async_query
  describe('$_async_query', () => {

    it('should fetch and receive data', async () => {
      axiosInstance.get.mockResolvedValue({});
      let res = await wrapper.vm.$_async_query({
        query:{
          path: 'demo'
        }
      })
      expect(typeof res).toBe('object');
    });

    it('should invoke done callback if status equal 200', async () => {
      axiosInstance.get.mockResolvedValue({
        status: 200
      });
      const mockDone = jest.fn(() => "done")
      await wrapper.vm.$_async_query({
        query: {
          path: 'demo'
        },
        done: mockDone
      });
      expect(mockDone).toHaveBeenCalled();
    });

    it('should invoke nullResult callback if data is empty', async () => {
      axiosInstance.get.mockResolvedValue({
        status: 200,
        data: []
      });
      const mockNullResult = jest.fn(() => "nullResult")
      await wrapper.vm.$_async_query({
        query: {
          path: 'demo'
        },
        nullResult: mockNullResult
      });
      expect(mockNullResult).toHaveBeenCalled();
    });

    it('should invoke unauthorized callback if status equal 401', async () => {
      axiosInstance.get.mockResolvedValue({
        status: 401
      });
      const mockUnauthorized = jest.fn(() => "unauthorized")
      await wrapper.vm.$_async_query({
        query: {
          path: 'demo',
        },
        unauthorized: mockUnauthorized
      });
      expect(mockUnauthorized).toHaveBeenCalled();
    });

  });
    // $_async_query
    describe('$_async_mutation', () => {

      it('should fetch and receive data', async () => {
        axiosInstance.mockReturnValue({});
        let res = await wrapper.vm.$_async_mutation({
          mutation: {
            path: '/demo',
            method: 'post',
          }
        })
        expect(typeof res).toBe('object');
      });
  
      it('should invoke done callback if status equal 200', async () => {
        axiosInstance.mockResolvedValue({
          status: 200
        });
        const mockDone = jest.fn(() => "done")
         await wrapper.vm.$_async_mutation({
          mutation: {
            path: '/demo',
            method: 'post',
          },
          done: mockDone
        })
        expect(mockDone).toHaveBeenCalled();
      });
  
      it('should invoke badRequest callback if status equal 400', async () => {
        axiosInstance.mockResolvedValue({
          status: 400
        });
        const mockBadRequest = jest.fn(() => "done")
         await wrapper.vm.$_async_mutation({
          mutation: {
            path: '/demo',
            method: 'post',
          },
          badRequest: mockBadRequest
        })
        expect(mockBadRequest).toHaveBeenCalled();
      });

      it('should invoke unauthorized callback if status equal 401', async () => {
        axiosInstance.mockResolvedValue({
          status: 401
        });
        const mockUnauthorized = jest.fn(() => "done")
         await wrapper.vm.$_async_mutation({
          mutation: {
            path: '/demo',
            method: 'post',
          },
          unauthorized: mockUnauthorized
        })
        expect(mockUnauthorized).toHaveBeenCalled();
      });
      
    });
});

