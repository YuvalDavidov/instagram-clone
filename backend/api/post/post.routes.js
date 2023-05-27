const express = require('express')
const { addPost, removePost, getPostById, getPosts, updatePost } = require('./post.controller')
const { requireAuth } = require('../../middlewares/requireAuth.middleware')

const router = express.Router()

router.get('/', requireAuth, getPosts)
router.get('/:id', requireAuth, getPostById)
router.post('/', requireAuth, addPost)
router.put('/', requireAuth, addPost)
router.delete('/', requireAuth, removePost)

module.exports(router)