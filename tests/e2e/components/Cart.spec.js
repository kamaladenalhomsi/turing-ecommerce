import nightmare from '../index'

describe('home', () => {
  let instance = nightmare.getInstance()
  let productName
  beforeAll(async () => {
    productName = await instance
      .wait('div[nm="login"]')
      .click('div[nm="login"] > button')
      .wait(100)
      .type('input[data-vv-name="email"]', 'test@nightmare.com')
      .type('input[data-vv-name="password"]', '123456')
      .click('button[nm="loginButton"]')
      .wait(1000)
      .click('a[nm="profile-link"]')
      .evaluate(() => {
        return document.querySelector('h4[nm="productName"]').textContent
      })

    await instance
      .wait('a[nm="singleLink1"]')
      .click('a[nm="singleLink1"]')
      .wait(1000)
      .wait('button[nm="addToCart"]')
      .click('button[nm="addToCart"]')
      .wait(1000)
      .click('div[nm="openCart"]')
  })
  test('make sure product added to cart', async () => {
    let res = await instance
      .wait("h4[nm='cartProductName-0']")
      .evaluate(() => {
        return document.querySelector("h4[nm='cartProductName-0']").textContent
      })
      .end()
    expect(res).toEqual(productName)
  })

  it('should delete item from cart', async () => {
    let res = await instance
      .wait('div[nm="cartRemoveItem"]')
      .click('div[nm="cartRemoveItem"] > p')
      .wait(1000)
      .evaluate(() => {
        return document.getElementsByClassName('button is-danger')[0].click()
      })
      .wait(100)
      .exists("h4[nm='cartProductName-0']")
      .end()

    expect(res).toBe(false)
  })

  it('should delete all items in cart', async () => {
    let res = await instance
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
