const express = require('express')
const { addPost, removePost, getPostById, getPosts, updatePost, appendItem, removeItem } = require('./post.controller')
const { requireAuth } = require('../../middlewares/requireAuth.middleware')

const router = express.Router()

router.get('/', getPosts)
router.get('/:_id', requireAuth, getPostById)
router.post('/', requireAuth, addPost)
router.put('/', requireAuth, updatePost)
router.put('/:_id', requireAuth, appendItem)
router.delete('/', requireAuth, removePost)
router.delete('/:postId', requireAuth, removeItem)

module.exports(router)