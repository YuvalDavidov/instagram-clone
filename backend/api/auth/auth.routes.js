const express = require('express')
const { login, loginDummy, signup, logout } = require('./auth.controller')

const router = express.Router()

router.post('/login', login)
router.post('/login/dummy', loginDummy)
router.post('/signup', signup)
router.post('/logout', logout)

module.exports = router