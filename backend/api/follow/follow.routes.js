const express = require('express')
const { addFollow, removeFollow, isFollowing } = require('./follow.controller.js')
const { requireAuth } = require('../../middlewares/requireAuth.middleware')

const router = express.Router()

router.put('/add/:userId', addFollow)
router.put('/remove/:userId', removeFollow)
router.get('/check/:userId', isFollowing)

module.exports = router

