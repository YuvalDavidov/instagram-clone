const express = require('express')
const { getStoriesByFollowing, getStoriesByUserId, getStoryById, addStory, removeStoy } = require('./story.controller.js')
const { requireAuth } = require('../../middlewares/requireAuth.middleware')

const router = express.Router()

router.get('/', getStoriesByFollowing)
router.get('/userId/:_id', requireAuth, getStoriesByUserId)
router.get('/storyId/:_id', requireAuth, getStoryById)
router.post('/', requireAuth, addStory)
router.delete('/:_id', requireAuth, removeStoy)


module.exports(router)
