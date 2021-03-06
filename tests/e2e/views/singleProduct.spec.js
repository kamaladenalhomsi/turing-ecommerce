import nightmare from '../index'

describe('Single Product', () => {
  let instance = nightmare.getInstance()
  beforeAll(async () => {
    await instance
      .wait(2000)
      .click('a[nm="singleLink1"]')
      .wait('div[nm="product-wrapper"]')
  })
  test('make sure page running successfully', async () => {
    let res = await instance.exists('div[nm="product-wrapper"]')
    expect(res).toBe(true)
  })

  test('make sure it fetch size attibutes', async () => {
    let res = await instance.wait('div[nm="sizeAttr"]').evaluate(() => {
      return document.querySelectorAll('div[nm="sizeAttr"]').length
    })
    expect(res).toBeGreaterThan(0)
  })

  it('should open login modal if none-loggedin user tried to submit a review', async () => {
    let res = await instance
      .wait('button[nm="reviewSubmitButton"]')
      .click('button[nm="reviewSubmitButton"]')
      .exists('div[nm="login"]')
      .end()
    expect(res).toBe(true)
  })
})
