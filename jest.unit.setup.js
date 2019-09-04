/**
 * Global Setup for e2e testing
 * here you can do whatever global thing you want
 * eg: mock a global module
 */
jest.mock('@/plugins/axios', () => {
  const axios = require('axios')
  return axios
})
jest.mock('axios')
