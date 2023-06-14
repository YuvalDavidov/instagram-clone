const express = require('express')
const { addFollow, removeFollow } = require('./follow.controller.js')
const { requireAuth } = require('../../middlewares/requireAuth.middleware')

const router = express.Router()

router.put('/add/:_id', addFollow)
router.put('/remove/:_id', removeFollow)

module.exports(router)
