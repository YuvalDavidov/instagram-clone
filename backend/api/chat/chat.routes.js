const express = require('express')
const { createNewChat } = require('./chat.controlloer')
const router = express.Router()

router.post('/', createNewChat)

module.exports = router
