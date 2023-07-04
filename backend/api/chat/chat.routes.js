const express = require('express')
const { createNewChat, getUserChatsIds } = require('./chat.controlloer')
const router = express.Router()

router.get('/', getUserChatsIds)
router.post('/', createNewChat)

module.exports = router
