const express = require('express')
const { getUserUnsawNotifications } = require('./notification.controller.js')
const router = express.Router()

router.get('/', getUserUnsawNotifications)
router.get('/unsaw', getUserUnsawNotifications)

module.exports = router
