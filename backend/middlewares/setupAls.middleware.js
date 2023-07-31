const tokenService = require('../services/token.service')
const asyncLocalStorage = require('../services/als.service')

async function setupAsyncLocalStorage(req, res, next) {
  const storage = {}
  asyncLocalStorage.run(storage, async () => {
    if (!req.cookies) return next()
    const loggedinUser = await tokenService.validateToken(req.cookies.loginToken)

    if (loggedinUser) {
      const alsStore = asyncLocalStorage.getStore()
      alsStore.loggedinUser = loggedinUser
    }
    next()
  })
}

module.exports = setupAsyncLocalStorage

