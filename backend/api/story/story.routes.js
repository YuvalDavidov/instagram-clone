const express = require('express')
const { getStoriesByFollowing, getStoriesByUserId, getStoryById, addStory, removeStoy, updateStory } = require('./story.controller.js')
const { requireAuth } = require('../../middlewares/requireAuth.middleware.js')

const router = express.Router()

router.get('/', getStoriesByFollowing)
router.get('/userId/:_id', getStoriesByUserId)
router.get('/storyId/:_id', getStoryById)
router.post('/', addStory)
router.put('/update', updateStory)
router.delete('/:_id', removeStoy)

module.exports = router

