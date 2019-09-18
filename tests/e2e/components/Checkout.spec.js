import nightmare from '../index'

describe('home', () => {
  let instance = nightmare.getInstance()
  beforeAll(async () => {
    await instance
      .wait('div[nm="login"]')
      .click('div[nm="login"] > button')
      .wait(100)
      .type('input[data-vv-name="email"]', 'test@nightmare.com')
      .type('input[data-vv-name="password"]', '123456')
      .click('button[nm="loginButton"]')
      .wait(1000)
      .click('a[nm="profile-link"]')

    await instance
      .wait('a[nm="singleLink1"]')
      .click('a[nm="singleLink1"]')
      .wait(1000)
      .wait('button[nm="addToCart"]')
      .wait(2000)
      .click('button[nm="addToCart"]')
      .wait('div[nm="openCart"]')
      .click('div[nm="openCart"]')
      .wait('button[nm="openCheckout"]')
      .click('button[nm="openCheckout"]')
  })

  test('update user data', async () => {
    let res = await instance
      .wait('button[nm="updateAddressCheckout"]')
      .click('button[nm="updateAddressCheckout"]')
      .wait('article')
      .exists('article')

    expect(res).toBe(true)
  })

  it('should render the confirmation', async () => {
    let res = await instance
      .wait('label[nm="shipping-1"]')
      .click('label[nm="shipping-1"] > input')
      .wait('label[nm="tax-0"]')
      .click('label[nm="tax-0"] > input')
      .wait('button[nm="checkoutNext"]')
      .click('button[nm="checkoutNext"]')
      .evaluate(() => {
        return document.querySelector('p[nm="confirmShipping"]').textContent
      })
      .end()
    expect(res).toEqual('Next Day Delivery ($20)')
  })
})
