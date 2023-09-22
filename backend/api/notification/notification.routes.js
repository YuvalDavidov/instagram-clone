const express = require('express')
const { getUserUnsawNotifications, getUserNotifications } = require('./notification.controller.js')
const router = express.Router()

router.get('/', getUserNotifications)
router.get('/unsaw', getUserUnsawNotifications)

module.exports = router
