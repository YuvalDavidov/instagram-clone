const express = require('express')
const { createNewChat, getUserChatsIds } = require('./chat.controller')
const router = express.Router()

router.get('/', getUserChatsIds)
router.post('/', createNewChat)

module.exports = router
