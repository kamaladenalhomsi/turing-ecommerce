import asyncHelper from '@/mixins/asyncHelpers.js';
import Store from '@/store/index';

describe("$_async_query", () => {
  beforeAll(() => {
    jest.mock('axios')
    axios.get.mockImplementation((url) => {
      if (url === 'https://backendapi.turing.com/department') {
          return Promise.resolve({ status: 200 });
      } else {
          //...
      }
  });
  });
  it('should fetch data', async () => {
    let data = await asyncHelper.$_async_query({
      query: {
        action: "department/getAllDepartments"
      }
    }, Store);
    console.log(data, "data");
  });
})