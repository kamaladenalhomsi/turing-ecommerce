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
      .wait('a[nm="singleLink1"]')
      .click('a[nm="singleLink1"]')
  })
  test('make sure product added to cart', async () => {
    let productName = await instance
      .wait('h1[nm="singleProductName"]')
      .evaluate(() => {
        return document.querySelector('h1[nm="singleProductName"]').textContent
      })

    let res = await instance
      .wait('button[nm="addToCart"]')
      .click('button[nm="addToCart"]')
      .wait(1000)
      .wait('div[nm="openCart"]')
      .click('div[nm="openCart"]')
      .wait("h4[nm='cartProductName-0']")
      .evaluate(() => {
        return document.querySelector("h4[nm='cartProductName-0']").textContent
      })
    expect(res).toEqual(productName)
  })

  it('should delete item from cart', async () => {
    let res = await instance
      .wait('button[nm="addToCart"]')
      .click('button[nm="addToCart"]')
      .wait(1000)
      .click('div[nm="openCart"]')
      .wait('div[nm="cartRemoveItem"]')
      .click('div[nm="cartRemoveItem"] > p')
      .wait(1000)
      .evaluate(() => {
        return document.getElementsByClassName('button is-danger')[0].click()
      })
      .wait(100)
      .exists("h4[nm='cartProductName-0']")
    expect(res).toBe(false)
  })

  it.skip('should delete all items in cart', async () => {
    let res = await instance
      .wait('button[nm="addToCart"]')
      .click('button[nm="addToCart"]')
      .wait(1000)
      .click('div[nm="openCart"]')
      .wait('div[nm="deleteAllCart"]')
      .click('div[nm="deleteAllCart"] > button')
      .wait(1000)
      .evaluate(() => {
        return document.getElementsByClassName('button is-danger')[0].click()
      })
      .wait(1000)
      .exists("h4[nm='cartProductName-0']")
      .end()
    expect(res).toBe(false)
  })
})
