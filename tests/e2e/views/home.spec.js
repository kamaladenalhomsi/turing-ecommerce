import nightmare from '../index'

describe('home', () => {
  let instance = nightmare.getInstance()
  test('make sure page running successfully', async () => {
    let res = await instance.exists('.navbar-header__logo')
    expect(res).toBe(true)
  })

  test('make sure there is nine card', async () => {
    let res = await instance.wait(3000).evaluate(() => {
      return document.querySelectorAll('.shopCard').length
    })
    expect(res).toEqual(9)
  })

  test.skip('it fetch data correctly', async () => {
    let res = await instance
      .wait(2000)
      .click('a[nm="1"]')
      .wait(2000)
      .evaluate(() => {
        return document.querySelectorAll('.shopCard').length
      })
      .end()

    expect(res).toBeGreaterThan(0)
  })
})
