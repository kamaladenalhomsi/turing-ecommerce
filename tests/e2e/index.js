const Nightmare = require('nightmare')

export const page = Nightmare()
  .goto('http://localhost:5000/')
  .wait('body')
