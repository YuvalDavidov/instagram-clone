const express = require('express')
const { addPost, removePost, getPostById, getPosts, updatePost } = require('./post.controller')
const { requireAuth } = require('../../middlewares/requireAuth.middleware')

const router = express.Router()
