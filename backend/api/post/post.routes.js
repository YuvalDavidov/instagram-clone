const express = require('express')
const { addPost, removePost, getPostById, getPosts, updatePost, appendItem, removeItem } = require('./post.controller')
const { requireAuth } = require('../../middlewares/requireAuth.middleware')

const router = express.Router()

router.get('/', getPosts)
router.get('/:_id', getPostById)
router.post('/', addPost)
router.put('/', updatePost)
router.put('/:_id', appendItem)
router.delete('/:postId', removePost)
router.delete('/', removeItem)

module.exports = router
