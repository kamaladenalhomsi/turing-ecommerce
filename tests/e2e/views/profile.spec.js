import nightmare from '../index'

describe('profile', () => {
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
  })
  test('make sure page running successfully', async () => {
    let res = await instance
      .wait(10000)
      .wait('div[nm="profile-warapper"]')
      .evaluate(() => {
        return document.querySelectorAll('div[nm^="field-"]').length
      })
      .end()
    expect(res).toEqual(13)
  })

  it('should update baisc data', async () => {
    let res = await instance
      .wait('button[nm="update-basicData"]')
      .click('button[nm="update-basicData"]')
      .wait('article')
      .evaluate(() => {
        return document.getElementsByClassName('notification is-success').length
      })
      .end()

    expect(res).toBeGreaterThan(0)
  })

  it('should update address data', async () => {
    let res = await instance
      .wait('button[nm="update-address"]')
      .click('button[nm="update-address"]')
      .wait('article')
      .evaluate(() => {
        return document.getElementsByClassName('notification is-success').length
      })
      .end()

    expect(res).toBeGreaterThan(0)
  })

  it('should update credit card', async () => {
    let res = await instance
      .wait('button[nm="update-credit"]')
      .click('button[nm="update-credit"]')
      .wait('article')
      .evaluate(() => {
        return document.getElementsByClassName('notification is-success').length
      })
      .end()

    expect(res).toBeGreaterThan(0)
  })
})
