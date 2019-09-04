import { page } from '../index'

const email = `test${Math.random()}@nightmare.com`
const password = '123456'
const name = 'Test Nightmare'
test('sign up', async () => {
  let res = await page
    .wait(100)
    .click('div[nm="signup"] > button')
    .wait(100)
    .type('input[data-vv-name="name"]', name)
    .type('input[data-vv-name="email"]', email)
    .type('input[data-vv-name="password"]', password)
    .type('input[data-vv-name="password_confirmation"]', password)
    .click('button[nm="signupButton"]')
    .wait('[nm="customerName"]')
    .evaluate(() => {
      return document.querySelector('[nm="customerName"]').textContent
    })
  expect(res).toEqual(`Hi! ${name}`)
})

test('logout', async () => {
  let res = await page
    .wait(100)
    .click('button[nm="logoutButton"]')
    .wait('div[nm="signup"] > button')
    .evaluate(() => {
      return document.querySelectorAll('div[nm="signup"] > button').length
    })
  expect(res).toBeGreaterThan(0)
})

test('login', async () => {
  let res = await page
    .wait(100)
    .click('div[nm="login"] > button')
    .wait(100)
    .type('input[data-vv-name="email"]', email)
    .type('input[data-vv-name="password"]', password)
    .click('button[nm="loginButton"]')
    .wait(2000)
    .evaluate(() => {
      return document.querySelector('[nm="customerName"]').textContent
    })
    .end()
  expect(res).toEqual(`Hi! ${name}`)
})
