const Nightmare = require('nightmare')

/**
 * Create a singleton to make sure that only one
 * instance created
 */
let nightmare = (function() {
  let instance
  function init(path) {
    return Nightmare({ show: true })
      .viewport(1440, 768)
      .goto(`http://localhost:5000/${path}`)
      .wait('body')
  }
  return {
    getInstance(path = '') {
      if (!instance) {
        return (instance = init(path))
      } else {
        return instance
      }
    }
  }
})()

export default nightmare
