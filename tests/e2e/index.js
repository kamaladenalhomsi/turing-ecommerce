const Nightmare = require('nightmare')

export const page = Nightmare()
  .viewport(1440, 768)
  .goto('http://localhost:5000/')
  .wait('body')
