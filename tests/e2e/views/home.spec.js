import { page } from '../index'

test('make sure page running successfully', async () => {
  let res = await page.exists('.navbar-header__logo')
  expect(res).toBe(true)
})

test('make sure there is nine card', async () => {
  let res = await page
    .wait(3000)
    .evaluate(() => {
      return document.querySelectorAll('.shopCard').length
    })
    .end()
  expect(res).toEqual(9)
})

test('it fetch data correctly', async () => {
  let res = await page
    .wait(2000)
    .click('a[nm="1"]')
    .wait(2000)
    .evaluate(() => {
      return document.querySelectorAll('.shopCard').length
    })
    .end()

  expect(res).toBeGreaterThan(0)
})
